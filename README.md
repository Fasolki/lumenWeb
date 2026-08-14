# lifeonfullvolume.com

The LÜMEN site. One Next.js codebase serving two domains:

| Domain | What it serves |
| --- | --- |
| `lifeonfullvolume.com` | The DJ booking site |
| `lab.lifeonfullvolume.com` | Side projects (the "Lab") |

The split is deliberate. Bookers and promoters never land on the party games,
and the games never dilute the booking pitch — but there is only one project to
maintain, one design system and one deploy.

Built with Next.js 16 (App Router), React 19, Tailwind v4 and TypeScript.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run images` | Convert new photos to WebP (see below) |

To see the Lab on its own host locally, send the header:

```bash
curl -H "Host: lab.lifeonfullvolume.com" http://localhost:3000/
```

---

## Editing content

**No user-facing text lives in components.** Everything is in `content/`:

| File | Holds |
| --- | --- |
| `content/copy.ts` | All English and Spanish wording |
| `content/site.ts` | Email, WhatsApp, socials, video IDs, venue list |
| `content/gallery.ts` | Photo list, with alt text in both languages |
| `content/gigs.ts` | Upcoming and past dates |
| `content/projects.ts` | Lab projects |

### Adding a gig

Add an entry to the `gigs` array in `content/gigs.ts`:

```ts
{ date: '2026-09-12', venue: 'Icon', city: 'Madrid', country: 'Spain' },
```

Order does not matter — the site sorts by date, hides anything in the past from
"upcoming", and moves it to a "Previously" list. Add `private: true` for a
private booking (shows as *Private event*, no ticket link), or `url: '...'` for
a ticket link. When the array is empty the page shows a "get in touch" panel
instead of an empty list.

### Adding photos

1. Drop the files into `public/images/gallery/`
2. Run `npm run images` — converts to WebP, caps the width, strips metadata,
   and moves the originals to `.image-originals/` (kept on disk, never
   committed or deployed)
3. Add an entry to `content/gallery.ts` with the new `.webp` filename, its real
   pixel dimensions and alt text in both languages

Dimensions are required so the grid can reserve space and avoid layout shift.

### Adding a Lab project

For a self-contained HTML file (like the Tequila game):

1. Put the file in `public/lab/`, e.g. `public/lab/mything.html`
2. Add an entry to `content/projects.ts` with `kind: 'embed'` and
   `file: 'mything.html'`

It appears on the Lab index and gets its own page with the project embedded.

---

## How the two domains work

`proxy.ts` (Next 16's renamed middleware) does two things:

1. **Locale prefixes.** Every main-site URL carries `/en` or `/es`. A visitor
   hitting `/` is redirected to their best match from their cookie, then their
   `Accept-Language` header. Both languages are separately indexable and
   cross-linked with `hreflang`.
2. **Lab host rewriting.** On `lab.lifeonfullvolume.com`, `/` renders the Lab
   index and `/tequila` renders that project — the `/en/lab` prefix is hidden.
   Pages detect which host served them via a request header and generate short
   or long links accordingly, so the same components work on both domains.

---

## Deploying

Vercel, from this repo.

1. Push to GitHub and import the repo in Vercel (it auto-detects Next.js)
2. In **Settings → Domains**, add **both**:
   - `lifeonfullvolume.com`
   - `lab.lifeonfullvolume.com`
3. Point DNS at Vercel:
   - `lifeonfullvolume.com` → the A record Vercel gives you
   - `lab` → `CNAME` to `cname.vercel-dns.com`

Both domains hit the same deployment; `proxy.ts` decides what each one renders.
No second project, no second deploy.

---

## Things deliberately left empty

These are placeholders waiting on real material, not oversights:

- **Testimonials** — `copy.ts` has a `testimonials.items` array that is empty,
  and the section hides itself while it stays that way. Add real quotes from
  real clients only.
- **Gigs** — empty until there are dates to announce.
- **Technical rider PDF** — the EPK lists the requirements as text. If a PDF is
  wanted, drop it at `public/downloads/lumen-tech-rider.pdf` and link it.

---

## Checks

```bash
npm run build && npm run start
sh scripts/smoke.sh          # every route, both hosts
sh scripts/shots.sh ./shots  # screenshots, needs Chrome
```

Headless Chrome clamps the viewport to a 500px minimum while still cropping the
screenshot to the requested width, so never screenshot below 500px — the
right-hand side gets silently cut off and looks like a missing element.
