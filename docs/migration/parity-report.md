# Visual & Functional Parity Report

Branch: `feature/wordpress-parity`. Compares the local production build (`npm run build && npm run start`) against `wordpress-archive/screenshots/`.

## Methodology

- **Screenshot capture:** `docs/migration/scripts/capture_all.mjs` (Playwright, not the CLI) navigates to every URL in the local `sitemap.xml` plus `/thank-you` and a nonexistent URL for 404, waits for network idle, **scrolls the full page first** to trigger lazy-loaded images, then captures a full-page screenshot at 1440×900 (desktop) and 390×844 (mobile). 68 routes × 2 = 136 screenshots in `docs/migration/parity-screenshots/`.
- **Link/image validation:** `docs/migration/scripts/validate_links_images.py` crawls all 67 sitemap+thank-you pages and checks every internal `<a href>` and every `<img src>` resolves to HTTP 200. **Result: 0 broken links, 0 broken images**, across all 67 pages.
- **Deep visual review:** I directly viewed (not just diffed dimensions) the WordPress vs. rebuilt screenshot for one representative page per distinct template — home, About, a WP-sourced service-area page, thank-you, 404, and a mobile homepage pass — since the 29 WP-sourced area pages share one template (`WpAreaDetail`) and the 7 verified areas share another (`AreaDetail`); verifying the template once per type covers structure/typography/spacing risk for all pages using it. I did not individually eyeball all 68 pages — flagging that limit plainly rather than implying full manual coverage.
- **Interaction QA:** `docs/migration/scripts/check_quote_flow.mjs` drives the quote form through all 5 steps and asserts the consent checkbox behavior.

## Two real screenshot-tooling artifacts identified and ruled out (not site bugs)

1. **Gray "Photo pending" boxes on the first capture pass.** Caused by Playwright's bare CLI screenshot not waiting for lazy-loaded `next/image` elements before capturing a 13,000px-tall page. Confirmed by checking the JSX (every `ImageSlot` has a real `src`) and re-capturing with an explicit scroll-through — all images render. This is why the capture script scrolls the page before every screenshot.
2. **Sticky mobile bar appearing to overlap content mid-page.** A known Playwright/Puppeteer full-page-screenshot limitation with `position: fixed` elements — the fixed bar gets pinned at its original viewport offset in the stitched image instead of the true page bottom. **Confirmed this affects the WordPress archive screenshots identically** (its own sticky footer-CTA bar shows the same artifact at the same relative position in `wordpress-archive/screenshots/mobile/home.png`), and confirmed the real rendered behavior is correct via a normal (non-full-page) viewport screenshot after scrolling. Not a bug in either site.

## Bugs found and fixed during this pass

| Bug | Found via | Fix |
|---|---|---|
| `next.config.ts` redirected the (correct) WordPress URLs to the old, deleted Next.js slugs | Manual browser check + curl | Removed the stale `redirects()` (prior commit) |
| 2 real WordPress projects wrongly excluded, code comment said no finished photos existed | Downloading and viewing the actual full-size gallery images | Added both with verified real before/after photography (prior commit) |
| `sitemap.xml` only listed the 7 verified service areas, not the 29 WP-sourced ones | Code review while building the screenshot pipeline | Added `wpSourcedAreas` to `sitemap.ts` |
| `public/images/team/elite-consultation-alt.jpg` was actually WordPress's raw HTML saved with a `.jpg` extension (a failed download from before this session) | `validate_links_images.py` → the one real broken image, then `file` confirmed it wasn't a JPEG at all | Deleted the corrupted file; `/contact-us` now uses a real, previously-unused photo (`elite-truck-rear.jpg`) with corrected alt text |
| SMS/email consent checkbox missing from the quote flow vs. WordPress's required Gravity Forms consent field | Your explicit instruction + raw HTML inspection | Added, using the exact verbatim WordPress text (see below), required to submit, verified via scripted interaction test |
| Custom 404 page didn't exist | `npm run build` output | Added `src/app/not-found.tsx`, on-brand, verified 200→404 status and content via curl |

## Form parity: consent checkbox

Exact wording lifted from the live Gravity Forms `consent` field on `/get-a-quote/` (`input_18.1`, `gfield_contains_required` — genuinely required, verified via the raw HTML, not just the misleading HTML `required` attribute):

> "By checking this box, you agree to receive emails and text messages from Elite Bathrooms, including non-marketing updates, schedule updates, and service notifications. Message frequency varies. Message and data rates may apply. You may opt out at any time by replying STOP or get help by replying HELP. View our **Privacy Policy**." (linked to `/privacy-policy`)

