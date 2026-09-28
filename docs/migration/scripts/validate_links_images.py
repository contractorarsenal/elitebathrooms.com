#!/usr/bin/env python3
"""Crawl the local production build: every internal <a href> must resolve to
a 200 (or a known-external/mailto/tel exception), and every <img src> must
resolve to a 200. Reports broken links/images per page."""
import re, sys, urllib.request, urllib.error, json

BASE = "http://localhost:3000"
_status_cache = {}

def fetch(url):
    if url in _status_cache:
        return _status_cache[url]
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "parity-check"})
        with urllib.request.urlopen(req, timeout=15) as r:
            _status_cache[url] = (r.status, r.read())
    except urllib.error.HTTPError as e:
        _status_cache[url] = (e.code, b"")
    except Exception as e:
        _status_cache[url] = (None, str(e).encode())
    return _status_cache[url]

def get_routes():
    xml = urllib.request.urlopen(f"{BASE}/sitemap.xml").read().decode()
    locs = re.findall(r"<loc>([^<]*)</loc>", xml)
    return sorted(set((l.replace("https://www.elitebathrooms.com", "") or "/") for l in locs))

def main():
    routes = get_routes()
    routes += ["/thank-you"]
    broken_links = []
    broken_images = []
    checked_pages = 0

    for route in routes:
        status, body = fetch(BASE + route)
        if status != 200:
            print(f"PAGE ITSELF BROKEN: {route} -> {status}", file=sys.stderr)
            continue
        checked_pages += 1
        html = body.decode("utf-8", errors="replace")

        for href in set(re.findall(r'href="([^"]+)"', html)):
            if href.startswith(("mailto:", "tel:", "#", "http://", "https://")) and BASE not in href:
                continue  # external or same-page anchor, not our concern
            if href.startswith(BASE):
                href = href[len(BASE):]
            if not href.startswith("/"):
                continue
            full = BASE + href.split("#")[0].split("?")[0]
            if not full.rstrip("/") or full == BASE:
                continue
            s, _ = fetch(full)
            if s != 200:
                broken_links.append({"page": route, "href": href, "status": s})

        for src in set(re.findall(r'src="(/_next/image[^"]+|/images/[^"]+)"', html)):
            src = src.replace("&amp;", "&")
            full = BASE + src
            s, _ = fetch(full)
            if s != 200:
                broken_images.append({"page": route, "src": src, "status": s})

    print(json.dumps({
        "pages_checked": checked_pages,
        "broken_links": broken_links,
        "broken_images": broken_images,
    }, indent=2))

if __name__ == "__main__":
    main()
