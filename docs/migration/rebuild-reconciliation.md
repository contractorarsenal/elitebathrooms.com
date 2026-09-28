# Rebuild Reconciliation Report

Branch: `feature/wordpress-parity`. `main` untouched. WordPress untouched (read-only archive only).

This compares the existing Next.js codebase (already substantial — 16 commits, real photography, honest non-fabricated copy) against the WordPress archive captured in `wordpress-archive/`. It is a reconciliation, not a rebuild-from-scratch: most of the codebase is a deliberate, considered piece of work and should stay the base going forward.

## Read before anything else: two decisions only you can make

These block a clean "parity" claim and aren't mine to resolve unilaterally.

### 1. Service Areas: 7 built vs. 36 live on WordPress

`src/data/areas.ts` has an explicit, deliberate comment: *"The only 7 markets we're verified to actively serve. Do not add cities here without that verification."* WordPress has **36 published, indexed, live** service-area pages (all 7 of your verified markets plus 29 more: Newcastle, Mercer Island, Tukwila, SeaTac, Des Moines, Burien, Shoreline, Bothell (misspelled `bothel` in the WP slug), Kent, Renton, Redmond, Federal Way, Mukilteo, Edmonds, Kenmore, Poulsbo, Lake Forest Park, Black Diamond, Mountlake Terrace, Bainbridge Island, Enumclaw, Everett, Lynnwood, Mill Creek, Covington, Auburn, Maple Valley, Snoqualmie, Woodinville).

I am not going to silently expand to 36 by inventing city-specific content — that's exactly what the existing code's own comment warns against, and it's the same fabrication risk the SEO pass earlier this session was built to avoid. This needs one of:
- **(a)** You verify some/all of the 29 additional cities are real service areas, and I write honest (non-templated, non-duplicate) content for each, matching the `areas.ts` pattern already established, or
- **(b)** Those 29 stay unbuilt, and their WordPress URLs get 301-redirected to `/areas-we-serve` or the nearest real market when the old site is retired — a deliberate SEO-equity decision, not silence.

I've held off building any of the 29 pending your answer. The task order below still lists "36 service-area pages" as a single line item; treat that as "up to 36, gated on this."

### 2. URL slugs don't match WordPress in several places

The build's own `services.ts` comment says slugs were chosen to preserve WordPress URLs — and for 4 of 5 services plus 7 of 9 projects, that's true. But several top-level and area URLs diverge:

| New build | WordPress | Match? |
|---|---|---|
| `/about` | `/bathroom-remodel-company-seattle/` | ✗ |
| `/contact` | `/contact-us/` | ✗ |
| `/services` | `/bathroom-remodel-services/` | ✗ |
| `/services/tub-to-shower-conversion` | `/services/bathroom-conversion/` | ✗ |
| `/areas-we-serve` | `/service-area/` | ✗ |
| `/areas-we-serve/{city}` | `/service-area/bathroom-remodel-{city}/` | ✗ |
| `/get-a-quote/thank-you` | `/thank-you/` | ✗ (also nested differently) |
| `/get-a-quote` | `/get-a-quote/` | ✓ |
| `/projects` | `/projects/` | ✓ |
| `/projects/{7 of 9 slugs}` | `/projects/{same}` | ✓ |
| `/services/{4 of 5 slugs}` | `/services/{same}` | ✓ |
| `/privacy-policy`, `/cookie-policy` | same | ✓ |

Since WordPress stays live during this whole migration and only gets retired later, exact URL matches aren't strictly required for the Next.js build itself — but they matter enormously for the eventual cutover redirect map (migration master prompt Phase 21). Recommend: decide now whether to rename these routes to match WordPress exactly (cheap now, since nothing points at these URLs yet) or keep current names and let a 301 map handle it at cutover. I've defaulted to **documenting, not renaming**, since renaming is a one-line decision for you but a multi-file change for me to guess wrong on.

---

## Route-by-route classification

