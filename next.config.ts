import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // YouTube poster frames for the facade embeds.
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
    formats: ['image/avif', 'image/webp'],
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
