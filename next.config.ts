import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // YouTube poster frames for the facade embeds.
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      // This page used to live at /epk. Anything already handed out keeps
      // working. Both the bare and locale-prefixed forms are covered, since
      // the proxy adds the locale on its own pass.
      { source: '/epk', destination: '/info', permanent: true },
      { source: '/:lang(en|es)/epk', destination: '/:lang/info', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      {
        // Lab projects are immutable single files; let them cache hard.
        source: '/lab/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
    ]
  },
}

export default nextConfig