| Route | WordPress equivalent | Classification | Notes |
|---|---|---|---|
| `/` | `/` (home) | **NEEDS CONTENT REWORK** | See Homepage section below — 15 sections vs WP's 8, different structure |
| `/about` | `/bathroom-remodel-company-seattle/` | **NEEDS CONTENT REWORK** | Slug differs; content not yet diffed against WP company page |
| `/contact` | `/contact-us/` | **NEEDS CONTENT REWORK** | Slug differs; has its own copy, not yet diffed against WP form/labels |
| `/get-a-quote` | `/get-a-quote/` | **NEEDS CONTENT REWORK** | URL matches. UI needs to be checked field-for-field against `wordpress-archive/forms/gform_1.json` (30 fields, multi-step) |
| `/get-a-quote/thank-you` | `/thank-you/` | **NEEDS CONTENT REWORK** | Nesting differs; WP's thank-you is a top-level URL leaking into every page's auto nav widget (an existing WP bug, not something to replicate) |
| `/services` | `/bathroom-remodel-services/` | **NEEDS CONTENT REWORK** | Slug differs |
| `/services/full-bathroom-remodel` | `/services/full-bathroom-remodel/` | **NEEDS VISUAL REWORK** | URL matches; content needs a pass against the WP page, but this is your primary service so it's worth extra care |
| `/services/shower-remodel` | `/services/shower-remodel/` | **NEEDS VISUAL REWORK** | URL matches |
| `/services/bathtub-remodel` | `/services/bathtub-remodel/` | **NEEDS VISUAL REWORK** | URL matches |
| `/services/tub-to-shower-conversion` | `/services/bathroom-conversion/` | **NEEDS CONTENT REWORK** | Slug differs |
| `/services/one-day-bathroom-renovation` | `/services/one-day-bathroom-renovation/` | **NEEDS VISUAL REWORK** | URL matches |
| `/projects` | `/projects/` | **NEEDS VISUAL REWORK** | URL matches |
| `/projects/{7 slugs}` | `/projects/{same}/` | **NEEDS VISUAL REWORK** | URLs match for: luxury-full-bathroom-remodel, glass-shower-remodel, double-vanity-upgrade, heated-floor-bathroom, old-bathroom-shower-upgrade, luxury-bathroom-renovation, ensuite-bathroom-project |
| *(none yet)* | `/projects/bathtub-area-renovation-project/` | **MISSING** | Not in `src/data/projects.ts` |
| *(none yet)* | `/projects/spa-inspired-bathroom/` | **MISSING** | Not in `src/data/projects.ts` |
| `/areas-we-serve` | `/service-area/` | **NEEDS CONTENT REWORK** | Slug differs |
| `/areas-we-serve/{7 slugs}` | `/service-area/bathroom-remodel-{same}/` | **NEEDS CONTENT REWORK** | Content exists for Tacoma, Seattle, Bellevue, Kirkland, Issaquah, Sammamish, Puyallup; slug pattern differs from WP |
| *(none — blocked, see decision #1)* | remaining 29 service-area URLs | **MISSING** | Blocked on your verification, not a build-effort problem |
| `/privacy-policy` | `/privacy-policy/` | **NEEDS CONTENT REWORK** | URL matches; not yet diffed against WP legal text |
| `/cookie-policy` | `/cookie-policy/` | **NEEDS CONTENT REWORK** | URL matches; not yet diffed |
| `/financing` | *(no WP page — a "Financing" section exists inline elsewhere)* | **EXTRA / NOT ON WORDPRESS** | Legitimate content addition, not a problem |
| `/process` | *(no WP page — "Our Process" is a homepage section only)* | **EXTRA / NOT ON WORDPRESS** | Legitimate content addition |
| `/blog` + `/blog/[slug]` | *(WordPress has zero blog posts — confirmed via `post_type=post` returning 0)* | **EXTRA / NOT ON WORDPRESS** | Checked `src/data/blog.ts` directly: it's genuinely original content, explicitly scoped to verified facts only, with unverifiable topics marked `status: "draft"` rather than fabricated. This is a real value-add, not invented WordPress content — recommend keeping. |
| `404` | *(WP default 404)* | **MISSING** | Confirmed via `npm run build` output: only Next's default `/_not-found` exists, no custom `not-found.tsx`. Queued for step 15. |

---

## Cross-cutting comparisons

**Header.** WordPress: absolute-positioned, transparent-over-hero on the homepage only (`css_classes: header-absolute`, `e_display_conditions` excluding the Seattle page), solid elsewhere, built from `antra-nav-menu`/`antra-menu-canvas`/`antra-info-canvas` (no core-Elementor equivalent for these, confirmed in the earlier MCP audit). New build: same transparent-over-hero-on-home pattern already implemented in `Header.tsx` (`solid = !isHome || scrolled || menuOpen`), own mobile nav component instead of the Antra off-canvas menu. Structurally on the right track. **Classification: NEEDS VISUAL REWORK** (colors/fonts need to match the corrected tokens below; behavior already close).

**Footer.** WordPress: dark background, two review-platform embeds (Google + Thumbtack via Trustindex), a finance-bar strip, logo/contact/hours/legal links. New build: dark `charcoal-950` background, `siteConfig.reviews` (5.0, 52, Google — flagged in the code as client-provided, not fabricated), links to Projects/About/Process/Financing/Blog/Contact. Missing: no visible Thumbtack review embed or equivalent; company/contact slugs differ per the table above. **Classification: NEEDS CONTENT REWORK**.

**Homepage.** WordPress has 8 top-level sections (hero/slideshow, scroll button, "Who we are", "What We Do", "Our Services" with 6-tab list + 4 stat counters, image panel, "Our Process" with 4 steps, "Our Projects" carousel). New build has 15 sections (Hero, TrustBar, Positioning, FeaturedService, CoreServices, FeaturedProjects, WhyElite, Waterproofing, Process, OneDayPromo, BeforeAfter, Testimonials, Financing, ServiceAreas, BlogTeaser, NextStepCTA). The new build is more thorough in places (a dedicated Waterproofing section matches the master prompt's explicit "don't bury the warranty" instruction; Testimonials and Financing sections don't exist on WP at all). **Classification: NEEDS CONTENT REWORK** — not because it's worse, but because "same page structure" as instructed and "15 sections vs. 8" are in tension. Recommend keeping the richer structure rather than cutting it down to match WP's, but flagging this as a deliberate deviation rather than an oversight.

**Services / service pages.** 4 of 5 slugs match. (Correction: an earlier pass of this report flagged a duplicate `full-bathroom-remodel` slug in `services.ts` as a bug — checked directly, it isn't one; the second occurrence is inside One-Day's `crossSell` field, which intentionally points back to the Full Remodel service.) Copy is well-written and honest but hasn't been diffed line-by-line against the WP service pages yet.

**Projects / project pages.** 7 of 9 WordPress projects exist; 2 are missing entirely (`bathtub-area-renovation-project`, `spa-inspired-bathroom`). Photography for the 7 that exist is real project photography already in `public/images/projects/`.

**Service areas.** Covered under decision #1 above — this is the single biggest scope gap between the archive and the build.

**Forms.** Neither Gravity Forms field set (30-field multi-step quote, 11-field contact) has been compared against `src/components/estimate/EstimateFlow.tsx` yet — queued for step 19 as instructed. Not touched or resubmitted anywhere in this reconciliation pass.

**SEO / schema.** WordPress emits `Article` schema on 9 pages including the homepage (a known bug, archived not fixed, per earlier instruction). New build's `src/lib/schema.ts` has `organizationSchema()` and `localBusinessSchema()` — worth confirming neither accidentally emits `Article`. Queued for step 18.

**Tracking.** Two GTM containers found live on WordPress (`GTM-KMB5XPJH`, `GTM-MCGRC63R` — confirm with the client whether both are intentional) plus a direct `gtag.js` load. New build has no tracking wired yet (`AttributionCapture` component exists but scope not yet inspected). Queued for step 20, not touched here.

**Mobile.** Not yet compared — queued for step 16, using `wordpress-archive/screenshots/mobile/` as source of truth.

---

## Design tokens (implemented as part of this pass — see below)

The new build's font stack (Archivo + Inter) and color tokens (`charcoal-950 #121316`, `bronze-500 #af7c45`, etc.) do not match what WordPress actually ships. The real WordPress colors are unambiguous (confirmed twice — via the live Elementor kit through the MCP earlier this session, and independently via static analysis of 62 downloaded CSS bundles):

- Colors: primary/bronze `#B98A64`, secondary/dark `#25272E`, border `#E3E3E8`, background-field `#F1F0F5`, accent (sage) `#858C6D`

Fonts are genuinely ambiguous from static analysis, and I want to be honest about that rather than assert false certainty. The same Elementor CSS custom properties (`--e-global-typography-primary-font-family`, `-secondary-`, etc.) are defined **twice** in the combined CSS with different values:

- The Elementor global kit's own configured values: **Roboto** (Primary/body) and **Figtree** (Secondary/headings) — this is what I read directly from the live kit via the MCP, i.e. the site owner's deliberately configured brand typography.
- A second, narrower set of rules (scoped to Antra-branded components — the header nav, phone number icon-box, footer CTA icon-box) overrides these to **Cal Sans** and **Golos Text**.

Which one wins for a given element depends on CSS scope/specificity I can't fully resolve without a live browser's computed styles (my design-inventory.md report already flags this limitation). Going with the kit's deliberately-configured values (Roboto + Figtree) as the **global** tokens, since that's the intentional brand decision, not an accidental default. Cal Sans and Golos Text are real and in use, but on the evidence so far they read as targeted component overrides (nav, a couple of icon-boxes) rather than the base system — I'll apply them at the component level if/when I rebuild those specific pieces, not globally. All three fonts are confirmed available via Google's font CDN and `next/font/google`.

**Implemented in this pass:** `src/app/layout.tsx` (Figtree/Roboto via `next/font/google`, replacing Archivo/Inter) and `src/app/globals.css` (`charcoal-950`, `bronze-500`, `line`, `warm-50`, `ink` tokens corrected to the verified hex values above; token *names* and every place that consumes them via `--font-heading`/`--font-body`/`bronze-*`/`charcoal-*`/`warm-*` classes were left untouched — only the 55-file blast radius of a raw hex/font swap was avoided by going through the existing semantic-variable indirection). Verified clean with `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `npm run build:vinext` (the Cloudflare/vinext build already defined in `package.json`).

---

## Status, updated after both decisions were resolved

Both blocking decisions came back: preserve WordPress URLs exactly, and rebuild all 36 service-area pages (not just the 7 verified markets) from archived content, excluding unverified pricing/financing claims. Here's what's actually done, verified, and committed to `feature/wordpress-parity` as of this pass (5 commits: `f50b6f5`, `9dce8ec`, `08b8586`, `2df4cb1`, `cd6697b`).

### Done and verified

- **Global tokens (step 1).** Figtree/Roboto fonts, corrected brand colors throughout, including a leftover in `opengraph-image.tsx` found on a second pass.
- **URL preservation (decision 1).** Every route renamed to its exact WordPress URL: `/bathroom-remodel-company-seattle`, `/contact-us`, `/bathroom-remodel-services`, `/services/bathroom-conversion`, `/service-area` (+ `[slug]` + the dedicated Tacoma page), `/thank-you`. All canonicals, breadcrumbs, nav links, footer links, and the sitemap updated to match. Area data slugs now store the full WordPress slug directly.
- **Found and fixed a real bug:** `next.config.ts` had `redirects()` sending the (now-correct) WordPress URLs to the old Next.js-only slugs — leftover from before this decision, and actively 404ing every renamed route. Removed; candidate redirects for the eventual WordPress cutover documented in a comment instead, per "don't implement redirect cleanup yet."
- **Service areas (decision 2), all 36.** 7 verified markets unchanged (hand-written). 29 more built from the WordPress archive: content extracted scoped strictly to the page's own Elementor wrapper (excludes header/footer chrome), rendered through a new `WpAreaDetail` component, with real per-city hero photography copied from the archive. Confirmed zero pricing/financing text made it into the rendered output for any of the 29.
- **Fixed a second, larger error along the way:** the existing codebase excluded 2 of the 9 WordPress projects (`spa-inspired-bathroom`, `bathtub-area-renovation-project`), reasoning their galleries had no real "after" photos. I checked the actual live photos directly (not just the code comment) and found genuine matching before/after pairs for both, confirmed by matching room geometry, not just filename order. Both are now built with real photography. All 9 WordPress projects exist in the build.
- **SEO/schema (step 18), checked, no changes needed.** `src/lib/schema.ts` already uses `HomeAndConstructionBusiness`, never `Article` (the bug WordPress has). `BreadcrumbList` and `FAQPage` JSON-LD are already wired through shared components on every page that needs them. This part of the codebase was already right.
- **Tracking (step 20), deliberately untouched.** No GTM/gtag installed anywhere in the codebase currently. Per your instruction not to blindly install both containers, I've left this alone rather than guess — see the open item below.

### Checked, found already solid, no changes needed

Header (transparent-over-hero on the homepage only, dropdown nav, mobile menu — functionally matches WordPress with one documented simplification: WordPress excludes one specific page, `/bathroom-remodeling-seattle/`, from the transparent treatment for reasons that look page-specific rather than a real design rule; the Next.js version's simpler "homepage only" rule is a reasonable call, not a gap).

### Open items for you, not resolved silently

- **Forms.** The quote flow (`EstimateFlow`, reused on both `/get-a-quote` and `/contact-us`) covers project type, ZIP, budget, timeline, free-text details, and contact info. Compared field-by-field against the archived Gravity Forms (`wordpress-archive/reports/forms-inventory.md`), it's missing: the SMS/text-message consent checkbox and its compliance language, the "why are you remodeling" / "which bathroom" / "home age" qualifying questions, and full street address (only ZIP is captured). I did not add the consent checkbox myself — that's compliance language that should come from you or counsel, not be guessed at. Flagging rather than silently adding or leaving it.
- **Tracking containers.** Two GTM IDs exist on the live site (`GTM-KMB5XPJH`, `GTM-MCGRC63R`). Nothing is installed in the Next.js build. This needs you to confirm which container(s) are real before anything is wired in — exactly the "ambiguous live integration" case I was told to stop for.
- **Visual QA (steps 15–17 in the true visual sense).** The browser preview pane got stuck on a stale URL this session and wouldn't navigate even via direct `window.location` assignment — a tooling issue, not a site issue (independently confirmed correct via `curl`, the production build's static route list, and clean lint/typecheck on every commit). True side-by-side visual comparison against the 122 archived screenshots (mobile parity, interaction states, pixel-level spacing) has not been done and needs either that pane working or another path.
- **Homepage structure.** WordPress has 8 sections; this build has 15 (adds Testimonials, Financing, BlogTeaser, a dedicated Waterproofing section, etc.). Recommended keeping the richer structure rather than cutting it down — flagged again here since "same page structure" was in the original instructions and this is a real, deliberate deviation.
- **About/Contact/legal page copy** has not been diffed line-by-line against the WordPress originals — the routes and forms are right, but I have not verified the prose matches or improves on the WP source at a sentence level.
- **Performance pass (step 21)** not started as a distinct pass — worth noting the Next.js build is already structurally far lighter than WordPress (no 126MB-of-combined-CSS problem, real `next/image` optimization throughout), so this is lower-urgency than on a from-scratch build.
