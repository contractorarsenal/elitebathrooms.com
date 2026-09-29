# Production Readiness Audit

Branch: `feature/wordpress-parity`. `main` untouched. WordPress untouched and still live.
This audit makes no code changes beyond the blog-date fix documented in §0 — it is a
read/verify pass over the existing implementation, cross-checked against
`wordpress-archive/` and this repo's git history.

---

## 0. Blog publication date audit (fix applied)

**Finding:** none of the 4 published blog articles have a real, verifiable original
publication date.

- `wordpress-archive/` has **zero** blog HTML pages, **zero** blog entries in
  `wordpress-archive/seo/*-sitemap.xml`, and an **empty** `wordpress-archive/media/blog/`
  folder. WordPress's own `post_type=post` query returned 0 results (confirmed in
  `docs/migration/rebuild-reconciliation.md`). The blog was never live anywhere.
- Git history (`git log --follow -- src/data/blog.ts`) shows the article content was
  first authored on **2026-09-22**, inside this private rebuild. That is a dev-authoring
  timestamp, not a public-facing publish date — the content was never public before that
  commit, so it isn't a "real original publication date" in the sense this audit needs.
- A previous pass in this same session had set `publishedAt: "2026-09-28"` (today, the
  temporary-preview deploy date) on all 4 posts. That was a mistake — the instruction is
  explicit that a preview deploy date must not stand in for a publish date. **Reverted.**

**Fix applied (`src/data/blog.ts`):**
- Removed the fabricated `publishedAt: "2026-09-28"` from all 4 published posts.
- Added `needsPublicationDate: true` to all 4, with a code comment explaining why the
  field is intentionally left unset and instructing that it be set once, for real, at the
  moment each article actually goes live in Production — never backdated, never set to a
  preview/deploy date.
