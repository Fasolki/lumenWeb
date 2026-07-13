# DJ LÜMEN Website

A modern, responsive one-page bilingual website for DJ LÜMEN built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **🌍 Bilingual**: English at `/`, Spanish at `/es/` — separate URLs, cross-linked with `hreflang`, so both are indexable
- **🔎 Prerendered**: every page is rendered to static HTML at build time, so crawlers and link-preview scrapers see the full content without running JavaScript
- **🎨 Theme Controller**: Dynamic section-based theming with smooth transitions
  - "Club" palette (deep blues/purples/black) for most sections
  - "Sunset" palette (warm oranges/browns/golds) for Sunset Sessions and Watch sections
- **📱 Responsive Design**: Mobile-first approach with touch-friendly interactions
- **⚡ Performance Optimized**: Lazy loading, responsive images, and smooth animations
- **♿ Accessibility**: Semantic HTML, keyboard navigation, and screen reader support
- **✨ Modern UI**: Glass morphism effects, gradient text, and smooth transitions

## Sections

- **Hero**: Logo, tagline, and action buttons with image carousel (English only)
- **About**: Bio and artist information (bilingual)
- **Watch**: Lazy-loaded YouTube video embeds (bilingual)
- **Sunset Sessions**: Special themed section with warm colors (bilingual)
- **Experience**: Highlights and achievements (bilingual)
- **Gigs**: Upcoming events (hidden when empty, bilingual)
- **Gallery**: Responsive image grid with "Coming Soon" overlay (bilingual)
- **Contact**: Email/WhatsApp buttons and social links (bilingual)
- **Tech**: Technical requirements and rider download (bilingual)

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure the booking form (optional but recommended):**
```bash
cp .env.example .env.local
```
Then follow the instructions in that file to paste in a Formspree endpoint.
Without it the booking form still works — it falls back to opening the
visitor's mail client with the fields filled in — but submissions won't land
in your inbox automatically.

3. **Start development server:**
```bash
npm run dev
```
The site will be available at `http://localhost:3000`

4. **Build for production:**
```bash
npm run build
```

5. **Preview production build:**
```bash
npm run preview
```

## Project Structure

```
lumenWeb/
├── assets/
│   └── originals/         # Full-size source photos (never served directly)
│       ├── hero/
│       └── gallery/
├── public/
│   ├── images/            # GENERATED web-sized WebP — do not edit, do not commit
│   ├── downloads/         # Technical rider PDF
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── optimize-images.mjs  # Resizes assets/originals/ into public/images/
├── src/
│   ├── components/        # React components
│   ├── contexts/          # React contexts (LanguageContext)
│   ├── data/images.ts     # GENERATED image manifest (widths + sizes)
│   ├── translations.ts    # All site content and translations
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
└── dist/                  # Production build (generated)
```

## Images

Photos straight off a camera or phone are far too heavy to serve — the site
was once shipping 86 MB. Drop the **full-size originals** into
`assets/originals/hero/` or `assets/originals/gallery/` and the build resizes
them into web-sized WebP automatically:

```bash
npm run images   # also runs automatically before `npm run dev` and `npm run build`
```

This writes `public/images/` (git-ignored, regenerated on every build) and
`src/data/images.ts`, which tells the app what widths exist so it can serve a
`srcset`. Nothing else needs updating — new files in `assets/originals/gallery/`
appear in the gallery on the next build.

The `og:image` (the preview card shown when the site is shared on WhatsApp,
Instagram or Facebook) is also generated, from the photo named in `OG_SOURCE`
in the script.

## SEO

The site is a client-rendered React app, which for SEO means the HTML served to
a crawler was an *empty* `<div id="root">` — zero indexable words. And because
the language used to be client-side state on a single URL, Google could only
ever see the English version.

Both are fixed at build time by `scripts/prerender.mjs`, which renders the app
to static HTML once per language:

| URL | Language | Canonical |
|-----|----------|-----------|
| `/` | English | `https://lifeonfullvolume.com/` |
| `/es/` | Spanish | `https://lifeonfullvolume.com/es/` |

The two are cross-linked with `hreflang` (plus `x-default` → English), each gets
its own `<title>`, meta description and Open Graph tags from `seo` in
`src/translations.ts`, and `dist/sitemap.xml` is generated listing both.

A first-time visitor with a Spanish browser is redirected from `/` to `/es/` in
the client. Crawlers don't run that, so both URLs stay independently indexable.

