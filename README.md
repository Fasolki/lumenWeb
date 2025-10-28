# DJ LÜMEN Website

A modern, responsive one-page website for DJ LÜMEN built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Theme Controller**: Dynamic section-based theming with smooth transitions
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Performance Optimized**: Lazy loading, responsive images, and smooth animations
- **Accessibility**: Semantic HTML, keyboard navigation, and screen reader support
- **Modern UI**: Glass morphism effects, gradient text, and smooth transitions

## Sections

- **Hero**: Logo, tagline, and action buttons with image carousel
- **About**: Bio and artist information
- **Watch**: Lazy-loaded YouTube video embeds
- **Sunset Sessions**: Special themed section with warm colors
- **Experience**: Highlights and achievements
- **Gigs**: Upcoming events (hidden when empty)
- **Gallery**: Responsive image grid with lightbox
- **Contact**: Email/WhatsApp buttons and social links
- **Tech**: Technical requirements and rider download

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## TODO: Content Updates

### Images
- [ ] Replace placeholder images in `/public/images/` with actual photos:
  - Hero carousel images (`/images/hero/`)
  - Gallery images (`/images/gallery/`)
  - Open Graph image (`/images/og-image.jpg`)

### Videos
- [ ] Update YouTube video IDs in `src/site.config.ts`:
  - Featured videos (`videos.featured`)
  - Sunset session videos (`videos.sunset`)

### Contact Information
- [ ] Verify contact details in `src/site.config.ts`:
  - Email: `lifeonfullvolume@gmail.com`
  - WhatsApp: `+16507144540`

### Technical Rider
- [ ] Upload actual technical rider PDF to `/public/downloads/`
- [ ] Update `tech.riderUrl` in `src/site.config.ts`

### Social Media
- [ ] Update social media URLs in `src/site.config.ts`:
  - YouTube channel URL
  - Instagram URL (when available)
  - TikTok URL (when available)

### Content
- [ ] Review and update all text content in `src/site.config.ts`
- [ ] Add actual upcoming gigs data (currently hidden)
- [ ] Update bio and experience highlights

### Performance
- [ ] Optimize images (WebP/AVIF formats)
- [ ] Add proper alt text for all images
- [ ] Test Lighthouse scores (target 90+)

## Technical Details

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Animations**: Framer Motion with reduced motion support
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Theme System**: CSS custom properties with IntersectionObserver

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2024 DJ LÜMEN. All rights reserved.
