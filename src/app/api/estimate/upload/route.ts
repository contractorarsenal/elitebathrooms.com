import { getCloudflareEnv } from "@/lib/cloudflare-env";
import { signMessage } from "@/lib/estimate/signing";
import {
  FILE_UPLOAD_MAX_BYTES,
  FILE_UPLOAD_MAX_FILES,
  FILE_UPLOAD_MIME_TYPES,
  FILE_UPLOAD_EXTENSIONS,
  type UploadedFile,
} from "@/lib/estimate/types";

/**
 * Server-side leg of the quote-form file upload. Runs on the Cloudflare
 * Workers runtime (via `cloudflare:workers`' `env`, per vinext's binding
 * convention -- see node_modules/vinext/README.md, "Cloudflare Bindings").
 *
 * Does three things, in order, matching the submission order in
 * docs/migration/production-cutover-checklist.md §14:
 * 1. Verifies the Cloudflare Turnstile token server-side (never trusts
 *    token *presence* alone -- an empty/garbage token fails the same as a
 *    missing one).
 * 2. Re-validates every file server-side (count, size, extension, MIME)
 *    even though the client already checked -- a client check is only a
 *    UX nicety, never the real boundary.
 * 3. Uploads each valid file to the private R2 bucket under a random
 *    object key (never the original filename, which could collide or
 *    leak information) and returns a signed, time-limited retrieval URL
 *    for each -- the bucket itself stays private; nothing here makes an
 *    object public.
 *
 * All-or-nothing: if any file fails validation, or any R2 put() fails
 * partway through the batch, every object already written in *this*
 * request is deleted before returning an error, so a failed request never
 * leaves orphaned objects for this endpoint's own retries. (A separate
 * failure mode -- upload succeeds but the client's later Web3Forms call
 * fails -- is handled by /api/estimate/cleanup, since this route has
 * already returned by then.)
 */

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Signed retrieval URLs are long-lived (not "click within 10 minutes")
// because the people who need them -- Elite Bathrooms / Contractor
// Arsenal staff -- read the lead email whenever they get to it, not
// necessarily same-day. 90 days safely outlives any realistic
// quote-follow-up window without leaving files retrievable forever.
const FILE_URL_TTL_SECONDS = 90 * 24 * 60 * 60;

type UploadSuccess = { ok: true; files: UploadedFile[]; batchToken: string };
type UploadFailure = { ok: false; error: string };

function jsonResponse(body: UploadSuccess | UploadFailure, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function extensionOf(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? "" : filename.slice(dot).toLowerCase();
}

function randomObjectKey(extension: string): string {
  return `uploads/${crypto.randomUUID()}${extension}`;
}

async function verifyTurnstile(token: string, remoteIp: string | null, secret: string): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
  const result = (await res.json().catch(() => null)) as { success?: boolean } | null;
  return result?.success === true;
}

export async function POST(request: Request): Promise<Response> {
  const env = await getCloudflareEnv();

  if (!env.TURNSTILE_SECRET_KEY) {
    return jsonResponse(
      { ok: false, error: "Spam verification is not configured yet. Please contact us directly." },
      503
    );
  }
  if (!env.FILE_RETRIEVAL_SIGNING_SECRET || !env.UPLOAD_BATCH_SIGNING_SECRET) {
    return jsonResponse(
      { ok: false, error: "File uploads are not configured yet. Please contact us directly." },
      503
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ ok: false, error: "Malformed upload request." }, 400);
  }

  const turnstileToken = formData.get("turnstileToken");
  if (typeof turnstileToken !== "string" || turnstileToken.length === 0) {
    return jsonResponse({ ok: false, error: "Spam verification is missing. Please try again." }, 400);
  }

  const remoteIp = request.headers.get("CF-Connecting-IP");
  const verified = await verifyTurnstile(turnstileToken, remoteIp, env.TURNSTILE_SECRET_KEY);
  if (!verified) {
    return jsonResponse(
      { ok: false, error: "Spam verification failed or expired. Please retry the human verification and submit again." },
      400
    );
  }

  const files = formData.getAll("files").filter((f): f is File => f instanceof File);

  if (files.length === 0) {
    // No files is a valid submission (uploads are optional) -- just confirm verification.
    return jsonResponse({ ok: true, files: [], batchToken: await signMessage(env.UPLOAD_BATCH_SIGNING_SECRET, "") }, 200);
  }

  if (files.length > FILE_UPLOAD_MAX_FILES) {
    return jsonResponse({ ok: false, error: `You can upload up to ${FILE_UPLOAD_MAX_FILES} files.` }, 400);
  }

  for (const file of files) {
    const extension = extensionOf(file.name);
    if (!FILE_UPLOAD_EXTENSIONS.includes(extension as (typeof FILE_UPLOAD_EXTENSIONS)[number])) {
      return jsonResponse({ ok: false, error: `"${file.name}" is not an accepted file type.` }, 400);
    }
    if (file.type && !FILE_UPLOAD_MIME_TYPES.includes(file.type as (typeof FILE_UPLOAD_MIME_TYPES)[number])) {
      return jsonResponse({ ok: false, error: `"${file.name}" is not an accepted file type.` }, 400);
    }
    if (file.size > FILE_UPLOAD_MAX_BYTES) {
      return jsonResponse(
        { ok: false, error: `"${file.name}" is over the ${FILE_UPLOAD_MAX_BYTES / (1024 * 1024)}MB limit.` },
        400
      );
    }
    if (file.size === 0) {
      return jsonResponse({ ok: false, error: `"${file.name}" is empty.` }, 400);
    }
  }

  const uploaded: UploadedFile[] = [];

  try {
    for (const file of files) {
      const extension = extensionOf(file.name);
      const key = randomObjectKey(extension);
      const buffer = await file.arrayBuffer();

      await env.UPLOADS_BUCKET.put(key, buffer, {
        httpMetadata: { contentType: file.type || "application/octet-stream" },
      });

      const expiresAt = Date.now() + FILE_URL_TTL_SECONDS * 1000;
      const signature = await signMessage(env.FILE_RETRIEVAL_SIGNING_SECRET, `${key}:${expiresAt}`);
      // `key` is server-generated (randomObjectKey()) -- always `uploads/<uuid>.<ext>`,
      // so it's safe to place directly in the path with no per-segment encoding.
      const url = `/api/estimate/files/${key}?exp=${expiresAt}&sig=${signature}`;

      uploaded.push({ key, url, name: file.name, size: file.size });
    }
  } catch {
    await Promise.allSettled(uploaded.map((f) => env.UPLOADS_BUCKET.delete(f.key)));
    return jsonResponse({ ok: false, error: "File upload failed. Please try again." }, 502);
  }

  const batchToken = await signMessage(
    env.UPLOAD_BATCH_SIGNING_SECRET,
    uploaded
      .map((f) => f.key)
      .sort()
      .join(",")
  );

  return jsonResponse({ ok: true, files: uploaded, batchToken }, 200);
}