**The domain is set in one place**: `SITE_URL` in `scripts/prerender.mjs`.

### After deploying — do these once

1. **[Google Search Console](https://search.google.com/search-console)** → add
   `lifeonfullvolume.com`, verify via DNS, and submit `/sitemap.xml`. Google will
   not find a brand-new site quickly on its own. Do the same at
   [Bing Webmaster Tools](https://www.bing.com/webmasters), which also feeds
   DuckDuckGo.
2. **Link back from your profiles.** Put `lifeonfullvolume.com` in your YouTube
   channel's links, your Instagram bio, and any SoundCloud/Mixcloud/Resident
   Advisor profile. Inbound links are most of what determines whether you rank —
   they matter more than anything in this repo.
3. **Check `/es/` actually loads** on the deployed site. If your Vercel project
   has an SPA catch-all rewrite configured, it will swallow `/es/` and serve the
   English page; the default Vite static setup serves it correctly.

## Analytics

Uses [Plausible](https://plausible.io) — cookieless, so under GDPR/ePrivacy it
needs **no cookie-consent banner**, which also means it counts every visitor
rather than only those who accept a banner.

Set `VITE_PLAUSIBLE_DOMAIN` (see `.env.example`). If it's unset, no analytics
script is loaded at all.

Beyond pageviews, the site sends a **`Booking request`** custom event when the
booking form is submitted, tagged with `method` (form or email), `language` and
`eventType`. Mark it as a goal in Plausible: enquiries are the only metric that
actually matters here, and it tells you which traffic converts.

## Content Management

### Adding/Updating Content

All content is managed in `src/translations.ts`:
- **English content**: `translations.en`
- **Spanish content**: `translations.es`
- **Navigation labels**: `translations.{lang}.nav.labels`
- **Video IDs**: `translations.{lang}.videos`
- **Contact info**: `translations.{lang}.contact`

### Adding Gallery Images

Drop the original into `assets/originals/gallery/`. That's it — the next
`npm run dev` or `npm run build` resizes it and adds it to the gallery pool.

### Adding Hero Carousel Images

Drop the original into `assets/originals/hero/`, then add its filename (without
the extension) to `HERO_ORDER` in `scripts/optimize-images.mjs` to place it in
the carousel, and add an alt-text entry to `content.hero.imageAlts` in
`src/translations.ts` for **both** languages.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite settings
4. Add `VITE_FORMSPREE_ENDPOINT` under Settings → Environment Variables, so
   the booking form posts to your inbox
5. Deploy automatically on every push

### Manual Build

```bash
npm run build
# Upload the `dist/` folder to your hosting service
```

## Technical Details

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Animations**: Framer Motion with reduced motion support
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Theme System**: CSS custom properties with IntersectionObserver
- **Language System**: React Context API with localStorage persistence

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Debugging

VS Code debug configuration is set up in `.vscode/launch.json`:
- Start dev server: `npm run dev`
- Press F5 to launch Chrome with debugging enabled

### Key Files

- `src/translations.ts` - All site content and translations
- `src/components/` - All React components
- `src/contexts/LanguageContext.tsx` - Language switching logic
- `tailwind.config.ts` - Tailwind CSS configuration
- `vite.config.ts` - Vite build configuration

## TODO: Content Updates

### Images
- [x] Hero carousel images added
- [x] Gallery images added (Halloween 2025)
- [ ] Add Open Graph image (`/public/images/og-image.jpg`) - 1200x630px recommended
- [ ] Optimize images (WebP/AVIF formats)

### Videos
- [x] YouTube video IDs configured in `translations.ts`
- [ ] Update with latest video IDs as needed

### Contact Information
- [x] Email: `lifeonfullvolume@gmail.com`
- [x] WhatsApp: `+16507144540`
- [x] YouTube: `@LifeOnFullVolume`

### Technical Rider
- [ ] Upload technical rider PDF to `/public/downloads/lumen-tech-rider.pdf`
- [ ] Update `tech.riderUrl` in `translations.ts` if needed

### Social Media
- [x] YouTube active
- [ ] Instagram (coming soon - disabled in UI)
- [ ] TikTok (coming soon - disabled in UI)

### Gallery
- [x] Images added
- [ ] Remove "Coming Soon" overlay when ready to show gallery
- [ ] Add more images as available

## License

© 2024 DJ LÜMEN. All rights reserved.
