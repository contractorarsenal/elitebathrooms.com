import { getCloudflareEnv } from "@/lib/cloudflare-env";
import { verifyMessage } from "@/lib/estimate/signing";

/**
 * Protected retrieval endpoint for the private R2 uploads bucket. The
 * bucket has no public access; every object is only ever reachable through
 * this route, and only with a valid, unexpired signature -- see the
 * "signed, time-limited retrieval URL" note in
 * docs/migration/production-cutover-checklist.md §14 for why this
 * approach was chosen over making the bucket (or individual objects)
 * public.
 *
 * Catch-all `[...key]` (not `[key]`) because generated object keys are
 * `uploads/<uuid>.<ext>` -- a single dynamic segment can't span the `/`.
 */
export async function GET(request: Request, { params }: { params: Promise<{ key: string[] }> }): Promise<Response> {
  const env = await getCloudflareEnv();

  if (!env.FILE_RETRIEVAL_SIGNING_SECRET) {
    return new Response("Not configured.", { status: 503 });
  }

  const { key: keyParts } = await params;
  const key = keyParts.join("/");

  const url = new URL(request.url);
  const exp = url.searchParams.get("exp");
  const sig = url.searchParams.get("sig");

  if (!exp || !sig) {
    return new Response("Missing signature.", { status: 403 });
  }

  const expiresAt = Number(exp);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return new Response("This link has expired.", { status: 403 });
  }

  const valid = await verifyMessage(env.FILE_RETRIEVAL_SIGNING_SECRET, `${key}:${exp}`, sig);
  if (!valid) {
    return new Response("Invalid signature.", { status: 403 });
  }

  const object = await env.UPLOADS_BUCKET.get(key);
  if (!object) {
    return new Response("File not found.", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Content-Disposition", "inline");
  headers.set("Cache-Control", "private, max-age=3600");

  return new Response(object.body, { headers });
}