- Downstream consumers (hub card date, article page date, `articleSchema()`'s
  `datePublished`/`dateModified`, and the article's OG `publishedTime`/`modifiedTime`) were
  already written to only render/emit a date when `post.publishedAt` is set, so removing
  the value cleanly suppresses the date everywhere it would have appeared, with no
  fallback that could silently show a wrong or placeholder date. Verified by re-reading
  `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, and `src/lib/schema.ts`.
- `src/app/sitemap.ts`'s blog entries never set a `lastModified` field at all, so there
  was nothing fabricated there to fix.

**Action required before Production:** for each of the 4 articles, set a real
`publishedAt` (ISO date) at the moment it actually goes live, and only then. Do not set it
earlier "to be safe" and do not use the Production launch date for articles that are
edited later — each article's date should reflect when *that* article first went public.

---

## 1. Contact form submission path

`/contact-us` renders `<EstimateFlow prefill={{}} />` (`src/app/contact-us/page.tsx`).
`EstimateFlow` (`src/components/estimate/EstimateFlow.tsx`) is the same multi-step
component used on the quote page — Contact and Quote share one implementation, not two.

On final step submit: `submitLead(payload)` (`src/lib/estimate/submit.ts`) →
`fetch("/api/estimate", { method: "POST", body: JSON.stringify(payload) })`.

## 2. Quote form submission path

`/get-a-quote` renders `<EstimateFlow prefill={prefill} />` (prefill comes from attribution
data captured on landing — see §6). Identical downstream path to §1: same component, same
`submitLead()`, same `/api/estimate` endpoint.

## 3. Final lead destination

**`src/app/api/estimate/route.ts`, in full, is the entire server-side handler.** It:
validates `firstName`, `phone`, and `consent` are present, then runs
`console.log("[estimate] new lead (Jobber integration pending):", ...)`, then returns
`{ ok: true }`.

**There is no real lead destination right now.** No email is sent, no CRM/webhook is
called, no database write happens. A `console.log` inside a Cloudflare Worker only
reaches Cloudflare's own request-log tooling (`wrangler tail` / dashboard Logs, when
enabled) — it is not durably stored, not searchable long-term, and nobody is notified.
**Every form submission on the current build is effectively lost the moment the request
finishes, unless someone is actively tailing logs at that exact moment.**

The code's own comment names the intended integration: *"this is the ONLY place that
should ever talk to Jobber... Do not invent a Jobber client ID, API base URL, or auth flow
here."* This is a deliberate, honest placeholder — not a bug to silently patch — but it is
a **hard blocker for Production**: real leads must not go live pointed at a `console.log`.

**Before Production, one of:**
- Wire the real Jobber integration (needs real Jobber API credentials/client ID from the
  business — not something to invent), or
- Stand up an interim real destination (e.g., a transactional email send, or a webhook to
  an existing CRM/spreadsheet) that the business explicitly approves, until Jobber is
  ready.

## 4. Required environment variables

**None exist today.** `grep -rn "process\.env\." src` returns zero matches anywhere in
the active source — the codebase does not read any environment variable currently.

This will change the moment §3 is resolved: whichever integration is chosen (Jobber API
key/secret, an email-sending provider's API key, a webhook URL/secret, etc.) will need its
credentials supplied as real environment variables / Cloudflare Worker secrets, never
hardcoded. None of those names can be decided here without knowing which integration path
the business picks.

## 5. Cloudflare bindings

`wrangler.jsonc` (source) and the generated `dist/server/wrangler.json` both show:
- One asset binding: `ASSETS` → static client build (`dist/client`), `not_found_handling: none`.
- **Every other binding category is empty**: no KV namespaces, D1 databases, R2 buckets,
  Durable Objects, queues, secrets store, hyperdrive, etc.
- `vars: {}` — no plaintext vars configured either.

Whatever §3's chosen lead integration needs (a KV namespace for idempotency, a queue for
retry, or just a secret binding for an API key) is not provisioned yet and needs to be
added to `wrangler.jsonc` before that integration ships.

## 6. reCAPTCHA requirements

**None implemented, and none exist on the WordPress source either.** `wordpress-archive/forms/gform_1.json`
and `gform_2.json` (the real Gravity Forms field exports) contain no CAPTCHA field of any
kind, and a repo-wide search for `recaptcha`/`turnstile`/`hcaptcha` in `src/` returns zero
matches. The current form has **no bot/spam protection at all** on either the client or
`/api/estimate`.

This is not a parity regression (WordPress had none either) but it is a real production
risk once the form has a live lead destination (§3) — an unprotected public POST endpoint
that triggers a real business action (a Jobber lead, an email, etc.) is a spam magnet.

**Update (later session):** Turnstile was subsequently built, then removed at the
client's explicit instruction — spam protection is honeypot-only by deliberate choice,
not an open gap. See `production-cutover-checklist.md` §14.2. This section is kept as
the original historical audit finding; don't treat the recommendation above as current
guidance.

## 7. GTM/tracking status

**Zero tracking installed in the active codebase** — confirmed by a repo-wide search for
`GTM-`, `googletagmanager`, `gtag`, and the specific IDs below: no matches in `src/`.
`AttributionCapture` (`src/components/analytics/AttributionCapture.tsx`) only captures
first-party landing-page/UTM/referrer data into the lead payload itself (see `src/lib/attribution.ts`)
— it is not a tag manager and sends nothing to any third party.

**Three tracking IDs found live on the WordPress archive** (each appears on all 122
archived pages — sitewide, not page-scoped):

| ID | Mechanism (from archived HTML) | Read |
|---|---|---|
| `GTM-KMB5XPJH` | Standard inline Google Tag Manager snippet, placed just before `</head>` | Textbook default GTM install |
| `GTM-MCGRC63R` | **Identical** standard inline GTM snippet, placed immediately after the first, separated only by a `<style>` block | Textbook default GTM install |
| `GT-PLWH3KWF` | Loaded via `gtag/js?id=GT-PLWH3KWF`, with `googlesitekit_post_type` and `window._googlesitekit` markers | Signature of the official **Google Site Kit** WordPress plugin (Analytics/Search Console integration) |

**Are the two GTM containers duplicates, legacy, or intentional?** From site-side evidence
alone: both use the byte-for-byte identical default GTM boilerplate snippet, placed
back-to-back in the same document-head location, with no differentiating markers — no
environment/auth query string, no conditional/page-scoped loading, no comment
distinguishing them. That pattern (two containers, same snippet, same place, no
distinction) reads far more like an **accidental duplicate/legacy leftover** — most
commonly the result of one agency/plugin installing a GTM ID (e.g. via a theme or
page-builder "Header Scripts" field) and a second install happening later without
realizing one already existed — than a deliberate two-container architecture (which would
typically show some scoping difference).

That said, **I cannot see inside either container** (what tags/triggers/variables each
one fires) without logging into tagmanager.google.com, and it's entirely possible one is
genuinely retired (no tags configured) while the other is live, or that they intentionally
split, e.g., marketing tags vs. analytics tags. Site-side HTML evidence cannot settle that.

**→ NEEDS OWNER ACCESS / DECISION.** Whoever has (or can get) access to
tagmanager.google.com for both container IDs needs to check which one (if either) has
live, configured tags firing, and confirm with the business/marketing team whether a
second container was ever deliberately requested. `GT-PLWH3KWF` (Site Kit) is lower-risk —
it's a well-known, single-purpose official plugin install and very unlikely to be a
mistake — but should still be confirmed as the business's own Google Analytics/Search
Console property before being reinstalled here.

**Do not install any of the three in this build until that decision comes back.**

## 8. Cookie Policy status

**PENDING FINAL COMPLIANCE REVIEW** — unchanged, and correctly so: it cannot honestly
move past this status until §7's tracking stack is resolved, since a real Cookie Policy
has to describe the actual cookies/tracking that end up installed. Currently a clean
placeholder (`src/app/cookie-policy/page.tsx`, `noindex`, verified contact info only, no
invented cookie-category/consent claims) — see `docs/migration/legal-pages-status.md`.

## 9. Privacy Policy status

**Reflects verified, currently-implemented behavior; still needs a legal-sufficiency
review before being treated as final**, per the existing audit in
`docs/migration/legal-pages-status.md`. Its "Information We Collect" section will need a
follow-up edit once §3/§7 land — if a real analytics/tracking stack goes in, or if the
lead destination adds e.g. a CRM that retains data differently, this document is the one
that needs to be revisited so it keeps describing real, current behavior rather than
freezing what was true before those changes.

## 10. Redirect requirements

**Minimal, by design.** Per `docs/migration/rebuild-reconciliation.md`, every route in
this rebuild was deliberately renamed to match its live WordPress URL exactly (all 5
services, all 9 projects, all 36 service-area pages, Contact, About, Services hub, Get a
Quote, Thank You, Projects hub, Service Area hub, legal pages). Because of that 1:1 URL
parity, **the WordPress → Next.js cutover itself needs no redirect map** for existing,
indexed WordPress content — the same path serves the new page.

Two smaller, lower-risk candidates remain, both already called out in
`next.config.ts`'s own comment and neither acted on yet (correctly — redirect cleanup was
explicitly deferred until parity routes existed, which they now do):

1. **Interim Next.js-only URLs from earlier in this rebuild** that may have been
   linked/bookmarked/crawled before the rename (`/about`, `/contact`, `/services` as a
   hub, `/services/tub-to-shower-conversion`, `/areas-we-serve(+slug)`,
   `/get-a-quote/thank-you`, `/estimate(+thank-you)`) — worth adding as 301s to their real
   WordPress-matching route now that the targets are stable, as a safety net with very
   low effort/risk.
2. **No `www` vs. apex, or `http` vs. `https` redirect is configured anywhere in this
   repo** — that will be handled at the Cloudflare/DNS layer (§12), not in `next.config.ts`,
   and needs to be set to match whatever canonical host WordPress currently redirects to
   (confirm which of `elitebathrooms.com` / `www.elitebathrooms.com` is canonical before
   cutover — `src/lib/seo.ts`'s `SITE_URL` currently assumes `https://www.elitebathrooms.com`).

Neither is a blocker; both are cheap to add whenever convenient before DNS cutover.

## 11. Production Cloudflare deployment requirements

Current deploys in this session use `wrangler deploy --config wrangler.json --temporary`
— an **anonymous, ephemeral** deploy: no Cloudflare account login, a random
`*.workers.dev` subdomain each time (in practice it has stayed on the same
`sponge-deposit` subdomain across this session's redeploys, but that's not guaranteed),
and, per `wrangler whoami` in this environment, **no Cloudflare account is authenticated
here at all** ("You are not authenticated. Please run `wrangler login`.").

**To deploy for real, the account owner needs to:**
1. Authenticate this (or their own) machine to the real Elite Bathrooms Cloudflare
   account — either interactively (`wrangler login`) or via `CLOUDFLARE_API_TOKEN` +
   `CLOUDFLARE_ACCOUNT_ID` for non-interactive/CI deploys.
2. Deploy without `--temporary`, using the real `deploy:vinext` script
   (`vinext-cloudflare deploy --config dist/server/wrangler.json`) or a plain
   `wrangler deploy --config wrangler.json`, so the Worker becomes a permanent, named
   resource on that account instead of a disposable preview.
3. Attach a **custom domain** (`elitebathrooms.com` and/or `www.elitebathrooms.com`) to
   the deployed Worker via Cloudflare's dashboard (Workers & Pages → the worker →
   Custom Domains), or add a `routes` entry in `wrangler.jsonc` if the zone is already on
   Cloudflare.
