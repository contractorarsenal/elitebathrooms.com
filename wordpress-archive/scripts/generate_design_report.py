#!/usr/bin/env python3
"""Aggregate colors/fonts/breakpoints/radii/shadows across all combined CSS bundles."""
import re, glob, os
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
css_files = glob.glob(os.path.join(ROOT, "css", "litespeed-combined", "*.css"))

colors = Counter()
fonts = Counter()
breakpoints = Counter()
radii = Counter()
shadows = Counter()
transitions = Counter()

for path in css_files:
    css = open(path, encoding="utf-8", errors="replace").read()
    for m in re.findall(r"#[0-9a-fA-F]{3,8}\b", css):
        colors[m.lower()] += 1
    for m in re.findall(r"font-family:\s*([^;]+);", css):
        fonts[m.strip()] += 1
    for m in re.findall(r"@media[^{]+", css):
        breakpoints[m.strip()] += 1
    for m in re.findall(r"border-radius:\s*([^;]+);", css):
        radii[m.strip()] += 1
    for m in re.findall(r"box-shadow:\s*([^;]+);", css):
        shadows[m.strip()] += 1
    for m in re.findall(r"transition:\s*([^;]+);", css):
        transitions[m.strip()] += 1

lines = ["# Design Inventory", "",
         f"Aggregated from {len(css_files)} LiteSpeed-combined CSS bundles (one per unique page template, "
         "downloaded from the live site) plus the Google Fonts stylesheet. This is a static-CSS analysis, "
         "not a live computed-style capture — see caveat at the end.", "",
         "## Brand / frequently-used colors (top 30 by occurrence across all bundles)", "",
         "| Color | Occurrences | Likely role |", "|---|---|---|"]
role_hints = {
    "#b98a64": "Primary / brand accent (bronze) — matches Elementor kit `primary` token",
    "#25272e": "Secondary / heading dark — matches Elementor kit `secondary` token",
    "#e3e3e8": "Border — matches Elementor kit `border` token",
    "#f1f0f5": "Background field — matches Elementor kit `background-field` token",
    "#858c6d": "Accent (sage green) — matches Elementor kit `accent` token",
    "#cbd3b2": "Accent light (sage) — matches Elementor kit `lighter` token",
    "#fff": "White", "#ffffff": "White", "#000": "Black", "#000000": "Black",
}
for c, n in colors.most_common(30):
    lines.append(f"| `{c}` | {n} | {role_hints.get(c, '')} |")

lines += ["", "## Font families actually declared in CSS (not just the Elementor kit's abstract tokens)", "",
          "The Elementor global kit declares Primary=Roboto and Secondary(Heading)=Figtree, but the rendered CSS shows "
          "these theme/antra-specific overrides in real use:", "",
          "| font-family value | Occurrences |", "|---|---|"]
for f, n in fonts.most_common(25):
    lines.append(f"| `{f}` | {n} |")

lines += ["", "## Responsive breakpoints found (`@media` queries, by frequency)", "",
          "| Media query | Occurrences |", "|---|---|"]
for b, n in breakpoints.most_common(30):
    lines.append(f"| `{b}` | {n} |")

lines += ["", "## Border radii in use", "", "| Value | Occurrences |", "|---|---|"]
for r, n in radii.most_common(20):
    lines.append(f"| `{r}` | {n} |")

lines += ["", "## Box shadows in use", "", "| Value | Occurrences |", "|---|---|"]
for s, n in shadows.most_common(15):
    lines.append(f"| `{s}` | {n} |")

lines += ["", "## Known values (from the live Elementor global kit, read via MCP earlier this session)", "",
          "- Colors: primary `#B98A64`, secondary `#25272E`, text `#000000`, accent `#858C6D`, "
          "accent-light `#CBD3B2`, dark `#000000`, border `#E3E3E8`, background-field `#F1F0F5`",
          "- Typography: Primary = Roboto 16px/400 · Secondary(Heading) = Figtree 800 4.4rem",
          "- Container width: 1410px · widget spacing: 1rem", "",
          "## Caveat", "",
          "This report is built by regex-scanning 62 static, server-combined CSS bundles (LiteSpeed's combine/minify "
          "output, one per page template) for literal color/font/breakpoint values. It captures every value the site "
          "actually ships, but it is not a live computed-style audit (hover states, JS-driven animation classes, and "
          "which of these values apply to which specific component are not resolved here). Screenshots in "
          "`screenshots/` are the more reliable source for exact visual layout and spacing per component.", ""]

open(os.path.join(ROOT, "reports", "design-inventory.md"), "w").write("\n".join(lines) + "\n")
print("design-inventory.md written,", len(css_files), "css files analyzed")
