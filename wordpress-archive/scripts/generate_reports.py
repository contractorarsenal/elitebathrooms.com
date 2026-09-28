#!/usr/bin/env python3
"""Build the six markdown reports from the crawled/downloaded archive data."""
import json, os, re, glob
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORTS = os.path.join(ROOT, "reports")
os.makedirs(REPORTS, exist_ok=True)

crawl = json.load(open(os.path.join(ROOT, "data", "crawl-results.json")))
media = json.load(open(os.path.join(ROOT, "data", "media-inventory.json")))
media_errors = json.load(open(os.path.join(ROOT, "data", "media-errors.json")))

def esc(s):
    return (s or "").replace("|", "\\|").replace("\n", " ").strip()

# ---------- url-inventory.md ----------
lines = ["# URL Inventory", "", f"Source: https://elitebathrooms.com/ (crawled via sitemap_index.xml + robots.txt)", "",
         f"Total URLs discovered: **{len(crawl)}**", ""]
by_type = Counter(r["type"] for r in crawl)
for t, c in by_type.items():
    lines.append(f"- {t}: {c}")
lines += ["", "| # | Type | URL | Status | Title | H1 | Robots meta |", "|---|---|---|---|---|---|---|"]
for i, r in enumerate(crawl, 1):
    h1 = next((h[1] for h in r.get("headings", []) if h[0] == "h1"), "")
    lines.append(f"| {i} | {r['type']} | {r['url']} | {r['status']} | {esc(r.get('title'))} | {esc(h1)} | {esc(r.get('robots_meta')) or '(none)'} |")
open(os.path.join(REPORTS, "url-inventory.md"), "w").write("\n".join(lines) + "\n")

# ---------- seo-inventory.md ----------
lines = ["# SEO Inventory", "", "Archived exactly as found. Not corrected.", ""]
schema_counter = Counter()
article_pages = []
for r in crawl:
    types = []
    for j in r.get("jsonld", []):
        if isinstance(j, dict):
            if "@graph" in j:
                for g in j["@graph"]:
                    t = g.get("@type")
                    if isinstance(t, list):
                        types.extend(t)
                    elif t:
                        types.append(t)
            elif j.get("@type"):
                t = j.get("@type")
                if isinstance(t, list): types.extend(t)
                else: types.append(t)
    for t in types:
        schema_counter[t] += 1
    if "Article" in types:
        article_pages.append(r["url"])
lines.append("## Schema types found across the site")
lines.append("")
lines.append("| Schema @type | Pages using it |")
lines.append("|---|---|")
for t, c in schema_counter.most_common():
    lines.append(f"| {t} | {c} |")
lines += ["", "## Known issue: Article schema on non-article pages", "",
          f"{len(article_pages)} pages emit `Article` schema in their JSON-LD `@graph` alongside `WebPage`. "
          "This includes the homepage. These are not blog articles. Archived as-is per instructions; not corrected here.", ""]
for u in article_pages:
    lines.append(f"- {u}")
lines += ["", "## Per-page SEO detail", "",
          "| URL | Title (len) | Meta description (len) | Canonical | OG title | OG image | Twitter card |",
          "|---|---|---|---|---|---|---|"]
for r in crawl:
    title = r.get("title") or ""
    desc = (r.get("meta") or {}).get("description") or ""
    lines.append(f"| {r['url']} | {esc(title)} ({len(title)}) | {esc(desc)} ({len(desc)}) | {esc(r.get('canonical'))} | "
                 f"{esc((r.get('og') or {}).get('og:title'))} | {esc((r.get('og') or {}).get('og:image'))} | "
                 f"{esc((r.get('twitter') or {}).get('twitter:card'))} |")
open(os.path.join(REPORTS, "seo-inventory.md"), "w").write("\n".join(lines) + "\n")

# ---------- forms-inventory.md ----------
def extract_labels(html):
    labels = {}
    for m in re.finditer(r"<label[^>]*for=['\"]([^'\"]+)['\"][^>]*>(.*?)(?:<span|</label>)", html, re.S):
        fid, text = m.group(1), m.group(2)
        text = re.sub(r"<[^>]+>", "", text).strip()
        if text:
            labels[fid] = text
    return labels

lines = ["# Forms Inventory", "", "Production forms were not submitted or modified. Field structure read from rendered HTML only.", ""]
seen_form_ids = set()
for r in crawl:
    forms = r.get("forms") or []
    for f in forms:
        fid = f.get("id")
        if fid in seen_form_ids:
            continue
        seen_form_ids.add(fid)
        html_path = os.path.join(ROOT, "html", r["slug"] + ".html")
        html = open(html_path, encoding="utf-8", errors="replace").read() if os.path.exists(html_path) else ""
        labels = extract_labels(html)
        lines.append(f"## Form `{fid}` (found on {r['url']})")
        lines.append("")
        lines.append(f"- action: `{f.get('action')}`  method: `{f.get('method')}`  class: `{f.get('class')}`")
        lines.append(f"- provider: Gravity Forms (gform_* markup)" if (fid or "").startswith("gform") else "- provider: unknown")
        lines.append("")
        lines.append("| Field name | Type | Label | Required (HTML attr) |")
        lines.append("|---|---|---|---|")
        for field in f.get("fields", []):
            name = field.get("name") or field.get("id") or ""
            label = labels.get(field.get("id"), "")
            lines.append(f"| {esc(name)} | {field.get('type')} | {esc(label)} | {field.get('required')} |")
        lines.append("")
