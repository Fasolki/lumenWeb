import { site } from '@/content/site'

/**
 * A slow scrolling band of rooms played. Purely decorative motion, so the
 * track is duplicated and the whole thing is hidden from assistive tech —
 * the same list is announced once in the visually hidden copy below.
 */
export function VenueMarquee({ label }: { label: string }) {
  const items = [...site.venues, ...site.venues]

  return (
    <div className="relative overflow-hidden border-y border-line py-6">
      <h2 className="sr-only">{label}</h2>
      <ul className="sr-only">
        {site.venues.map((venue) => (
          <li key={venue}>{venue}</li>
        ))}
      </ul>

      <div aria-hidden className="edge-fade-x">
        <div
          className="marquee-track flex w-max items-center gap-12"
          style={{ ['--marquee-duration' as string]: '44s' }}
        >
          {items.map((venue, i) => (
            <span
              key={`${venue}-${i}`}
              className="flex items-center gap-12 whitespace-nowrap font-display text-lg font-semibold uppercase tracking-[0.18em] text-haze"
            >
              {venue}
              <span className="h-1.5 w-1.5 rounded-full bg-lumen" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
