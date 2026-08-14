/**
 * Converts every source photo in public/images/** to width-capped WebP.
 * Originals are moved to .image-originals/ (gitignored) so they stay on disk
 * but never ship in the repo or the deploy.
 *
 *   node scripts/optimize-images.mjs
 */
import { mkdir, readdir, rename, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const IMAGES = path.join(ROOT, 'public', 'images')
const ARCHIVE = path.join(ROOT, '.image-originals')

// Hero art is displayed full-bleed; gallery art tops out at roughly half-width.
const WIDTHS = { hero: 2400, gallery: 1800 }
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png'])

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

const files = (await walk(IMAGES)).filter((f) =>
  SOURCE_EXT.has(path.extname(f).toLowerCase()),
)

let before = 0
let after = 0

for (const file of files) {
  const rel = path.relative(IMAGES, file)
  const bucket = rel.split(path.sep)[0]
  const width = WIDTHS[bucket] ?? 1800
  const target = file.replace(/\.(jpe?g|png)$/i, '.webp')

  before += (await stat(file)).size

  await sharp(file)
    .rotate() // honour EXIF orientation before we strip metadata
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(target)

  after += (await stat(target)).size

  const archived = path.join(ARCHIVE, rel)
  await mkdir(path.dirname(archived), { recursive: true })
  await rename(file, archived)

  console.log(`${rel} -> ${path.basename(target)}`)
}

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(
  `\n${files.length} images: ${mb(before)}MB -> ${mb(after)}MB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`,
)
console.log(`Originals archived in .image-originals/`)
