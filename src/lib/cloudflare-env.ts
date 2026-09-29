/**
 * Lazily loads the Cloudflare Workers `env` binding object inside a route
 * handler function body (never at module top level). `cloudflare:workers`
 * only exists inside workerd (this project's real, deployed runtime via
 * `vinext build` + Wrangler) -- it does not exist under plain Node.js, so
 * a static top-level `import { env } from "cloudflare:workers"` breaks
 * `next build`'s page-data-collection step, which `require()`s each route
 * module in Node to read its exports/config without ever calling its
 * handlers. Calling this function only when a handler actually runs keeps
 * that resolution out of module-evaluation time entirely, so both build
 * pipelines this project maintains (`next build` and `vinext build`) stay
 * green -- see docs/migration/production-cutover-checklist.md §14.
 */
export async function getCloudflareEnv(): Promise<Cloudflare.Env> {
  const mod = await import("cloudflare:workers");
  return mod.env;
}