4. Provision whatever bindings/secrets §3–§5 end up needing (`wrangler secret put ...`
   for API keys/tokens — never committed to the repo or to `wrangler.jsonc` directly).
5. Re-run this audit's QA suite (§"Final QA", below) against that real deploy once it's
   live at its permanent URL, before pointing DNS at it.

## 12. DNS cutover steps

This assumes WordPress is currently served from its own host and `elitebathrooms.com`'s
DNS points there today (this repo has no visibility into the actual DNS provider/zone —
confirm current authoritative DNS provider before starting). General sequence:

1. Complete §11 (permanent Cloudflare deploy with a custom domain attached) and verify
   the Worker responds correctly when reached at that custom domain over HTTPS, with
   real, non-preview traffic-test coverage of the routes in this audit's QA section.
2. Lower DNS TTL on the current `elitebathrooms.com` / `www` records (e.g. to 300s) at
   least 24–48 hours ahead of cutover, so the eventual change propagates quickly.
3. If the domain's DNS is not already on Cloudflare: either (a) move the zone to
   Cloudflare (nameserver change at the registrar) so the Worker custom-domain routing
   works natively, or (b) keep DNS elsewhere and point an `A`/`CNAME` at whatever
   Cloudflare's custom-domain feature requires for an external DNS host (Cloudflare
   for SaaS / "Custom Hostnames" — needs a Cloudflare plan that supports it; confirm this
   against the actual account tier).
