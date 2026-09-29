# Homepage Visual Parity — WordPress Rebuild

## Method

The WordPress reference used for this comparison is **not** the raw archived
screenshot. Several sections on the live site are gated behind a broken
scroll-triggered animation (Elementor `elementor-invisible` / a LiteSpeed
lazy-background rule that never gets satisfied), so the raw screenshot shows
blank gaps that are not the intended design.

Per instruction, the correct WordPress reference was produced by:
1. Loading `https://elitebathrooms.com/` in a real (Playwright) browser tab.
2. Reading the live DOM/CSS to find the actual gating mechanism (documented
   below, per section).
3. Read-only, in that throwaway tab only: adding the `.e-lazyloaded` class
   Elementor's own lazy-background CSS rule checks for, and forcing the
   specific `.elementor-invisible` elements to their own already-defined
   final `opacity:1; transform:none` state. Nothing was written back to
   WordPress.
4. Capturing that corrected state and reading exact
   `getBoundingClientRect()` / `getComputedStyle()` values from it — not
   estimating from pixels.

That corrected capture is `wordpress-desktop.png` / `wordpress-mobile.png` in
[`homepage-visual-diff/`](./homepage-visual-diff/), which also contains
`rebuild-*`, `diff-*` (absolute pixel difference), and `overlay-*` (50/50
blend, for spotting misalignment) for both 1440×900 and 390×844.

## Per-section gating mechanism (what was actually broken, and how)

| Section | Real mechanism found | Evidence |
|---|---|---|
| Who We Are — 3 service cards | `elementor-invisible` class sets `opacity/transform`, but a separate inline `visibility:hidden` is the actual blocker; never cleared because the scroll-linked JS that should clear it doesn't fire reliably | `getComputedStyle` showed `opacity:1` but `visibility:hidden` on all 3 cards |
| What We Do — "REMODEL" text | Renders correctly as-is; no gating | Directly measured |
| Our Services — 4 stat counters | Real `data-to-value` targets exist (10/300/10/40); the count-up JS never starts | `data-duration="2000" data-to-value="10"` etc. on each `.elementor-counter-number` |
| How We Work — "elite" text + 3D image | The 3D image is `elementor-invisible` (same `visibility:hidden` issue as Who We Are); the "elite" text itself was never hidden — it's genuinely a plain, low-opacity, normal-weight watermark | Forced-visible capture showed the real `home-floating-3D.png` isometric bathroom render, not a substituted graphic |
| Our Projects | The Swiper carousel JS never initializes (`swiper-initialized` class never gets added); separately, each slide's photo is set via a per-post inline `<style>` block whose selector is correct but is overridden by a LiteSpeed rule — `.e-con.e-parent:nth-of-type(n+2/3):not(.e-lazyloaded) *{background-image:none!important}` — because `.e-lazyloaded` never gets added | Confirmed by adding `.e-lazyloaded` directly: the real per-project photo appeared |
| Google Reviews / Thumbtack Reviews | Third-party Trustindex widget, client-side only, zero static fallback markup, no review text in the page's own JSON-LD either | Checked `home.html`'s JSON-LD `@graph` directly — no review objects present |
| Footer background photo | Same `.e-lazyloaded` lazy-background gate as the carousel | `background-image` computed as `none` until `.e-lazyloaded` added, then resolved to `footer-bg-1.jpg` |

## Concrete corrections made against the first-pass rebuild

Each line is a measured before/after, not an impression.

- **Hero heading position**: was 39% from viewport top; WordPress is 27.2%
  (measured: content block vertically centered, 245px top/bottom gap on a
  900px-tall section). Fixed by switching the section from bottom-aligned to
  centered and correcting the internal element gaps to WordPress's measured
  48px (heading→paragraph) and 64px (paragraph→button) at desktop, 400 (font-weight)/38.4px (font-size) heading and 16px paragraph at mobile — was
  incorrectly using 44px/19.2px.
- **Hero heading line wrap**: was wrapping "Bathroom Remodeling In Tacoma," /
  "WA" (2 lines); WordPress wraps "Bathroom Remodeling In" / "Tacoma, WA".
  Fixed with an explicit line break matching WordPress's actual line break
  point at this width.
- **Header logo-to-nav gap**: was 33px; WordPress is 76.8px (`margin-right:
  80px` on the live logo widget). Fixed.
- **Header nav item gaps**: were 24–36px; WordPress is a flat 9.6px between
  every nav item and every right-cluster item. Fixed to 10px.
- **"Get A Quote" header button**: was wrapping to two lines ("Get A" /
  "Quote") at this width. Fixed with `whitespace-nowrap`.
- **Who We Are's 3 cards**: were flat text blocks with no container. Real
  design: white cards, 24px border-radius, 38px/40px/43px padding
  (top/sides/bottom), icon top-right at 81×81px, heading top-left, divider,
  body text — all measured directly from the forced-visible DOM. Rebuilt to
  match.
- **Who We Are crown graphic**: was 220×300px; WordPress is 250×350px at
  10% opacity (was 15%). Fixed.
- **What We Do "REMODEL" watermark**: was font-weight 800 (extrabold) at
  6% white opacity, positioned at 26% from left. WordPress is font-weight
  400 (normal) at 9.4% white opacity, positioned at 10% from left,
  font-size 390px at 1440. Fixed.
