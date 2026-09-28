#!/bin/bash
set -u
ROOT="/Users/dotcomjay/Documents/DEV/Client sites/Elite Bathrooms/wordpress-archive"
cd "$ROOT"
python3 -c "
import json
urls = json.load(open('data/urls.json'))
for u in urls:
    print(u['url'])
" > /tmp/eb_urls.txt

slugify() {
  python3 -c "
from urllib.parse import urlparse
import sys
p = urlparse(sys.argv[1]).path.strip('/')
print(p.replace('/', '__') or 'home')
" "$1"
}

i=0
total=$(wc -l < /tmp/eb_urls.txt | tr -d ' ')
while IFS= read -r url; do
  i=$((i+1))
  slug=$(slugify "$url")
  echo "[$i/$total] $url -> $slug"
  npx --yes playwright screenshot --viewport-size=1440,900 --full-page --timeout=30000 "$url" "screenshots/desktop/${slug}.png" >>/tmp/eb_shot.log 2>&1
  npx --yes playwright screenshot --viewport-size=390,844 --full-page --timeout=30000 "$url" "screenshots/mobile/${slug}.png" >>/tmp/eb_shot.log 2>&1
done < /tmp/eb_urls.txt
echo "ALL DONE"