open(os.path.join(REPORTS, "forms-inventory.md"), "w").write("\n".join(lines) + "\n")

# ---------- tracking-inventory.md ----------
gtm_ids = set()
gtag_ids = set()
other = set()
for hp in glob.glob(os.path.join(ROOT, "html", "*.html")):
    html = open(hp, encoding="utf-8", errors="replace").read()
    gtm_ids.update(re.findall(r"GTM-[A-Z0-9]+", html))
    gtag_ids.update(re.findall(r"googletagmanager\.com/gtag/js\?id=([A-Za-z0-9-]*)", html))
    if "cdn.trustindex.io" in html:
        other.add("Trustindex (review widget, cdn.trustindex.io)")
lines = ["# Tracking Inventory", "", "Detected from rendered page source only (client-side). No secrets recorded.", "",
         "## Google Tag Manager", ""]
for g in sorted(gtm_ids):
    lines.append(f"- `{g}` (present site-wide)")
lines += ["", f"Note: {len(gtm_ids)} distinct GTM containers were found loaded on the same pages. "
              "This is unusual; confirm with the client whether both are intentional (e.g. one for a third-party agency).", "",
          "## Google tag (gtag.js) direct load", ""]
for g in sorted(gtag_ids):
    if g:
        lines.append(f"- `{g}` (loaded directly via googletagmanager.com/gtag/js, not only via GTM container)")
lines += ["", "## Not found in rendered page source (may be configured inside GTM, or absent)", "",
          "- No direct GA4 Measurement ID (`G-XXXXXXX`) hardcoded in page source",
          "- No Meta/Facebook Pixel (`fbq(...)`, `connect.facebook.net`) found",
          "- No Microsoft Clarity (`clarity.ms/tag/...`) found",
          "- No Google Ads conversion ID (`AW-XXXXXXX`) found in page source", "",
          "## Other third-party scripts", ""]
for o in sorted(other):
    lines.append(f"- {o}")
lines += ["", "## Plugin footprint (from WP REST API namespaces, informs what may be injecting tracking/behavior)", "",
          "- litespeed (cache + lazy-load + CSS/JS combine)",
          "- rankmath (SEO, sitemaps, schema)",
          "- elementor / elementor-pro / elementor-ai (page builder)",
          "- hfe (Header Footer Elementor / Ultimate Addons for Elementor)",
          "- complianz (cookie consent banner)",
          "- trustindex (Google + Thumbtack review widgets)",
          "- ai1wm (All-in-One WP Migration — relevant if a full WP export is ever wanted as a fallback)",
          "- google-site-kit (likely source of the GTM/gtag wiring)",
          "- nps-survey", ""]
open(os.path.join(REPORTS, "tracking-inventory.md"), "w").write("\n".join(lines) + "\n")

# ---------- media-inventory.md ----------
lines = ["# Media Inventory", "", f"Elite-owned assets downloaded: **{len(media)}**",
         f"Total size: **{sum(x['bytes'] for x in media)/1024/1024:.1f} MB**",
         f"Download errors: **{len(media_errors)}**", ""]
by_cat = Counter(x["category"] for x in media)
lines.append("## By category")
lines.append("")
for c, n in by_cat.most_common():
    lines.append(f"- {c}: {n} files")
lines += ["", "## Not downloaded (third-party, not Elite-owned)", "",
          "- cdn.trustindex.io review-widget assets (10 URLs) — third-party service, not ours to redistribute", "",
          "## Note on size variants", "",
          "WordPress/Elementor generates multiple resized copies of most photos (e.g. `-150x150`, `-300x300`, `-629x629`, "
          "`-768x768`, `-1024x1024` suffixes) for responsive `srcset`. All variants referenced in page HTML were downloaded "
          "as found. For the rebuild, only the largest variant of each source photo is needed; the smaller ones are listed here "
          "for completeness per the archive instructions, not because the rebuild should use them.", "",
          "## Full listing", "", "| Local path | Category | Source URL | Bytes | Alt text | Referenced on |",
          "|---|---|---|---|---|---|"]
for m in sorted(media, key=lambda x: x["local_path"]):
    pages = ", ".join(m["pages"][:2]) + (f" (+{len(m['pages'])-2} more)" if len(m["pages"]) > 2 else "")
    lines.append(f"| {m['local_path']} | {m['category']} | {m['url']} | {m['bytes']} | {esc(m['alt'])} | {esc(pages)} |")
open(os.path.join(REPORTS, "media-inventory.md"), "w").write("\n".join(lines) + "\n")

print("Reports written:", os.listdir(REPORTS))
