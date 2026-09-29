/**
 * Client-safe Turnstile config. The site key is public by design (it's
 * embedded in every page that renders the widget, same as any CAPTCHA
 * site key) -- the secret half never appears here or anywhere in client
 * code; it's a Worker secret read server-side in
 * src/app/api/estimate/upload/route.ts.
 *
 * No fallback value: unlike WEB3FORMS_ACCESS_KEY, a Turnstile site key is
 * registered per-domain in the Cloudflare dashboard and can't be invented
 * or reused from another project. Until
 * `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set (see
 * docs/migration/production-cutover-checklist.md §14), the widget can't
 * render and the form disables submission with a clear message rather
 * than pretending to have working spam protection.
 */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