- **How We Work "elite" watermark + 3D graphic**: previously rendered as a
  flat extrabold watermark with no image, because the 3D image's real
  gating bug hadn't been diagnosed yet. WordPress: font-weight 400, 6%
  black opacity, plus the real `home-floating-3D.png` isometric bathroom
  render positioned to its right. Fixed — image now renders.
- **Stat counters**: were static "0" text (matching the broken live state,
  not the intended one). Now animate to the real target values (10 years,
  300+ projects, 10+ professionals, 40+ cities) via IntersectionObserver,
  matching the "+" suffix pattern the live screenshot shows for 3 of the 4.
- **Our Projects**: was a static 3-column grid of 6 photos with no
  interaction. WordPress is a single-slide carousel, ~2.325:1 aspect ratio
  (measured 1376×592), prev/next arrows straddling the slide edges (50×50px,
  half on/off the image boundary), hover reveals a dark gradient + 32px
  bold white title linking to the real project page. Rebuilt as a working
  carousel with the same 6 real photos, same hrefs (verified against
  `src/data/projects.ts` — all 6 slugs exist), same hover behavior.
- **"1 DAY" promo text**: was treated as a faded watermark (70% opacity
  bronze). WordPress: solid bronze-500 (#B98A64), full opacity, weight 800,
  208px at 1440. Fixed. Also added the real faint architectural-blueprint
  graphic (`footer-demo1.png`) behind it, bottom-left — this asset exists
  in the archive and is used exactly there, not elsewhere.
- **Footer background**: was a flat charcoal color. WordPress uses a real
  photo (`footer-bg-1.jpg` — the crew sitting in front of a TV displaying
  the Elite Bathrooms logo) as a full-bleed background with no additional
  dark overlay layer (confirmed: no `.elementor-background-overlay`
  element, no `filter`, no `background-blend-mode` — the photo's own
  exposure carries the legibility). Fixed.
- **Footer/footer "ELITE" watermark**: was 6% white opacity, extrabold.
  WordPress is 25% white opacity, weight 400, 400px at 1440. Fixed.

## Second alignment pass — concrete fixes

Both previously-reported measurable mismatches were root-caused and fixed,
not written off as rendering variance:

1. **Hero heading/paragraph vertical position**: measured `h1` top was
   245.25px in both WordPress and the rebuild (exact match) before this
   pass — the visual "offset" in the 50/50 overlay was misleading; a direct
   pixel-row scan of both PNGs found the heading's top ink edge at row 253
   (WordPress) vs. row 252 (rebuild), a 1px difference, and a direct crop
   comparison of both the heading and paragraph regions shows them
   effectively coincident. No further layout change was needed or made.
2. **Header phone / "Get A Quote" cluster**: root cause found and fixed —
   the phone icon was 22.4px, should be 30px (WordPress computed); the gap
   inside the phone link was 10px, should be 13px; the phone text was
   15.2px, should be 18px; the dot-grid icon button was 40px, should be
   56px; the "Get A Quote" button padding/tracking didn't match WordPress's
   `10px 25px` padding / `normal` letter-spacing (was using the shared
   `Button` component's generic `24px/12px` padding and `0.06em` tracking).
   After fixing all five: dot-grid icon right edge now 1420px in both
   (exact match), "Get A Quote" button right edge now 1354px in both (exact
   match), phone link left edge now 1033.7px vs. WordPress's 1038.5px (4.8px
   residual, down from 36.4px).

## Reviews — real content retrieved, not invented

Per instruction, inspected the fully rendered live page rather than
declaring the widgets unreproducible. Google reviews are Trustindex data
sitting in an inert `<template id="trustindex-google-widget-html">` that
the widget's own JS never injects into the visible DOM (a separate bug from
the others documented above) — its content is real and was read directly.
The Thumbtack widget (`.ti-widget.ti-thum`) does render its real review
content, but only once the (unrelated) warranty "More Details" button is
clicked first — confirmed by clicking it and re-inspecting the DOM.
Extracted 10 real Google reviews and 10 real Thumbtack reviews (verified
name, star count, full text) directly from the live page; `GoogleReviews.tsx`
and `ThumbtackReviews.tsx` now show 3 of each, verbatim, as card excerpts —
no reviewer name, rating, or text is invented. Because neither widget ever
has a real rendered visual layout on the live site (both stay an empty box
or an inert template), there is no live visual template to copy pixel-for-
pixel for the cards themselves — only the surrounding heading, which does
match exactly.

## Warranty "More Details" — real behavior, not a placeholder

This was wrongly reported as empty in the first pass. Clicking the live
button reveals 3 real warranty items (confirmed via direct interaction, not
static crawling): "10-Year Waterproofing Coverage," "1-Year Labour
Warranty," "Responsive Post-Project Support," each with real body copy.
`WarrantyStrip.tsx` is now a working expand/collapse control (starts
collapsed, matching WordPress's default state) showing this verbatim
content on click.

## Remaining differences that could not be fully resolved

1. **Header phone link position**: 4.8px left of WordPress's position
   (1033.7px vs. 1038.5px) after the icon/gap/font-size fixes above. Not
   further isolated.
2. **Team section / FAQ section**: do not exist anywhere in
   `wordpress-archive/html/home.html`. Not built, since there is nothing on
   the live homepage to reproduce.
