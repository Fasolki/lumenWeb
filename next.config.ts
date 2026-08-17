import type { NextConfig } from 'next'

/** The only third-party origin the site actually loads anything from. */
const YOUTUBE = 'https://www.youtube-nocookie.com'

/**
 * Content Security Policy.
 *
 * Built from the origins the site genuinely uses — no Google Fonts (next/font
 * self-hosts at build time) and no external script hosts, so everything can be
 * locked to 'self' apart from YouTube frames and their poster images.
 *
 * On 'unsafe-inline' for scripts: the honest alternative is a per-request
 * nonce, and that forces every page to render dynamically, which would throw
 * away the static generation the whole site is built on. The policy still
 * blocks what matters most — no injected <script src> from another origin can
 * execute, object-src is off, and base-uri cannot be hijacked to re-point
 * relative URLs.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "script-src 'self' 'unsafe-inline'",
  // Inline style attributes drive the scroll-reveal delays and project accents.
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://i.ytimg.com`,
  "media-src 'self'",
  "font-src 'self' data:",
  // Vercel Web Analytics beacons.
  "connect-src 'self' https://vitals.vercel-insights.com",
  // 'self' covers the lab embedding its own game page.
  `frame-src 'self' ${YOUTUBE} https://www.youtube.com`,
  'upgrade-insecure-requests',
].join('; ')

/**
 * Everything the site has no business asking for is switched off. Autoplay and
 * fullscreen stay on for us and for YouTube, since the gallery loops need the
 * former and the video embeds need the latter.
 */
const permissionsPolicy = [
  'accelerometer=()',
  'camera=()',
  'geolocation=()',
  'gyroscope=()',
  'magnetometer=()',
  'microphone=()',
  'payment=()',
  'usb=()',
  'interest-cohort=()',
  `autoplay=(self "${YOUTUBE}")`,
  `fullscreen=(self "${YOUTUBE}")`,
].join(', ')

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
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Permissions-Policy', value: permissionsPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Redundant beside frame-ancestors, kept for older browsers.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
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
