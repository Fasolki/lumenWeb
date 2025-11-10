# DJ LÜMEN Website

A modern, responsive one-page bilingual website for DJ LÜMEN built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **🌍 Bilingual Support**: Full English/Spanish translation system with language toggle
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

2. **Start development server:**
```bash
npm run dev
```
The site will be available at `http://localhost:3000`

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## Project Structure

```
lumenWeb/
├── public/
│   ├── images/
│   │   ├── hero/          # Hero carousel images
│   │   └── gallery/       # Gallery images
│   └── downloads/         # Technical rider PDF
├── src/
│   ├── components/        # React components
│   ├── contexts/          # React contexts (LanguageContext)
│   ├── translations.ts    # All site content and translations
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
└── dist/                  # Production build (generated)
```

## Content Management

### Adding/Updating Content

All content is managed in `src/translations.ts`:
- **English content**: `translations.en`
- **Spanish content**: `translations.es`
- **Navigation labels**: `translations.{lang}.nav.labels`
- **Video IDs**: `translations.{lang}.videos`
- **Contact info**: `translations.{lang}.contact`

### Adding Gallery Images

1. Add image files to `/public/images/gallery/`
2. Update the `galleryImages` array in `src/components/Gallery.tsx`:
```typescript
const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/your-image.jpg', alt: 'Description', caption: 'Caption' },
];
```

### Adding Hero Carousel Images

1. Add image files to `/public/images/hero/`
2. Update the `carouselImages` array in `src/components/Hero.tsx`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite settings
4. Deploy automatically on every push

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