4. Cut over `elitebathrooms.com` and `www.elitebathrooms.com` DNS to the new Worker
   (per whichever of 3a/3b applies), keeping WordPress's hosting fully intact and
   unmodified in the background (per the standing instruction: do not shut WordPress
   down).
5. Immediately re-run the full route/link/image validators (this audit's QA section)
   against the live production domain, not just the preview URL.
6. Monitor Cloudflare's request logs/analytics for elevated error rates in the first
   hours after cutover.
7. Only after DNS has been stable and verified for an agreed observation window should
   WordPress hosting actually be decommissioned — and that is a separate, explicit future
   decision, not part of this cutover.

## 13. Rollback procedure

Two independent rollback layers, matching the two things that change at cutover:

**A. Worker-level rollback (fast, doesn't touch DNS).** Cloudflare keeps prior deployed
Versions of a Worker. If the new deploy itself has a bug (not a DNS problem), roll back
via `wrangler rollback` (or the dashboard's Deployments → "Rollback to this version") to
the last-known-good Version ID — this reverts the code Production DNS is already pointing
at, with no DNS change and near-instant effect.

**B. DNS-level rollback (if the Worker/Cloudflare path itself is the problem).** Revert
the DNS records changed in §12 step 4 back to WordPress's original hosting values (kept
on hand from before cutover, per the low-TTL step in §12.2, so this propagates fast).
Because WordPress is never shut down as part of this migration, its hosting stays a live,
working fallback target the entire time — rollback is "point DNS back," not "restore from
backup."

Either rollback path should be followed by a re-run of the QA suite against whichever
target DNS now points at, to confirm the rollback itself didn't introduce a new problem.

---

## Final QA (this pass)

- `npm run lint` — clean
- `npx tsc --noEmit` — clean
- `npm run build` — 74 routes, succeeded
- `npm run build:vinext` — succeeded
- Route validator (`final_route_validation.py`): 5/5 service, 9/9 project, 36/36 area,
  12/12 normal pages, 2/2 sitemap/robots, 1/1 404
- Link/image validator (`validate_links_images.py`): 67 pages crawled, 0 broken links,
  0 broken images

No merge to `main`, no Production deploy, no DNS change, no WordPress modification, and no
tracking ID installed in this pass.
