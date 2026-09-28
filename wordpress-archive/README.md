# Elite Bathrooms — WordPress Archive

Read-only forensic archive of https://elitebathrooms.com/, captured 2026-09-27.
The live WordPress site was not modified in any way during this process.

## How this was built

- `data/urls.json` — the 61 URLs, discovered from `sitemap_index.xml` and its 4
  child sitemaps (`page-sitemap.xml`, `projects-sitemap.xml`,
  `service-area-sitemap.xml`, `services-sitemap.xml`). The WP REST API
  (`/wp-json/`) only exposes `wp/v2/pages` and `wp/v2/posts` — the Services,
  Projects, and Service Area custom post types are not in the public REST API,
  so the sitemaps are the authoritative URL list, not the MCP's page list.
- `scripts/crawl.py` — fetched every URL, saved raw HTML to `html/`, and
  extracted SEO/content/forms/media metadata to `data/pages/*.json` (mirrored
  into `pages/`).
- `scripts/download_media.py` — downloaded every Elite-owned image referenced
  across all 61 pages (536 files, deduped by SHA-256 content hash).
- `scripts/screenshot.sh` — full-page screenshots of all 61 pages at
  1440x900 (desktop) and 390x844 (mobile) via Playwright's Chromium.
- `scripts/generate_reports.py` / `generate_design_report.py` — built the six
  markdown reports in `reports/` from the above.

## Directory guide

| Folder | Contents |
|---|---|
| `reports/` | The 6 human-readable summary reports — **start here** |
| `data/` | Machine-readable JSON: `urls.json`, `crawl-results.json` (all 61 pages), `media-urls.json`, `media-inventory.json`, `css-urls.json` |
| `html/` | Raw rendered HTML for all 61 pages, exactly as served |
| `pages/` | Same per-page extraction as `data/pages/`, mirrored here per the requested layout |
| `media/{brand,projects,services,team,process,service-areas,blog,misc}/` | 536 downloaded Elite-owned images |
| `screenshots/{desktop,mobile}/` | 122 full-page PNGs (61 pages × 2 viewports) |
| `forms/` | The 2 Gravity Forms found (`gform_1` = quote flow, `gform_2` = contact), with field names, types, and labels |
| `tracking/` | `tracking-summary.json` — GTM/gtag IDs found in page source |
| `css/litespeed-combined/` | 62 combined/minified CSS bundles (one per unique page template), as served by LiteSpeed Cache |
| `css/fonts/` | The Google Fonts stylesheet (Cal Sans, Golos Text) |
| `seo/` | `robots.txt` and the raw sitemap XML files |

## Known gaps (see the final chat report for full detail)

- Screenshots are single-viewport full-page captures, not interaction-state
  captures (mobile menu open, dropdown open, accordion expanded) — those
  would need scripted interaction per page and were out of scope for this pass.
- CSS is the server-combined bundle per page, not a resolved/deduplicated
  design-token file — `reports/design-inventory.md` aggregates it into
  colors/fonts/breakpoints, but a component-by-component style map would need
  manual work against the screenshots.
- No secrets, API keys, or non-public data were captured anywhere in this
  archive.
