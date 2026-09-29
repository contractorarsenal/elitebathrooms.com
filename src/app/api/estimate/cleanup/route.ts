import { getCloudflareEnv } from "@/lib/cloudflare-env";
import { verifyMessage } from "@/lib/estimate/signing";

/**
 * Deletes an upload batch's own R2 objects. Called only from the client
 * when files were successfully uploaded to R2 but the *following*
 * Web3Forms submission then failed -- see submission-order note in
 * EstimateFlow.tsx. Never leaves a lead's photos billed/stored forever
 * for a submission that never actually reached Web3Forms.
 *
 * `batchToken` (returned by /api/estimate/upload alongside the same
 * `keys`) is required and re-verified here so this endpoint can't be used
 * to delete arbitrary objects by guessing/enumerating key names -- it can
 * only delete the exact set of keys it just signed off on.
 */
export async function POST(request: Request): Promise<Response> {
  const env = await getCloudflareEnv();

  if (!env.UPLOAD_BATCH_SIGNING_SECRET) {
    return new Response(JSON.stringify({ ok: false, error: "Not configured." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = (await request.json().catch(() => null)) as { keys?: unknown; batchToken?: unknown } | null;
  const keys = Array.isArray(body?.keys) ? body.keys.filter((k): k is string => typeof k === "string") : [];
  const batchToken = typeof body?.batchToken === "string" ? body.batchToken : "";

  if (keys.length === 0 || !batchToken) {
    return new Response(JSON.stringify({ ok: false, error: "Missing keys or batch token." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const expected = [...keys].sort().join(",");
  const valid = await verifyMessage(env.UPLOAD_BATCH_SIGNING_SECRET, expected, batchToken);
  if (!valid) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid batch token." }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  await Promise.allSettled(keys.map((key) => env.UPLOADS_BUCKET.delete(key)));

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
