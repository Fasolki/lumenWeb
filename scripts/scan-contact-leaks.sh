#!/bin/sh
# Fails if any contact detail is reachable without running JavaScript.
#
#   npm run build && npm run start
#   sh scripts/scan-contact-leaks.sh [base-url]
#
# This is the check that matters for the anti-harvesting work: a scraper sees
# exactly what curl sees. If any pattern below turns up, the protection has a
# hole in it.
BASE="${1:-http://localhost:3000}"
TMP=$(mktemp)

for p in /en /es /en/book /en/epk /en/gallery /en/watch /en/shows /en/lab /en/lab/tequila; do
  curl -s --max-time 30 "$BASE$p" >> "$TMP"
done

# Also the machine-readable surfaces, which are easy to forget.
curl -s --max-time 30 "$BASE/sitemap.xml" >> "$TMP"
curl -s --max-time 30 "$BASE/robots.txt" >> "$TMP"

fail=0
for pat in '34665232662' '665 232 662' '16507144540' '650 714 4540' 'wa.me' 'lifeonfullvolume@gmail' 'mailto:'; do
  n=$(grep -o "$pat" "$TMP" | wc -l | tr -d ' ')
  if [ "$n" != "0" ]; then
    printf 'LEAK  %-24s %s occurrence(s)\n' "$pat" "$n"
    fail=1
  else
    printf 'clean %-24s\n' "$pat"
  fi
done

rm -f "$TMP"
[ "$fail" = "0" ] && echo "\nNo contact details in served markup." || echo "\nLEAKS FOUND."
exit "$fail"
