/**
 * Single centralized location for the Web3Forms integration config. Every
 * reference to the access key goes through this file — never duplicated
 * across components.
 *
 * This IS a client-side key by design, not a leaked secret: Web3Forms
 * explicitly documents this class of key as a PUBLIC access key meant for
 * direct browser use, and — confirmed empirically while building this
 * integration — this exact key is *rejected* when called server-to-server
 * (Web3Forms' free tier: "Use our API in client side or contact support
 * with server IP address (Pro plan is required)") and *accepted* when
 * called from a real browser context. So the submission path here really
 * is browser → Web3Forms directly (see `submit.ts`); there is no server
 * hop for this call, and none is possible without a Web3Forms Pro plan.
 *
 * `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is read first (the `NEXT_PUBLIC_`
 * prefix is what actually gets it inlined into the client bundle — a
 * plain, unprefixed env var would stay server-only and never reach this
 * browser-side code) so the key can be rotated later without touching
 * source: vinext auto-loads `.env*` files at build time (see
 * node_modules/vinext/README.md, "Environment variable loading"), so
 * adding a `.env` file with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=...` at a
 * future rebuild overrides this default with no other code change.
 */
export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "1872e5fe-ab6c-4e6b-a2ec-e823b63f30d7";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
