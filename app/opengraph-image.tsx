import { ImageResponse } from 'next/og'

import { site } from '@/content/site'

/**
 * The link preview for WhatsApp, Instagram, iMessage and Twitter.
 *
 * The old site pointed its og:image at a file that was never uploaded, so
 * every shared link rendered blank. Generating it here means it can never
 * drift out of sync with the brand again.
 */
export const alt = 'LÜMEN — Organic Afro-Tech, Jungle Rhythms, Deep House'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0908',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Gold bloom, echoing the site's light motif. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(70% 90% at 20% 110%, rgba(255,194,75,0.34) 0%, rgba(255,94,58,0.12) 45%, rgba(10,9,8,0) 75%)',
          }}
        />

        <div style={{ display: 'flex', position: 'relative' }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: '#ffc24b',
              fontWeight: 700,
            }}
          >
            {site.brand}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div
            style={{
              fontSize: 210,
              fontWeight: 800,
              letterSpacing: -10,
              lineHeight: 1,
              color: '#f4efe7',
            }}
          >
            LÜMEN
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 34,
              color: '#a9a29b',
              letterSpacing: -0.5,
            }}
          >
            Organic Afro-Tech · Jungle Rhythms · Deep House
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            position: 'relative',
            fontSize: 24,
            color: '#6f6862',
          }}
        >
          <div style={{ display: 'flex' }}>Clubs · Festivals · Private events</div>
          <div style={{ display: 'flex', color: '#f4efe7' }}>{site.domain}</div>
        </div>
      </div>
    ),
    size,
  )
}
