import type { MetadataRoute } from 'next'

import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The info page is a link you hand out, not a page meant to rank
      // against the home page for the same terms.
      disallow: ['/en/info', '/es/info'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
