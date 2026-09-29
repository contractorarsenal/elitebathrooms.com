/**
 * HMAC-SHA256 helpers built on Web Crypto (`crypto.subtle`), which is
 * available in both the Cloudflare Workers runtime (production, via
 * `vinext build` + `wrangler deploy`) and plain Node.js (the `next build`/
 * `next dev` smoke-test path) -- unlike `node:crypto`, this needs no
 * runtime-specific import, so one implementation works under both build
 * targets this project maintains.
 *
 * Used for two independent purposes, each with its own secret:
 * - signed, time-limited R2 file-retrieval URLs (FILE_RETRIEVAL_SIGNING_SECRET)
 * - authorizing an upload batch's own cleanup after a failed submission
 *   (UPLOAD_BATCH_SIGNING_SECRET)
 */

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toHex(signature);
}

export async function signMessage(secret: string, message: string): Promise<string> {
  return hmac(secret, message);
}

export async function verifyMessage(secret: string, message: string, signature: string): Promise<boolean> {
  const expected = await hmac(secret, message);
  return timingSafeEqual(expected, signature);
}
