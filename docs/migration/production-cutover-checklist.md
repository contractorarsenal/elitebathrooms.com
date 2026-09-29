# Production Cutover Checklist

Branch: `feature/wordpress-parity`. `main` untouched. WordPress untouched and still live.
No DNS or Production action has been taken. This is the master pre-launch checklist —
it supersedes nothing in `production-readiness-audit.md` or `legal-pages-status.md`, it
consolidates them into one ordered, actionable list and adds what's changed since
(Web3Forms is now the confirmed, working lead destination).

Each item is marked **DONE**, **READY** (built, waiting on a decision/credential that
isn't code), or **BLOCKED ON OWNER** (needs something only you can provide/decide).

---

## 0. What changed since the last audit

- **Lead delivery is resolved.** `EstimateFlow` → browser → Web3Forms (direct, client-side
  — the only architecture Web3Forms' free-tier key actually allows; confirmed
  empirically) → `/thank-you` only on a real `success:true`. Test submission confirmed
  received. `/api/estimate` (the old `console.log`-only placeholder) has been removed
  entirely, not left as a stub.
- **Canonical domain decided and fixed.** You confirmed the apex domain,
  `https://elitebathrooms.com` (no `www`), matching WordPress's own long-standing
  canonical. `src/lib/seo.ts`'s `SITE_URL`, `layout.tsx`'s `metadataBase`, and
  `robots.ts`'s sitemap reference are all updated; `sitemap.ts` and every schema/OG call
  already read from `SITE_URL`, so they picked up the change automatically. Verified live
  on a rebuilt local server: sitemap `<loc>` entries, `robots.txt`'s `Sitemap:` line, the
  homepage's `<link rel="canonical">`, and both homepage JSON-LD blocks' `url` fields all
  now read `https://elitebathrooms.com` with no `www`. Two QA scripts
  (`validate_links_images.py`, `capture_all.mjs`) that stripped the old `www` host off
  sitemap URLs to get relative paths were updated to strip either host, so they keep
  working correctly against the new sitemap. A repo-wide sweep (excluding
  `wordpress-archive/`, `.git/`, `node_modules/`, `.next/`, `dist/`, `.vinext/`,
  `.wrangler/`) found zero remaining live `www.elitebathrooms.com` references in active
  source — the only matches left are explanatory comments/fallback-regex branches and
  historical audit-doc text, none of which affect actual output.
  **Remaining action (item 6 below), unchanged:** at cutover,
  `www.elitebathrooms.com` must 301 to the apex domain at the DNS/Cloudflare layer —
  that's a DNS-side rule, not something this codebase can configure itself.

---

## 1. Persistent Cloudflare deployment under the real account

**BLOCKED ON OWNER.** This session has no authenticated Cloudflare account
(`wrangler whoami` returns "You are not authenticated"); every deploy so far has used
anonymous, ephemeral `wrangler deploy --temporary` (a random `*.workers.dev` subdomain,
nothing durable).

**You need to provide, or do yourself:**
- Either (a) run `wrangler login` on a machine with access to the real Elite Bathrooms
  Cloudflare account, or (b) generate a `CLOUDFLARE_API_TOKEN` (Workers edit permission)
  and `CLOUDFLARE_ACCOUNT_ID` for a non-interactive deploy.
- Confirm which Cloudflare account/zone this should deploy under, if there's any
  ambiguity (e.g., an existing account already used for something else at Elite
  Bathrooms).

**Once authenticated, the deploy itself is just:**
```
npm run build && npm run build:vinext
npx wrangler deploy --config wrangler.json   # from dist/server, no --temporary
```
This makes the Worker a permanent, named resource instead of a disposable preview.

## 2. Final GTM/tracking decision

**BLOCKED ON OWNER — NEEDS OWNER ACCESS / DECISION** (unchanged from the prior audit).
Three IDs exist on the live WordPress site, all sitewide:

| ID | What the HTML shows |
|---|---|
| `GTM-KMB5XPJH` | Standard inline GTM snippet |
| `GTM-MCGRC63R` | **Byte-identical** standard inline GTM snippet, placed immediately after the first |
| `GT-PLWH3KWF` | Google Site Kit plugin's own tag (Analytics/Search Console) |

Site-side evidence points to the two GTM containers being an accidental
duplicate/legacy leftover (same snippet, same place, no distinguishing scoping) rather
than a deliberate split — but confirming which (if either) has live, real tags configured
requires logging into tagmanager.google.com for both container IDs, which this session
cannot do.

**You need to:**
- Log into (or grant access to) tagmanager.google.com for `GTM-KMB5XPJH` and
  `GTM-MCGRC63R`, check which has real tags/triggers configured, and tell me which one
  (if either) to install, or confirm both are intentionally separate and what each is for.
- Confirm `GT-PLWH3KWF` (Site Kit) is the business's own Google account before it's
  reinstalled.
- **Nothing has been installed.** No tracking script exists anywhere in this codebase
  right now — confirmed by a repo-wide search.

## 3. Cookie Policy finalization

**BLOCKED ON #2.** Correctly still **PENDING FINAL COMPLIANCE REVIEW**
(`src/app/cookie-policy/page.tsx`, `noindex`, no invented cookie-category/consent
language — see `docs/migration/legal-pages-status.md`). It cannot honestly move past
that status until the tracking decision above lands, since a real Cookie Policy has to
describe the actual cookies/tags this site ends up running. Once #2 is resolved:
1. Update the Cookie Policy with the real, final tracking stack.
2. Get it legally reviewed/approved.
3. Remove the pending-review notice and flip `robots.index` back to `true`.

## 4. Blog publication dates

**READY — a manual step at the moment of launch, not a code change.** All 4 published
articles (`src/data/blog.ts`) intentionally have no `publishedAt` (they were authored
fresh in this rebuild and were never live on WordPress — confirmed via the archive and
git history; see `production-readiness-audit.md` §0). Each is flagged
`needsPublicationDate: true`.

**At the moment each article actually goes live in Production:** set that article's real
`publishedAt` (ISO date, e.g. `"2026-10-15"`) and remove its `needsPublicationDate: true`.
Do this per-article, on the day it's genuinely published — not all at once ahead of time,
and never backdated. This one small code change can be made and deployed same-day as
launch, or in a follow-up deploy right after.

## 5. Final redirect review

**Mostly READY**, one open decision:

- **No redirect map is needed for existing WordPress content.** Every route in this
  rebuild already matches its live WordPress URL exactly (confirmed in
  `docs/migration/rebuild-reconciliation.md`) — same path, same page, both sides.
- **Optional, low-risk 301s** for old interim Next.js-only URLs that may have been
  linked/bookmarked before routes were renamed to match WordPress (`/about`, `/contact`,
  `/services` as a hub, `/services/tub-to-shower-conversion`, `/areas-we-serve(+slug)`,
  `/get-a-quote/thank-you`, `/estimate(+thank-you)`) — cheap to add to `next.config.ts`
  whenever convenient; not a blocker.
- **www → apex 301, at the DNS/Cloudflare layer (decided, not yet wired — needs DNS
  access).** `elitebathrooms.com` is the confirmed canonical (item 0). At cutover,
  `www.elitebathrooms.com` needs to 301 to `https://elitebathrooms.com` — this is a
  Cloudflare redirect rule / Worker route configured against the live domain, not
  something `next.config.ts` can do (Next.js redirects only run for requests that
  already reach this app; a request to the `www` host needs to be redirected before or
  as it arrives). Confirm what WordPress's hosting currently does here
  (`curl -I https://www.elitebathrooms.com/` against the live site) so the new setup
  matches rather than introducing a fresh redirect loop or duplicate-content issue.

## 6. Production domain / DNS cutover plan

**BLOCKED ON OWNER** for DNS access and the Cloudflare account (item 1) — the domain
itself is now decided (`elitebathrooms.com`, apex, no `www`; `SITE_URL` already updated
and verified). Sequence, once #1 (permanent Cloudflare deploy) is live:

1. Deploy the already-updated build (apex `SITE_URL`) to the permanent Worker.
2. Attach the confirmed domain(s) to the Worker as Custom Domains in the Cloudflare
   dashboard (Workers & Pages → this worker → Custom Domains), or add a `routes` entry
   in `wrangler.jsonc` if the zone is already on Cloudflare.
3. **Tell me (or do yourself) which DNS provider currently hosts `elitebathrooms.com`'s
   records** — this repo has no visibility into that. If it's not already on Cloudflare,
   the zone needs to move there (nameserver change at the registrar) for native Worker
   custom-domain routing, or Cloudflare for SaaS/Custom Hostnames needs to be used against
   the existing DNS host (confirm your Cloudflare plan supports that).
4. Lower the current DNS TTL on `elitebathrooms.com`/`www` to something short (e.g. 300s)
   24–48 hours ahead of the actual cutover, so the real change propagates fast.
5. Cut the `A`/`CNAME` records over to the new Worker. **WordPress's own hosting is not
   touched or shut down** — it keeps running as a live fallback the whole time, per your
   standing instruction.
6. Immediately run the full QA checklist below against the live production domain (not
   the preview URL).
7. Monitor Cloudflare's request analytics/logs for elevated error rates for the first
   few hours.
8. Only after DNS has been stable and verified for an agreed observation window is
   WordPress hosting actually decommissioned — a separate, later, explicit decision.

## 7. Rollback plan

Two independent layers, matching the two things that change at cutover:

- **A bad Worker deploy (code problem, DNS untouched):** `wrangler rollback` (or the
  Cloudflare dashboard's Deployments → "Rollback to this version") reverts to the last
  known-good Version ID, near-instantly, no DNS change.
- **The Cloudflare/Worker path itself is the problem:** revert the DNS records changed
  in step 6.5 back to WordPress's original values (kept on hand from before cutover,
  per the low-TTL step). Because WordPress is never shut down as part of this migration,
  it's a live, working fallback target for as long as needed.
- Either path: re-run the QA checklist below against whichever target DNS now points at,
  to confirm the rollback itself introduced nothing new.

## 8. Final live-domain QA checklist

Run this against the live production domain immediately after cutover (not just the
preview URL, which has already been validated repeatedly throughout this project):

- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run build:vinext` — all
      clean (already true as of this pass; re-run if any further code changes are made
      before launch, e.g. the `SITE_URL` fix or a blog publish date).
- [ ] Route validator (all 5 service pages, 9 project pages, 36 area pages, sitemap,
      robots, custom 404) against the production domain.
- [ ] Link/image validator against the production domain — 0 broken links/images.
- [ ] Submit one real test lead through `/get-a-quote` **and** one through `/contact-us`
      on the live domain, confirm both arrive in Web3Forms with the correct subject/
      `lead_source`, and confirm `/thank-you` only loads after a real success.
- [ ] Confirm the canonical/`www`-or-apex redirect behaves as decided in item 6, with no
      redirect loop.
- [ ] Confirm HTTPS is enforced (no plain-HTTP page load) on the production domain.
- [ ] Spot-check that WordPress itself is still reachable/unaffected (it should be
      untouched, but verify rather than assume).

---

## What I need from you before launch (summary)

1. Cloudflare account authentication (login or API token + account ID).
2. A decision on the two GTM containers (needs your tagmanager.google.com access) —
   which to install, or confirmation both are intentional and what each does.
3. Confirmation of `GT-PLWH3KWF` (Site Kit) as your own property.
4. ~~A decision on canonical domain~~ — **decided:** `elitebathrooms.com`, apex, no
   `www`. Codebase already updated and verified.
5. Which DNS provider currently hosts `elitebathrooms.com`, so the cutover steps in
   item 6 can be made concrete rather than generic, and so the `www` → apex 301 gets
   configured at that layer.
6. A go/no-go on the two optional, low-risk legacy-URL 301s (item 5) — not required,
   just a nice-to-have if you want them.
7. Sign-off on the Cookie Policy once item 2 is resolved.
8. R2 bucket creation + 3 Worker secrets + Turnstile site registration for the quote
   form's file upload/spam-verification, per §14 below (code is done; these are the
   remaining Cloudflare account actions).

---

## 14. Quote form rebuild — Gravity Forms parity

The quote/contact form (`EstimateFlow`) was rebuilt from scratch to match the real
WordPress Gravity Form (`gform_1`, `/get-a-quote/`) instead of the earlier custom 5-step
card design. Source of truth: `wordpress-archive/forms/gform_1.json`, the embedded
`window.gf_form_conditional_logic[1]` ruleset in `wordpress-archive/html/get-a-quote.html`,
and the live site (read-only) for measured colors/sizes. Full field set, real conditional
logic (service type → conditionally "reason for converting" only for Full Bathroom
Remodel → which bathroom → home age → timeline, each progressively revealed on one page),
real two-page structure (page 1 progressive reveal, page 2 = contact/address/file/
consent/spam-check via a real Next/Previous transition, not a route change), and the
original image-choice service cards (same icon assets, byte-confirmed identical to the
originals) are all reproduced. Parity screenshots: `docs/migration/form-visual-diff/`.

**Both gaps below are now built** (branch `fix/gravity-form-parity`, not merged to
`main`). What's left on each is real Cloudflare account setup, not code.

### 14.1 File upload — Cloudflare R2, implemented

Files no longer go through Web3Forms at all (their Basic plan only ever supported one
5MB attachment). The quote form now uploads directly to a private Cloudflare R2 bucket
through this app's own API routes, and only signed retrieval URLs are included in the
Web3Forms lead email.

- **Limit chosen: 5 files, 10MB each** (not WordPress's 256MB/file — see the comment on
  `FILE_UPLOAD_MAX_BYTES` in `src/lib/estimate/types.ts` for why: 256MB/file would let one
  abandoned upload hold open a 1.28GB request for no real-world benefit; 10MB comfortably
  covers phone photos and PDFs, and a full 5-file batch stays under 50MB, well inside
  Workers' request-body limits). File count (5) matches the original form exactly.
- **Allowed types:** jpg, jpeg, gif, png, pdf — same as the original form. Enforced by
  extension AND MIME type, both client-side (`src/lib/estimate/upload.ts`, UX only) and
  server-side (`src/app/api/estimate/upload/route.ts`, the real boundary — never trusts
  the client).
- **Object keys are randomized** (`uploads/<crypto.randomUUID()>.<ext>`), never the
  original filename.
- **Private-bucket access:** the bucket has no public access. Every object is only ever
  reachable through `src/app/api/estimate/files/[...key]/route.ts`, which requires a
  valid HMAC-SHA256 signature + expiry over the object key (`FILE_RETRIEVAL_SIGNING_SECRET`
  Worker secret) — a request with a missing, tampered, or expired signature gets a 403,
  confirmed by direct testing. Retrieval links are valid for 90 days from upload (long
  enough for a real follow-up window without leaving files retrievable forever), and are
  the exact URLs embedded in the Web3Forms lead email.
- **Submission order implemented exactly as specified:** verify Turnstile → upload files
  (server re-validates count/size/type, all-or-nothing per batch, any partial R2 failure
  rolls back the objects already written) → submit lead + file URLs to Web3Forms → only
  on a real Web3Forms `success:true` does the form navigate to `/thank-you`. If Web3Forms
  fails *after* a successful upload, the client calls `src/app/api/estimate/cleanup/route.ts`
  to delete that batch's own R2 objects (authorized by a signed `batchToken` returned from
  the upload call, so this endpoint can't be used to delete arbitrary keys) — confirmed by
  direct testing (wrong token rejected with 403, correct token deletes and a subsequent
  fetch of that file 404s).
- **Duplicate-submission guard:** the submit button disables immediately and the handler
  no-ops on re-entry while a submission is in flight; no duplicate R2 objects or Web3Forms
  entries are created by a repeated click.

**BLOCKED ON OWNER — the R2 bucket does not exist in the real Cloudflare account yet.**
`wrangler.jsonc` already declares the binding (`UPLOADS_BUCKET` → bucket name
`elite-bathrooms-uploads`), and local testing (`wrangler dev`, which simulates R2 locally
with no cloud resource required) fully exercised the upload/retrieval/cleanup flow
end-to-end — see the test log below. But `@vinext/cloudflare deploy` against the real
account will fail until the bucket actually exists. Once authenticated (`npx wrangler
login` — see item 1 above, same blocker):
```
npx wrangler r2 bucket create elite-bathrooms-uploads
```
No other config changes needed — the binding is already wired up.

Three Worker **secrets** also need to be set on the real account before deploy (never
committed, never pasted into chat — generate your own random values, e.g.
`openssl rand -hex 32`):
```
npx wrangler secret put FILE_RETRIEVAL_SIGNING_SECRET
npx wrangler secret put UPLOAD_BATCH_SIGNING_SECRET
```
(the third secret, `TURNSTILE_SECRET_KEY`, is covered in 14.2 below since it comes from
the Turnstile dashboard, not a random value).

### 14.2 CAPTCHA — Cloudflare Turnstile, implemented

The placeholder "Are you human?" box is now a real Cloudflare Turnstile widget
(`src/components/estimate/TurnstileWidget.tsx`), in the same visual slot. The honeypot
(`botcheck`) remains as a second, independent spam layer, unchanged. The token is
**verified server-side** in `src/app/api/estimate/upload/route.ts` (Turnstile's own
`siteverify` API) before any file upload or lead submission proceeds — token *presence*
alone is never trusted. An expired/invalid token keeps the visitor on the form with a
retry message and resets the widget for a fresh token. Confirmed by direct testing against
Turnstile's own published test keys: the "always passes" test secret succeeds, the
"always fails" test secret is correctly rejected with a clear retry message, and a
tampered/expired file-retrieval signature is independently rejected with 403.

**BLOCKED ON OWNER — no Turnstile widget is registered for this domain yet.** In the
Cloudflare dashboard → Turnstile:
1. Add a site: name it something like "Elite Bathrooms — Get a Quote", hostname
   `elitebathrooms.com` (add the `*.workers.dev` preview hostname too if you want
   Turnstile to work on preview deploys as well).
2. Widget mode: "Managed" (recommended — matches the original reCAPTCHA v2 checkbox
   behavior most closely).
3. Copy the **Site Key** (public) into this project's build-time env as
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (a `.env.local`/`.env.production` file, or your CI's
   env config — never hardcoded, since unlike the Web3Forms key this one has no safe
   placeholder default).
4. Set the **Secret Key** as a Worker secret (never in `wrangler.jsonc`, never pasted into
   chat):
   ```
   npx wrangler secret put TURNSTILE_SECRET_KEY
   ```

Until both the site key (build-time) and secret key (Worker secret) are set, the widget
shows a clear "not configured yet" message instead of a broken/fake checkbox, and the
upload route refuses with a 503 rather than silently skipping verification.

### Local test log (this session, `wrangler dev` against the vinext build)

Ran directly against the local Worker (`npx wrangler dev --config dist/server/wrangler.json`)
using Turnstile's own published test keys (`.dev.vars`, gitignored) — **note:** `wrangler
dev` reads `.dev.vars` from next to whichever `wrangler.json` it's given, i.e.
`dist/server/.dev.vars`, not the repo root:
- Missing Turnstile token → rejected, clear message. ✅
- Turnstile "always fails" test secret → rejected, clear retry message. ✅
- Turnstile "always passes" test secret, 0 files → accepted (files are optional). ✅
- Invalid extension (`.exe`) → rejected server-side. ✅
- Oversized file (11MB) → rejected server-side with the exact 10MB limit in the message. ✅
- 6 files → rejected ("up to 5 files"). ✅
- Valid 2-file upload → both stored in R2, signed URLs + batch token returned. ✅
- Valid signed URL → 200, correct content-type, file bytes match. ✅
- Tampered signature → 403. ✅
- Expired signature → 403. ✅
- Cleanup with wrong batch token → 403, nothing deleted. ✅
- Cleanup with correct batch token → both objects deleted; a subsequent fetch of either
  signed URL → 404. ✅

Not tested in this session (no browser automation tool was available): the Turnstile
widget's actual on-page rendering, drag-and-drop interaction, and mobile layout. These
need a real browser pass before launch — `npm run dev:vinext` + `wrangler dev` locally,
or the deployed preview once the R2 bucket/Turnstile credentials above exist.

`npm run lint`, `npx tsc --noEmit`, `npm run build`, and `npm run build:vinext` all pass
clean with these changes. `validate_links_images.py` re-run against the full 73-route
site (`npm run build && npm run start`) — 0 broken links/images. `check_quote_flow.mjs`
was not re-run: its own description already refers to the old 5-step form design from
before this session (superseded by the Gravity Forms parity rebuild), so it needs a
rewrite against the current form structure regardless of this session's R2/Turnstile
work — a separate, pre-existing gap, not introduced here.

Nothing in Production, DNS, or WordPress has been touched. Stopping here, as instructed.
