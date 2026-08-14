import type { MetadataRoute } from 'next'

import { site } from '@/content/site'
import { LOCALES } from '@/lib/i18n'

// The press kit is deliberately noindex, so it is not listed here.
const ROUTES = [
  { path: '', priority: 1 },
  { path: '/book', priority: 0.9 },
  { path: '/watch', priority: 0.8 },
  { path: '/gallery', priority: 0.7 },
  { path: '/shows', priority: 0.7 },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((lang) =>
    ROUTES.map(({ path, priority }) => ({
      url: `${site.url}/${lang}${path}`,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${site.url}/${l}${path}`]),
        ),
      },
    })),
  )
}
