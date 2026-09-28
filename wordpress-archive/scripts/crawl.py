#!/usr/bin/env python3
"""Read-only crawler for elitebathrooms.com. Fetches every URL in data/urls.json,
saves raw HTML, and extracts SEO/content/forms/media metadata to per-page JSON."""
import json, re, os, sys, time, urllib.request, urllib.error
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_DIR = os.path.join(ROOT, "html")
DATA_DIR = os.path.join(ROOT, "data", "pages")
os.makedirs(HTML_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) EliteBathroomsArchiveBot/1.0 (read-only migration archive)"

def slugify(url):
    p = urlparse(url)
    path = p.path.strip("/")
    return path.replace("/", "__") or "home"

class Extractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.meta = {}          # name -> content
        self.og = {}            # property -> content
        self.twitter = {}
        self.canonical = None
        self.robots_meta = None
        self.jsonld = []
        self.headings = []      # (tag, text)
        self.links = []         # hrefs
        self.images = []        # src/srcset
        self.forms = []
        self._stack = []
        self._cur_tag = None
        self._cur_text = []
        self._in_title = False
        self._in_script_ld = False
        self._ld_buf = []
        self._cur_form = None
        self._cur_field = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self._in_title = True
            self._cur_text = []
        elif tag == "meta":
            name = a.get("name") or a.get("property")
            content = a.get("content")
            if name and content is not None:
                if name.startswith("og:"):
                    self.og[name] = content
                elif name.startswith("twitter:"):
                    self.twitter[name] = content
                elif name.lower() == "robots":
                    self.robots_meta = content
                else:
                    self.meta[name] = content
        elif tag == "link":
            if a.get("rel") == "canonical":
                self.canonical = a.get("href")
        elif tag == "script":
            if (a.get("type") or "").lower() == "application/ld+json":
                self._in_script_ld = True
                self._ld_buf = []
        elif tag in ("h1", "h2", "h3"):
            self._cur_tag = tag
            self._cur_text = []
        elif tag == "a":
            href = a.get("href")
            if href:
                self.links.append(href)
        elif tag == "img":
            src = a.get("src") or a.get("data-src")
            srcset = a.get("srcset") or a.get("data-srcset")
            alt = a.get("alt", "")
            if src or srcset:
                self.images.append({"src": src, "srcset": srcset, "alt": alt})
        elif tag == "form":
            self._cur_form = {"action": a.get("action"), "method": a.get("method", "get"), "id": a.get("id"), "class": a.get("class"), "fields": []}
        elif tag in ("input", "select", "textarea") and self._cur_form is not None:
            self._cur_form["fields"].append({
                "tag": tag, "type": a.get("type", "text" if tag == "input" else tag),
                "name": a.get("name"), "id": a.get("id"), "required": "required" in a,
                "placeholder": a.get("placeholder"),
            })
        style = a.get("style", "")
        m = re.search(r"background-image\s*:\s*url\(([^)]+)\)", style)
        if m:
            self.images.append({"src": m.group(1).strip("'\""), "srcset": None, "alt": "(css background-image)"})

    def handle_endtag(self, tag):
        if tag == "title":
            self.title = "".join(self._cur_text).strip()
            self._in_title = False
        elif tag in ("h1", "h2", "h3") and self._cur_tag == tag:
            text = "".join(self._cur_text).strip()
            if text:
                self.headings.append((tag, text))
            self._cur_tag = None
        elif tag == "script" and self._in_script_ld:
            raw = "".join(self._ld_buf)
            try:
                self.jsonld.append(json.loads(raw))
            except Exception:
                self.jsonld.append({"_parse_error": True, "_raw_snippet": raw[:300]})
            self._in_script_ld = False
        elif tag == "form" and self._cur_form is not None:
            self.forms.append(self._cur_form)
            self._cur_form = None

    def handle_data(self, data):
        if self._in_title:
            self._cur_text.append(data)
        elif self._cur_tag:
            self._cur_text.append(data)
        elif self._in_script_ld:
            self._ld_buf.append(data)

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            body = resp.read()
            status = resp.status
            headers = dict(resp.headers.items())
            return status, headers, body
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers.items()) if e.headers else {}, e.read()
    except Exception as e:
        return None, {}, str(e).encode()

def main():
    urls = json.load(open(os.path.join(ROOT, "data", "urls.json")))
    results = []
    for i, entry in enumerate(urls):
        url, typ = entry["url"], entry["type"]
        slug = slugify(url)
        print(f"[{i+1}/{len(urls)}] {typ:14s} {url}", file=sys.stderr)
        status, headers, body = fetch(url)
        html_path = os.path.join(HTML_DIR, slug + ".html")
        with open(html_path, "wb") as f:
            f.write(body)
        record = {"url": url, "type": typ, "slug": slug, "status": status,
                   "x_robots_tag": headers.get("X-Robots-Tag"), "content_type": headers.get("Content-Type")}
        if status == 200:
            try:
                text = body.decode("utf-8", errors="replace")
            except Exception:
                text = body.decode("latin-1", errors="replace")
            ex = Extractor()
            try:
                ex.feed(text)
            except Exception as e:
                record["parse_error"] = str(e)
            record.update({
                "title": ex.title, "meta": ex.meta, "og": ex.og, "twitter": ex.twitter,
                "canonical": ex.canonical, "robots_meta": ex.robots_meta,
                "jsonld_types": [ (j.get("@type") if isinstance(j, dict) else None) for j in ex.jsonld ],
                "jsonld": ex.jsonld,
                "headings": ex.headings,
                "links_internal": sorted(set(h for h in ex.links if "elitebathrooms.com" in h or h.startswith("/"))),
                "links_external": sorted(set(h for h in ex.links if h.startswith("http") and "elitebathrooms.com" not in h)),
                "images": ex.images,
                "forms": ex.forms,
            })
        results.append(record)
        with open(os.path.join(DATA_DIR, slug + ".json"), "w") as f:
            json.dump(record, f, indent=2, default=str)
        time.sleep(0.3)
    with open(os.path.join(ROOT, "data", "crawl-results.json"), "w") as f:
        json.dump(results, f, indent=2, default=str)
    print(f"Done. {len(results)} pages crawled.", file=sys.stderr)

if __name__ == "__main__":
    main()
