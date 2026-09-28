#!/usr/bin/env python3
"""Extract verbatim content blocks (headings, paragraphs, images) for every
service-area page, scoped strictly to the single-page content wrapper
(data-elementor-type="single-page"), excluding header/footer chrome."""
import json, re, os
from html.parser import HTMLParser
from urllib.parse import urljoin

ROOT = "/Users/dotcomjay/Documents/DEV/Client sites/Elite Bathrooms/wordpress-archive"
BLOCK_TAGS = {"h1", "h2", "h3", "h4", "p", "li"}

class ScopedExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth_stack = []  # stack of div depths to find the scoped wrapper's close
        self.in_scope = False
        self.scope_div_depth = None
        self.cur_div_depth = 0
        self.blocks = []
        self._cur_tag = None
        self._cur_text = []
        self._skip_tags = {"script", "style"}
        self._skip_depth = 0
        self.images = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "div":
            self.cur_div_depth += 1
            if not self.in_scope and a.get("data-elementor-type") == "single-page":
                self.in_scope = True
                self.scope_div_depth = self.cur_div_depth
        if not self.in_scope:
            return
        if tag in self._skip_tags:
            self._skip_depth += 1
            return
        if tag in BLOCK_TAGS and self._cur_tag is None:
            self._cur_tag = tag
            self._cur_text = []
        if tag == "img":
            real_src = a.get("data-src") or a.get("data-litespeed-src") or a.get("src")
            if real_src and not real_src.startswith("data:"):
                self.images.append({"src": real_src, "alt": a.get("alt", "")})

    def handle_endtag(self, tag):
        if tag in self._skip_tags and self._skip_depth > 0:
            self._skip_depth -= 1
            return
        if tag == "div":
            if self.in_scope and self.cur_div_depth == self.scope_div_depth:
                self.in_scope = False
            self.cur_div_depth -= 1
        if not self.in_scope and tag != "div":
            return
        if tag == self._cur_tag:
            text = "".join(self._cur_text).strip()
            text = re.sub(r"\s+", " ", text)
            if text:
                self.blocks.append({"tag": tag, "text": text})
            self._cur_tag = None

    def handle_data(self, data):
        if self.in_scope and self._cur_tag and self._skip_depth == 0:
            self._cur_text.append(data)

def main():
    urls = json.load(open(os.path.join(ROOT, "data", "urls.json")))
    area_urls = [u for u in urls if u["type"] == "service-area"]
    out = {}
    for u in area_urls:
        slug_path = u["url"].rstrip("/").split("/")[-1]  # e.g. bathroom-remodel-tacoma
        html_slug = "service-area__" + slug_path
        path = os.path.join(ROOT, "html", html_slug + ".html")
        html = open(path, encoding="utf-8", errors="replace").read()
        ex = ScopedExtractor()
        ex.feed(html)
        page_json = json.load(open(os.path.join(ROOT, "data", "pages", html_slug + ".json")))
        images = []
        seen = set()
        for img in ex.images:
            full = urljoin(u["url"], img["src"]).split("?")[0]
            if full not in seen:
                seen.add(full)
                images.append({"url": full, "alt": img["alt"]})
        out[slug_path] = {
            "url": u["url"],
            "slug": slug_path,
            "title": page_json.get("title"),
            "meta_description": (page_json.get("meta") or {}).get("description"),
            "canonical": page_json.get("canonical"),
            "blocks": ex.blocks,
            "images": images,
        }
    json.dump(out, open(os.path.join(ROOT, "data", "area-content.json"), "w"), indent=2)
    print(f"Extracted {len(out)} service-area pages")
    # Print one sample for sanity check
    sample = out.get("bathroom-remodel-newcastle")
    print(json.dumps(sample, indent=2)[:3000])

if __name__ == "__main__":
    main()
