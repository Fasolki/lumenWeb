#!/bin/sh
# Captures screenshots of the running site with headless Chrome.
#   npm run build && npm run start
#   sh scripts/shots.sh <output-dir>
#
# NOTE: headless Chrome clamps the CSS viewport to a 500px minimum but still
# crops the screenshot to the width you asked for. Requesting 390 renders a
# 500px layout and silently cuts off the right-hand 110px — which looks exactly
# like a missing element. Never use a width below 500 here.
OUT="${1:?output dir required}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p "$OUT"

shot() {
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --virtual-time-budget=9000 \
    --window-size="$3" \
    --screenshot="$OUT/$1.png" \
    "$2" >/dev/null 2>&1
  echo "$1.png"
}

shot home-desktop      http://localhost:3000/en             1440,3000
shot home-mobile       http://localhost:3000/en             500,1600
shot book-desktop      http://localhost:3000/en/book        1440,2400
shot watch-desktop     http://localhost:3000/en/watch       1440,1800
shot gallery-desktop   http://localhost:3000/en/gallery     1440,2000
shot epk-desktop       http://localhost:3000/en/epk         1440,2600
shot shows-desktop     http://localhost:3000/en/shows       1440,1200
shot lab-desktop       http://localhost:3000/en/lab         1440,1200
shot tequila-desktop   http://localhost:3000/en/lab/tequila 1440,1800
shot home-es-desktop   http://localhost:3000/es             1440,1400
