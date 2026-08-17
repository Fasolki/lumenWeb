#!/bin/sh
# Loads each page in headless Chrome and reports Content Security Policy
# violations. A CSP that blocks something the site needs fails silently in
# production, so this is worth running whenever the policy changes.
#
#   npm run build && npm run start
#   sh scripts/check-csp.sh [base-url]
BASE="${1:-http://localhost:3000}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

found=0
for p in /en /es /en/gallery /en/book /en/epk /en/watch /en/lab /en/lab/tequila; do
  # Match only genuine CSP messages. A broader "refused to..." filter also
  # catches the MIME error from /_vercel/insights/script.js, which 404s
  # anywhere other than Vercel because the edge injects it — not a CSP issue.
  out=$("$CHROME" --headless=new --disable-gpu --enable-logging=stderr --v=0 \
    --virtual-time-budget=8000 --dump-dom "$BASE$p" 2>&1 >/dev/null \
    | grep -i "Content Security Policy" \
    | head -5)

  if [ -n "$out" ]; then
    echo "VIOLATION on $p:"
    echo "$out"
    found=1
  else
    echo "clean $p"
  fi
done

[ "$found" = "0" ] && echo "\nNo CSP violations." || echo "\nCSP VIOLATIONS FOUND."
exit "$found"
