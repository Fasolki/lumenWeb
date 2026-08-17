#!/bin/sh
# Turns phone clips into small, silent, web-ready loops for the gallery.
#
#   sh scripts/optimize-videos.sh <name>=<source> [<name>=<source> ...]
#
# e.g. sh scripts/optimize-videos.sh booth=~/Downloads/IMG_8059.mov
#
# For each input it writes public/videos/<name>.mp4 and a matching
# public/videos/<name>.webp poster frame.
#
# Why these settings:
#   -an          the gallery loops are silent by design
#   scale 1280   they render as grid tiles, never full screen
#   H.264        universally hardware-decoded; HEVC .mov will not play in
#                Chrome or Firefox at all
#   yuv420p      Safari refuses to decode anything else
#   faststart    moves the index to the front so playback can begin while
#                the file is still downloading
set -e

OUT="public/videos"
mkdir -p "$OUT"

for pair in "$@"; do
  name="${pair%%=*}"
  src="${pair#*=}"

  echo "→ $name"

  ffmpeg -y -loglevel error -i "$src" \
    -an \
    -vf "scale='min(1080,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p \
    -crf 30 -preset slow \
    -movflags +faststart \
    "$OUT/$name.mp4"

  # Poster frame, shown until the video can play — and shown instead of it
  # when the visitor has asked for reduced motion. Taken a second in, since
  # the very first frame of a phone clip is often mid-exposure-adjustment.
  ffmpeg -y -loglevel error -ss 1 -i "$src" -vframes 1 -q:v 3 "$OUT/$name.tmp.jpg"
  node -e "
    const sharp = require('sharp')
    sharp('$OUT/$name.tmp.jpg')
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile('$OUT/$name.webp')
      .then(() => console.log('  poster ok'))
  "
  rm -f "$OUT/$name.tmp.jpg"

  ls -lh "$OUT/$name.mp4" | awk '{print "  mp4:", $5}'
done
