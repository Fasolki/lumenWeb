import type { MetadataRoute } from 'next'

import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The press kit is a link you send, not a page to rank.
      disallow: ['/en/epk', '/es/epk'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
