#!/usr/bin/env python3
"""Turn the extracted, scoped WordPress content (data/area-content.json) into
a clean TypeScript data file for the 29 non-verified service-area pages.

Excludes, per the explicit no-fabrication rule for this project:
- The in-page jump-nav chrome (About/Services/Offers/Process/Projects/FAQ/Consultation)
- The "Bathroom Financing Available" section (0% interest / 100% financing claims)
- The "How much does bathroom remodeling cost in {city}?" FAQ Q&A (published
  price-range claims: $15k-20k / $25k-30k / $50k+, identical on every page)
- Gravity Forms UI chrome fragments that leaked into the content scope
  ("*" indicates required fields", "Step N of M")
- The empty "Business Hours" heading (no real content followed it; real
  verified hours already live in src/lib/site-config.ts)

Also verified excluded, discovered on a later pass by visually comparing a
rendered page against its WordPress screenshot rather than trusting the
text extraction alone: each page's "antra-pricing" widget ("Complete
Bathroom Remodel" / "One-Day Bathroom Conversion" offer cards) carries a
"$1000 discount" claim and a "in 1 day!" claim inside <span> subheading/
price elements. This extractor only reads h1-h4/p/li text, so those spans
were never captured in the first place -- confirmed safe, but by accident
of scope rather than by a rule written for them. The card *feature lists*
(e.g. "Full Demolition & Haul-Away") are separate <li> items and ARE kept,
since those describe real scope of work, not a price or a time promise.

Everything else -- headings, service descriptions, process/projects
references, the remaining FAQ, and the county/city directory -- is kept
verbatim as the parity-migration source of truth.
"""
import json, os, re

ROOT = "/Users/dotcomjay/Documents/DEV/Client sites/Elite Bathrooms/wordpress-archive"
VERIFIED_SLUGS = {
    "bathroom-remodel-tacoma", "bathroom-remodel-seattle", "bathroom-remodel-bellevue",
    "bathroom-remodel-kirkland", "bathroom-remodel-issaquah", "bathroom-remodel-sammamish",
    "bathroom-remodel-puyallup",
}
NAV_CHROME = {"about", "services", "offers", "process", "projects", "faq", "consultation"}

def city_name_from_slug(slug: str) -> str:
    city = slug.replace("bathroom-remodel-", "")
    return " ".join(w.capitalize() for w in city.split("-"))

def is_gf_chrome(text: str) -> bool:
    return bool(re.match(r'^"?\*"? indicates required fields', text) or re.match(r"^Step \d+ of \d+$", text))

def filter_blocks(blocks):
    out = []
    i = 0
    n = len(blocks)
    while i < n:
        b = blocks[i]
        tag, text = b["tag"], b["text"]
        low = text.strip().lower()

        # Drop the in-page jump-nav chrome (only appears as isolated single-word li's right after h1)
        if tag == "li" and low in NAV_CHROME:
            i += 1
            continue
        # Drop the empty "Business Hours" heading
        if tag == "h3" and low == "business hours":
            i += 1
            continue
        # Drop the financing section: heading through its bullet list
        if tag == "h2" and "financing available" in low:
            i += 1
            while i < n and blocks[i]["tag"] == "li":
                i += 1
            continue
        # Drop the cost/pricing FAQ pair: "How much does ... cost" heading + its answer paragraph
        if tag == "h4" and ("how much does" in low and "cost" in low):
            i += 1
            if i < n and blocks[i]["tag"] == "p":
                i += 1
            continue
        # Drop Gravity Forms chrome fragments
        if is_gf_chrome(text):
            i += 1
            continue
        out.append(b)
        i += 1
    return out

# WordPress's own uploaded filename is misspelled for this one city (matches
# the site's slug typo pattern, e.g. /bathroom-remodel-bothel/) -- the URL
# slug is correctly "bainbridge-island" but the image file is literally
# named "brainbridge-island.jpg" on the live site. Documented, not silently
# corrected -- flagged in the reconciliation report for the later cleanup pass.
HERO_FILENAME_OVERRIDES = {
    "bainbridge-island": "brainbridge-island",
}

def pick_hero_image(page, city_slug_suffix):
    needle = HERO_FILENAME_OVERRIDES.get(city_slug_suffix, city_slug_suffix)
    for img in page["images"]:
        if needle in img["url"].lower() and img["url"].lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
            return img["url"]
    return None

