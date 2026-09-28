# Parity QA scripts

Run against the local production build (`npm run build && npm run start`, port 3000).

- `capture_all.mjs` — Playwright script (not the bare CLI) that discovers every
  route from `/sitemap.xml`, scrolls each page fully before screenshotting
  (avoids the lazy-image/full-page-screenshot artifact documented in
  `../parity-report.md`), and writes desktop (1440×900) + mobile (390×844)
  full-page PNGs to `../parity-screenshots/`. Needs Playwright's Node API:
  `npm install playwright --no-save` in a scratch directory (kept out of
  this project's own `package.json`/lockfile), then run from there.
- `validate_links_images.py` — stdlib-only crawler: every internal link and
  every image on every sitemap page must resolve to HTTP 200. No deps needed.
- `check_quote_flow.mjs` — Playwright script that drives the `/get-a-quote`
  form through all 5 steps and asserts the consent checkbox is genuinely
  required to submit. Needs the Node Playwright API like `capture_all.mjs`.
