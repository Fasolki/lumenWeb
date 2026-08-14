#!/bin/sh
# Route smoke test against a running server (npm run start).
#   sh scripts/smoke.sh [base-url]
BASE="${1:-http://localhost:3000}"

check() {
  code=$(curl -s -o /dev/null -w '%{http_code}' -H "Host: $2" "$BASE$3")
  loc=$(curl -s -o /dev/null -w '%{redirect_url}' -H "Host: $2" "$BASE$3")
  printf '%-34s %-28s %s %s\n' "$3" "$1" "$code" "$loc"
}

echo "PATH                               HOST                         CODE REDIRECT"
check "main" localhost /
check "main" localhost /en
check "main" localhost /es
check "main" localhost /en/book
check "main" localhost /en/watch
check "main" localhost /en/gallery
check "main" localhost /en/shows
check "main" localhost /en/epk
check "main" localhost /es/book
check "main" localhost /en/lab
check "main" localhost /en/lab/tequila
check "main" localhost /lab/tequila.html
check "main" localhost /opengraph-image
check "main" localhost /sitemap.xml
check "main" localhost /robots.txt
check "main" localhost /definitely-not-a-page
echo "--- lab host ---"
check "lab" lab.lifeonfullvolume.com /
check "lab" lab.lifeonfullvolume.com /tequila
check "lab" lab.lifeonfullvolume.com /lab/tequila.html
