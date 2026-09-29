/**
 * Client-safe Turnstile config. The site key is public by design (it's
 * embedded in every page that renders the widget, same as any CAPTCHA
 * site key). The token this widget produces is verified server-side by
 * Web3Forms itself (their dashboard's "turnstile" captcha provider
 * setting, paired with a secret key entered there) -- this app never
 * holds or sees the Turnstile secret.
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
