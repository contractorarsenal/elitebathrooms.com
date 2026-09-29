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
8. A Cloudflare Turnstile site registration (site key into this app, secret key into the
   Web3Forms dashboard) for the quote form's spam verification, per §14 below — code is
   done; file uploads need no Cloudflare setup at all (Web3Forms' own Advanced File
   Uploader handles storage on their end).

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

**Correction from an earlier pass of this session:** file uploads were briefly built on a
custom Cloudflare R2 pipeline (a private bucket + this app's own signed-URL API routes).
The client corrected that: their Web3Forms account already has file-upload capability
(Web3Forms' own Advanced File Uploader, a Pro-tier feature of their existing account), so
storing files ourselves was unnecessary duplication. **That R2 code has been fully
removed** — no bucket, no binding, no signing secrets, no upload/cleanup/retrieval API
routes remain in this branch. What's below is the current, real architecture.

### 14.1 File upload — Web3Forms Advanced File Uploader, implemented

Reverse-engineered from Web3Forms' own client script
(`https://web3forms.com/client/script.js`, fetched and read directly — see below) since
their docs describe the HTML attributes but not the underlying mechanism. Confirmed: it
wires [FilePond](https://pqina.nl/filepond/) onto any `<input type="file"
data-advanced="true">`, and for each selected file calls `GET
https://api.web3forms.com/upload?file=<name>&type=<mime>&id=<formId>` to get a
presigned upload target, `POST`s the file straight there, and on success sets that file's
"server id" to the reference Web3Forms returns. Because this is FilePond's normal
input-adapter mode, once wired to a real `<input name="attachment">` inside a `<form>`,
a successful upload leaves a hidden `<input name="attachment">` behind holding that
reference — so `new FormData(formEl).getAll("attachment")` is how the app retrieves
what was uploaded (the vendor script exposes no JS callback for this). This is why
`EstimateFlow`'s two "pages" are now both always mounted (visibility toggled by CSS, not
conditional JSX) and wrapped in a real `<form ref={formRef}>`: the script only scans the
DOM once (confirmed by reading it — no `MutationObserver`), so the input has to exist
from first paint, and the harvest at submit time needs a real form to read from.

**Plan/capability confirmation — what could and couldn't be verified this session:**
- Both "File Attachments" (the already-working single-attachment feature) and "Advanced
  File Uploader" are documented as **Pro-tier features requiring an active Web3Forms
  subscription**. Since basic single-file attachment already works on this exact access
  key (confirmed in an earlier session, real test email received with a real attachment),
  that's real evidence this account already has an active paid plan — Web3Forms' own docs
  don't distinguish a separate, lower paid tier that would exclude the Advanced Uploader
  specifically.
- **Could not independently confirm the account's real enforced file-count/size ceiling.**
  `api.web3forms.com` sits behind Cloudflare's bot-management challenge, which blocks
  non-browser requests (confirmed: a direct `curl` to their `/upload` presign endpoint
  returns an HTTP 403 challenge page, not a real API response) — and this session has no
  dashboard login and no browser automation tool available, so neither the API nor the
  Web3Forms dashboard's plan page could be checked directly.
- **What this means practically:** the form is configured for 5 files / 10MB each (the
  target you asked for, matching the original WordPress form's file count exactly).
  Web3Forms' backend enforces its own real limit server-side regardless of what this app
  requests — if the account's actual ceiling is lower, an oversized upload fails with a
  clear Web3Forms-provided error rather than silently succeeding past a limit that isn't
  real. **Recommend confirming the real limit once via the Web3Forms dashboard's plan
  page, or by testing one real 10MB upload through the live form** — either would close
  this gap with certainty this session couldn't reach.

- **Allowed types:** jpg, jpeg, gif, png, pdf — same as the original form, enforced via
  the `accept` attribute (`image/jpeg,image/png,image/gif,application/pdf` — MIME types,
  not extensions, since FilePond's own type-validator plugin reads that attribute
  directly).
- **UI:** FilePond provides the drop zone, "Select files" trigger, selected-file list,
  per-file remove, and upload progress natively — this is its main advertised behavior,
  not something built here. It isn't pixel-matched to the rest of the WordPress-parity
  form (it's a third-party widget), but the required behaviors (drag/drop, select,
  list, remove, progress, clear errors) are all present out of the box.
- **No duplicate submissions:** the submit button disables and the handler no-ops on
  re-entry while a submission is in flight, unchanged from before.
- **Nothing to create in Cloudflare for this part** — it's entirely a Web3Forms account
  capability, no R2/bucket/binding/secret of any kind.

### 14.2 CAPTCHA — Cloudflare Turnstile, implemented

The placeholder "Are you human?" box is a real Cloudflare Turnstile widget
(`src/components/estimate/TurnstileWidget.tsx`, explicit JS rendering — Cloudflare's own
docs recommend explicit over the auto-scanning `cf-turnstile` div specifically for SPAs
like this one), in the same visual slot. The honeypot (`botcheck`) remains as a second,
independent spam layer, unchanged.

**Verification is Web3Forms' job, not this app's** — confirmed via their docs
(`docs.web3forms.com/getting-started/pro-features/cloudflare-turnstile-captcha.md`):
once `turnstile` is set as the form's captcha provider in the Web3Forms dashboard (with
the Turnstile secret key entered there), Web3Forms verifies the `cf-turnstile-response`
field server-side on every submission automatically. This app never holds or sees a
Turnstile secret — the widget's token is read via its `callback` and included as the
`cf-turnstile-response` field in the Web3Forms submission (`submit.ts`); Web3Forms
rejects the submission with a real error message if verification fails, which the form
surfaces and then resets the widget for a fresh token (Turnstile tokens are single-use).

**BLOCKED ON OWNER — no Turnstile widget is registered for this domain yet, and Web3Forms
isn't yet configured to check it.** Two separate things need to happen, neither of which
this session can do:
1. **Cloudflare dashboard → Turnstile:** add a site (e.g. "Elite Bathrooms — Get a
   Quote"), hostname `elitebathrooms.com` (add the `*.workers.dev` preview hostname too
   for preview deploys), widget mode "Managed" (closest match to the original reCAPTCHA
   v2 checkbox). Copy the **Site Key** (public) into this project's build-time env as
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
2. **Web3Forms dashboard (`app.web3forms.com`) → this form's Settings:** set captcha
   provider to `turnstile` and paste in the **Secret Key** from step 1. This is a
   Web3Forms account setting, not a Cloudflare Worker secret — nothing to `wrangler
   secret put` for this piece.

Until the site key is set, the widget shows a clear "not configured yet" message instead
of a broken/fake checkbox.

### What was tested this session, and what wasn't

Tested directly:
- `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run build:vinext` — all clean.
- `validate_links_images.py` re-run against the full 73-route site (`npm run build &&
  npm run start`) — 0 broken links/images, confirming the form/script changes didn't
  regress anything else on the site.
- The rendered `/get-a-quote` HTML was inspected directly (`curl`) and confirmed to
  contain the Web3Forms script tag, the Turnstile script reference, `data-advanced="true"`,
  and `name="attachment"` on the file input — i.e. the integration is wired into the
  actual page output, not just present in source.
- Web3Forms' client script (`web3forms.com/client/script.js`) was fetched and read in
  full to confirm its real upload mechanism (presigned-URL flow → FilePond → hidden
  `attachment` input) rather than assumed from docs alone.

**Not tested this session (no browser automation tool was available):** the actual
end-to-end submission — Turnstile completing, a real file uploading through FilePond,
the resulting `attachment` field reaching Web3Forms, and a genuine `success:true` —
along with drag-and-drop interaction and mobile layout. `api.web3forms.com`'s Cloudflare
bot-challenge also blocks scripted/`curl` verification of the upload flow specifically
(confirmed: direct requests get a 403 challenge page, not real API responses), so this
needs a real browser pass before launch: `npm run dev:vinext` + `wrangler dev` locally
(once Turnstile is registered, using a real or Cloudflare's published test site key), or
the deployed preview once both blockers above are resolved. `check_quote_flow.mjs` (the
existing Playwright QA script) already needs a rewrite against the current form structure
— its own description still refers to the pre-parity 5-step design — independent of this
session's work; not attempted here.

Nothing in Production, DNS, or WordPress has been touched. Stopping here, as instructed.