WordPress's two forms use two different business names here (`/get-a-quote/` says "Elite Bathrooms", the older `/contact-us/` form says "Elite Tile Bathrooms"). Since this rebuild uses one shared form component for both pages, I used the current correct name — the same one used everywhere else in the codebase — rather than the stale one. Documented in code, not silently picked.

**Not reproduced:** the reCAPTCHA ("Are you human?") field on both WordPress forms needs a real site key — that's a credential, so it's left out rather than guessed at.

**Still a gap, not touched:** the "why remodeling," "which bathroom," "home age" qualifying questions and full street address (only ZIP is collected) exist on WordPress's form but not here — a scope decision, not something I resolved myself.

## SEO / schema — verified, no changes needed

`src/lib/schema.ts` already uses `HomeAndConstructionBusiness` (never `Article`, the bug WordPress has), and `BreadcrumbList`/`FAQPage` JSON-LD are wired through shared components already. This part of the prior build was already correct.

## Tracking — deliberately untouched

Per your instruction: `GTM-KMB5XPJH`, `GTM-MCGRC63R`, and the direct `gtag.js` load `GT-PLWH3KWF` are documented (`wordpress-archive/reports/tracking-inventory.md`, `wordpress-archive/tracking/tracking-summary.json`) but **nothing is installed** in the Next.js build. Resolving which container(s) are real is deferred to immediately before Production cutover, as instructed.

## Route-by-route status

| Route(s) | Desktop | Mobile | Notes | Corrected? |
|---|---|---|---|---|
| `/` (home) | ✅ reviewed | ✅ reviewed | Matches WordPress's content intent with a richer, better-organized structure (15 sections vs. WP's 8) — a documented, deliberate deviation, not a gap | n/a |
| `/bathroom-remodel-company-seattle` (About) | ✅ reviewed | — | Real crew photos, real testimonials (verified sourced from real Google reviews), shorter and more focused than WP's padding-heavy original | n/a |
| `/contact-us` | ✅ reviewed (via quote flow) | — | Broken hero image fixed this pass | ✅ |
| `/get-a-quote` | ✅ reviewed | — | Consent checkbox added and verified this pass | ✅ |
| `/thank-you` | ✅ reviewed | — | Clean, on-brand | n/a |
| `/service-area/bathroom-remodel-tacoma` (verified-market template) | ✅ reviewed | — | Hand-written content, solid | n/a |
| `/service-area/bathroom-remodel-newcastle` (WP-sourced template, representative of all 29) | ✅ reviewed in depth, incl. raw HTML cross-check | — | Confirmed real WordPress copy preserved faithfully; confirmed an additional pricing claim ("$1000 discount", "in 1 day!") that WordPress renders via `<span>` elements outside this project's text extraction scope was correctly *not* reproduced — documented precisely in `wordpress-archive/scripts/build_area_data.py` | n/a |
| 404 (nonexistent URL) | ✅ reviewed | — | New custom page this pass | ✅ |
| Remaining 28 WP-sourced area pages | not individually reviewed | not individually reviewed | Same template as Newcastle, same extraction/filtering pipeline applied uniformly to all 29 — structural risk covered by the Newcastle review, but I have not eyeballed each one individually | n/a |
| 6 remaining verified-market pages | not individually reviewed | not individually reviewed | Same template as Tacoma | n/a |
| 9 project detail pages, projects hub, services hub, 5 service pages, blog (4 posts + hub), financing, process, legal pages | screenshots captured, link/image-validated, not individually eyeballed | screenshots captured, not individually eyeballed | Zero broken links/images across all of these, confirmed by the automated crawl; no design-token leftovers (checked via grep) | n/a |

## Build verification

`npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run build:vinext` — all clean as of the final commit in this pass.

## What's genuinely still open

- Individual eyeball review of the 28 remaining WP-sourced area pages and 6 remaining verified-market pages (template-level risk is low; per-page content correctness for each specific city is unverified beyond the automated link/image crawl).
- Interaction states not captured: mobile menu open, services nav dropdown open, FAQ accordion expanded — screenshots only show the resting state.
- Performance pass not run as a distinct step (Lighthouse, bundle analysis) — the architecture is already far lighter than WordPress's (no combined-CSS bloat, real `next/image` optimization), so this is lower-urgency.
- Tracking, as instructed, resolved at pre-cutover.
