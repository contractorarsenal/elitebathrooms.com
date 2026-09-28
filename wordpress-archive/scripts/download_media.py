#!/usr/bin/env python3
"""Download all Elite-owned media referenced across the crawled site, category by URL/page hints,
dedupe by content hash (keeping the first path, recording duplicates)."""
import json, os, re, sys, time, hashlib, urllib.request, urllib.error
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_DIR = os.path.join(ROOT, "media")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) EliteBathroomsArchiveBot/1.0 (read-only migration archive)"

CATS = ["brand", "projects", "services", "team", "process", "service-areas", "blog", "misc"]

def categorize(url, pages):
    u = url.lower()
    p = " ".join(pages).lower()
    if "logo" in u or "favicon" in u or "/brand" in u:
        return "brand"
    if "/projects/" in p or re.search(r"project", u):
        return "projects"
    if "/services/" in p or "service" in u and "service-area" not in u:
        return "services"
    if "/service-area" in p or "service-area" in u:
        return "service-areas"
    if "/blog/" in p or "blog" in u:
        return "blog"
    if re.search(r"team|crew|truck|van", u):
        return "team"
    if re.search(r"process|consultation|installation|handover|planning", u):
        return "process"
    return "misc"

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.status, resp.read(), dict(resp.headers.items())

def main():
    entries = json.load(open(os.path.join(ROOT, "data", "media-urls.json")))
    entries = [e for e in entries if urlparse(e["url"]).netloc == "elitebathrooms.com"]
    hash_to_path = {}
    inventory = []
    errors = []
    for i, e in enumerate(entries):
        url = e["url"]
        cat = categorize(url, e["pages"])
        fname = os.path.basename(urlparse(url).path)
        if not fname:
            fname = hashlib.md5(url.encode()).hexdigest() + ".bin"
        dest_dir = os.path.join(MEDIA_DIR, cat)
        os.makedirs(dest_dir, exist_ok=True)
        dest_path = os.path.join(dest_dir, fname)
        # avoid collisions between different files with the same basename
        base, ext = os.path.splitext(dest_path)
        n = 1
        while os.path.exists(dest_path) and dest_path not in hash_to_path.values():
            existing_hash = None
            try:
                with open(dest_path, "rb") as f:
                    existing_hash = hashlib.sha256(f.read()).hexdigest()
            except Exception:
                pass
            break
        print(f"[{i+1}/{len(entries)}] {cat:14s} {url}", file=sys.stderr)
        try:
            status, body, headers = fetch(url)
        except Exception as ex:
            errors.append({"url": url, "error": str(ex)})
            continue
        h = hashlib.sha256(body).hexdigest()
        rel_path = os.path.relpath(dest_path, ROOT)
        dup_of = None
        if h in hash_to_path:
            dup_of = hash_to_path[h]
        else:
            # resolve name collision (different content, same basename)
            final_path = dest_path
            counter = 2
            while os.path.exists(final_path):
                final_path = f"{base}-{counter}{ext}"
                counter += 1
            with open(final_path, "wb") as f:
                f.write(body)
            hash_to_path[h] = os.path.relpath(final_path, ROOT)
            rel_path = hash_to_path[h]
        inventory.append({
            "url": url, "category": cat, "local_path": rel_path if not dup_of else dup_of,
            "bytes": len(body), "sha256": h, "duplicate_of": dup_of,
            "pages": e["pages"], "alt": e["alt"],
        })
        time.sleep(0.15)
    json.dump(inventory, open(os.path.join(ROOT, "data", "media-inventory.json"), "w"), indent=2)
    json.dump(errors, open(os.path.join(ROOT, "data", "media-errors.json"), "w"), indent=2)
    print(f"Done. {len(inventory)} processed, {len(errors)} errors, {len(hash_to_path)} unique files saved.", file=sys.stderr)

if __name__ == "__main__":
    main()
