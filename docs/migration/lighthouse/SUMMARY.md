# Lighthouse Summary

Run against the local production build (`npm run build && npm run start`), Chrome headless, categories: Performance / Accessibility / Best Practices / SEO. Full JSON/HTML per page alongside this file.

## Final scores (after fixes)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home | 94 | 92 | 100 | 100 | 3.1s | 0 | 0ms |
| Services hub | 91 | 96 | 100 | 100 | 3.5s | 0 | 0ms |
| Service detail | 96 | 92 | 100 | 100 | 2.8s | 0 | 0ms |
| Projects hub | 87 | 94 | 100 | 100 | 4.1s | 0 | 0ms |
| Project detail | 94 | 96 | 100 | 100 | 3.1s | 0 | 0ms |
| Service-area hub | 97 | 96 | 100 | 100 | 2.5s | 0 | 0ms |
| Service-area detail (Tacoma) | 95 | 92 | 100 | 100 | 2.9s | 0 | 0ms |
| Contact | 90 | 96 | 100 | 100 | 3.6s | 0 | 0ms |
| Get a quote | 97 | 96 | 100 | 100 | 2.7s | 0 | 0ms |

**Best Practices: 100 everywhere. SEO: 100 everywhere. CLS: 0 everywhere (no layout shift). TBT: 0ms everywhere** (negligible main-thread blocking).

## Two real bugs found and fixed during this pass

1. **`aria-hidden-focus` (accessibility):** the closed mobile nav menu (`#mobile-nav`) was hidden with only `aria-hidden="true"`, but its links/buttons stayed focusable — a real keyboard/screen-reader trap. Fixed by adding the `inert` attribute alongside `aria-hidden`, so the whole subtree is genuinely unreachable when closed. Sitewide fix (shared component) — raised accessibility scores everywhere, not just where first found.
2. **`link-text` (SEO):** two "Learn More" links on the services hub page (linking to different services) had identical, non-descriptive accessible names. Fixed by adding visually-hidden (`sr-only`) context text (e.g. "Learn More *about Shower Remodel*") — no visible text changed. Took `services-hub` SEO from 92 to 100.

## One real finding, deliberately not fixed without your sign-off

**`color-contrast`**, present on every page, is the entire remaining accessibility gap (92-96 instead of 100+). Root cause: the brand bronze accent color used for small text (eyebrow labels, "Learn More" links, button text) — `#B98A64`, the *exact, verified* WordPress primary color — has a contrast ratio around **2.7:1 against the light background and 2.7:1 for white text on bronze buttons**, well under WCAG AA's 4.5:1 requirement for normal text. This is very likely inherited from the real brand color itself, not a coding mistake — but changing it (a darker bronze shade, or dark button text instead of white) is a visible brand/design decision, and "do not visually redesign" was explicit. Flagging with exact numbers rather than changing it myself:

| Color pair | Contrast ratio | WCAG AA needs |
|---|---|---|
| bronze-500 `#B98A64` text on warm-50 background | 2.69:1 | 4.5:1 (normal text) |
| white/warm-50 button text on bronze-500 background | 2.69:1 | 4.5:1 (normal text) |
| bronze-600 `#987152` text on warm-50 (next shade down) | 3.84:1 | still short of 4.5:1 |
| charcoal-950 (dark) text on bronze-500 background | 4.89:1 | **passes** |

The one combination that already passes is dark text on a bronze background — if you want this fully resolved, the lowest-visual-impact fix is switching button text color from white to dark on bronze-background buttons specifically; the eyebrow-label/link-text usages on light backgrounds would need a darker bronze shade than any currently in the palette. Your call, not mine, to make during a "no redesign" preview pass.

## Not chased (correctly out of scope)

- The ~27 KiB "unused JavaScript" estimate is consistent across every page — that's Next.js/React's own runtime baseline, not something introduced by this project's code.
- LCP ranges 2.5s-4.1s (projects hub and services hub are the slowest, both image-grid-heavy pages). All render real photography via `next/image` with proper `sizes`/`fill` already; further LCP gains would mean either reducing hero image dimensions or adding `priority` hints per-page, which edges toward "optimize past what a preview pass warrants" — noted, not done, since Best Practices is already 100 and nothing here is broken.
