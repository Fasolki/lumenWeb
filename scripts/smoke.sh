#!/bin/sh
# Route smoke test against a running server (npm run start).
#   sh scripts/smoke.sh [base-url]
# Prints every route; exits non-zero if any expected code/redirect is wrong.
BASE="${1:-http://localhost:3000}"
FAIL=0

# check <label> <host> <path> <expected-code> [expected-redirect]
check() {
  out=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' -H "Host: $2" "$BASE$3")
  code=${out%% *}
  loc=${out#* }
  mark=ok
  [ "$code" = "$4" ] || mark=FAIL
  [ -z "$5" ] || [ "$loc" = "$5" ] || mark=FAIL
  [ "$mark" = ok ] || FAIL=1
  printf '%-4s %-26s %-28s %s %s\n' "$mark" "$3" "$1" "$code" "$loc"
}

NEW=https://lab.vitaligiggy.com

echo "     PATH                       HOST                         CODE REDIRECT"
check "main" localhost / 307
check "main" localhost /en 200
check "main" localhost /es 200
check "main" localhost /en/book 200
check "main" localhost /en/watch 200
check "main" localhost /en/gallery 200
check "main" localhost /en/shows 200
check "main" localhost /en/epk 200
check "main" localhost /es/book 200
check "main" localhost /opengraph-image 200
check "main" localhost /sitemap.xml 200
check "main" localhost /robots.txt 200
check "main" localhost /definitely-not-a-page 307
check "main" localhost /en/definitely-not-a-page 404
echo "--- Lab removed from the main host ---"
check "main" localhost /en/lab 404
check "main" localhost /en/lab/tequila 404
check "main" localhost /lab/tequila.html 404
check "main" localhost /lab/echo/index.html 404
echo "--- old lab host: 308 to lab.vitaligiggy.com ---"
L=lab.lifeonfullvolume.com
check "lab" $L / 308 "$NEW/"
check "lab" $L /tequila 308 "$NEW/fun/tequila"
# Trailing slash: Next first 308s to the slashless path (same host), which
# then 308s to the new Lab, i.e. two hops ending at the right place.
check "lab" $L /tequila/ 308 "$BASE/tequila"
check "lab" $L /echo 308 "$NEW/echo/"
check "lab" $L /echo/ 308 "$BASE/echo"
check "lab" $L /echo/index.html 308 "$NEW/echo/"
check "lab" $L /en 308 "$NEW/"
check "lab" $L /es/lab/tequila 308 "$NEW/"
check "lab" $L /lab/tequila.html 308 "$NEW/"
check "lab" $L /lab/echo/index.html 308 "$NEW/"
check "lab" $L /lab/echo/img/gym-full.webp 308 "$NEW/"
check "lab" $L /sitemap.xml 308 "$NEW/"
check "lab" $L /anything-else 308 "$NEW/"

[ "$FAIL" = 0 ] && echo "smoke: all passed" || echo "smoke: FAILURES"
exit $FAIL