def ts_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)

def main():
    content = json.load(open(os.path.join(ROOT, "data", "area-content.json")))
    media = json.load(open(os.path.join(ROOT, "data", "media-inventory.json")))
    url_to_local = {m["url"]: m["local_path"] for m in media}

    entries = []
    skipped_no_change = []
    for slug, page in sorted(content.items()):
        if slug in VERIFIED_SLUGS:
            continue
        city_suffix = slug.replace("bathroom-remodel-", "")
        blocks = filter_blocks(page["blocks"])
        hero_url = pick_hero_image(page, city_suffix)
        hero_local = url_to_local.get(hero_url) if hero_url else None
        entries.append({
            "slug": slug,
            "name": city_name_from_slug(slug),
            "title": page["title"],
            "metaDescription": page["meta_description"],
            "sourceUrl": page["url"],
            "heroImage": hero_local,
            "blocks": blocks,
        })

    # Emit TypeScript
    lines = []
    lines.append("// AUTO-GENERATED from wordpress-archive/data/area-content.json")
    lines.append("// by wordpress-archive/scripts/build_area_data.py -- do not hand-edit.")
    lines.append("//")
    lines.append("// Verbatim content migrated from the live WordPress Service Area CPT pages")
    lines.append("// (parity migration, not a rewrite -- see docs/migration/rebuild-reconciliation.md).")
    lines.append("// Deliberately excluded: the site-wide '0% Interest / 100% financing' claims and the")
    lines.append("// '$15k-20k / $25k-30k / $50k+' price-range FAQ answer that appear identically on")
    lines.append("// every one of these pages -- unverified financial claims are never published per this")
    lines.append("// project's rules, regardless of source. Flagged for the client to confirm or discard")
    lines.append("// separately; the original text is preserved untouched in the WordPress archive.")
    lines.append("")
    lines.append('export type WpAreaBlock = { tag: "h1" | "h2" | "h3" | "h4" | "p" | "li"; text: string };')
    lines.append("")
    lines.append("export type WpSourcedArea = {")
    lines.append("  slug: string;")
    lines.append("  name: string;")
    lines.append("  title: string;")
    lines.append("  metaDescription: string;")
    lines.append("  sourceUrl: string;")
    lines.append("  heroImage: string | null;")
    lines.append("  blocks: WpAreaBlock[];")
    lines.append("};")
    lines.append("")
    lines.append("export const wpSourcedAreas: WpSourcedArea[] = [")
    for e in entries:
        lines.append("  {")
        lines.append(f"    slug: {ts_string(e['slug'])},")
        lines.append(f"    name: {ts_string(e['name'])},")
        lines.append(f"    title: {ts_string(e['title'] or '')},")
        lines.append(f"    metaDescription: {ts_string(e['metaDescription'] or '')},")
        lines.append(f"    sourceUrl: {ts_string(e['sourceUrl'])},")
        hero = f"/images/service-areas/{os.path.basename(e['heroImage'])}" if e["heroImage"] else "null"
        lines.append(f"    heroImage: {ts_string(hero) if e['heroImage'] else 'null'},")
        lines.append("    blocks: [")
        for b in e["blocks"]:
            lines.append(f"      {{ tag: {ts_string(b['tag'])}, text: {ts_string(b['text'])} }},")
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export function getWpSourcedAreaBySlug(slug: string) {")
    lines.append("  return wpSourcedAreas.find((a) => a.slug === slug);")
    lines.append("}")
    lines.append("")

    out_path = "/Users/dotcomjay/Documents/DEV/Client sites/Elite Bathrooms/src/data/areas-wp-sourced.ts"
    open(out_path, "w").write("\n".join(lines))
    print(f"Wrote {len(entries)} WP-sourced area entries to {out_path}")

    # Also emit the image copy list
    copy_list = [(e["heroImage"], f"public/images/service-areas/{os.path.basename(e['heroImage'])}")
                 for e in entries if e["heroImage"]]
    json.dump(copy_list, open(os.path.join(ROOT, "data", "area-image-copy-list.json"), "w"), indent=2)
    print(f"{len(copy_list)} hero images to copy")

    missing_hero = [e["slug"] for e in entries if not e["heroImage"]]
    if missing_hero:
        print("MISSING HERO IMAGE:", missing_hero)

if __name__ == "__main__":
    main()
