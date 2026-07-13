/**
 * Renders the app to static HTML at build time, once per language.
 *
 * Why: the site is a client-rendered SPA, so the HTML actually served was an
 * empty <div id="root"> — literally zero words for a crawler to index. And
 * because the language was client-side state on a single URL, the Spanish
 * version could never be indexed at all.
 *
 * This writes:
 *   dist/index.html     English, canonical https://lifeonfullvolume.com/
 *   dist/es/index.html  Spanish, canonical https://lifeonfullvolume.com/es/
 *   dist/sitemap.xml    both URLs, cross-linked with hreflang
 *
 * Run after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr/entry-server.js');

export const SITE_URL = 'https://lifeonfullvolume.com';
const OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

const { render, seoFor, LANGUAGES } = await import(SSR_ENTRY);

const urlFor = (lang) => (lang === 'es' ? `${SITE_URL}/es/` : `${SITE_URL}/`);

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Framer Motion's scroll-reveal animations render `opacity:0` inline, which
 * would hand a crawler a page of invisible text. The animation still plays on
 * hydration; this only affects the pre-JS markup.
 */
const unhideRevealedContent = (html) =>
  html.replace(/opacity:0(?=[;"])/g, 'opacity:1');

const jsonLd = (lang) => ({
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  '@id': `${SITE_URL}/#lumen`,
  name: 'LÜMEN',
  alternateName: 'DJ LÜMEN',
  url: urlFor(lang),
  image: OG_IMAGE,
  description: seoFor(lang).description,
  genre: ['Afro House', 'Afro-Tech', 'Deep House', 'Organic House', 'Jungle House'],
  email: 'lifeonfullvolume@gmail.com',
  sameAs: [
    'https://www.youtube.com/@LifeOnFullVolume',
    'https://www.instagram.com/lifeonfullvolume_',
  ],
});

const headFor = (lang) => {
  const seo = seoFor(lang);
  const alternates = LANGUAGES.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${urlFor(l)}" />`
  ).join('\n    ');

  return `<title>${escape(seo.title)}</title>
    <meta name="description" content="${escape(seo.description)}" />
    <meta name="author" content="DJ LÜMEN" />
    <link rel="canonical" href="${urlFor(lang)}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${urlFor('en')}" />

    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="DJ LÜMEN" />
    <meta property="og:locale" content="${seo.ogLocale}" />
    <meta property="og:url" content="${urlFor(lang)}" />
    <meta property="og:title" content="${escape(seo.title)}" />
    <meta property="og:description" content="${escape(seo.description)}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="DJ LÜMEN performing live" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(seo.title)}" />
    <meta name="twitter:description" content="${escape(seo.description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />

    <script type="application/ld+json">${JSON.stringify(jsonLd(lang))}</script>`;
};

// Plausible: cookieless, so it needs no consent banner under GDPR. Omitted
// entirely when VITE_PLAUSIBLE_DOMAIN isn't set.
const analyticsTag = () => {
  const domain = process.env.VITE_PLAUSIBLE_DOMAIN;
  if (!domain) return '';
  return `<script defer data-domain="${escape(domain)}" src="https://plausible.io/js/script.tagged-events.js"></script>`;
};

const template = await readFile(path.join(DIST, 'index.html'), 'utf8');

for (const lang of LANGUAGES) {
  const html = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<!--seo-->', headFor(lang))
    .replace('<!--analytics-->', analyticsTag())
    .replace('<!--app-html-->', unhideRevealedContent(render(lang)));

  const outDir = lang === 'en' ? DIST : path.join(DIST, lang);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);

  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`  prerendered ${urlFor(lang)} (${words} words of indexable content)`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGUAGES.map(
  (lang) => `  <url>
    <loc>${urlFor(lang)}</loc>
${LANGUAGES.map(
  (alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${urlFor(alt)}" />`
).join('\n')}
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`
).join('\n')}
</urlset>
`;
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap);
console.log('  wrote sitemap.xml');

await rm(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
