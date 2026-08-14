import { Check } from 'lucide-react'

import { CTA, cn } from '@/components/ui'
import type { Copy } from '@/content/copy'
import { mailtoLink, whatsappLink } from '@/content/site'

/**
 * The two booking paths, side by side.
 *
 * The club card stays in the dark club palette; the private/corporate card
 * flips to the light paper surface. That contrast is doing real work — a
 * corporate or wedding client reads the light card as "this person is
 * organised and safe to hire", which a wall of nightclub black does not.
 */
export function BookingTracks({ t }: { t: Copy }) {
  const tracks = [
    {
      key: 'club' as const,
      data: t.services.club,
      tone: 'dark' as const,
    },
    {
      key: 'private' as const,
      data: t.services.private,
      tone: 'light' as const,
    },
  ]

  return (
    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
      {tracks.map(({ key, data, tone }, i) => {
        const light = tone === 'light'

        return (
          <article
            key={key}
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 110}ms` }}
            className={cn(
              'relative flex flex-col overflow-hidden rounded-[var(--radius-card)] p-8 sm:p-10',
              light
                ? 'bg-paper text-ink'
                : 'card-surface text-bone',
            )}
          >
            {!light ? (
              <div
                aria-hidden
                className="bloom pointer-events-none absolute inset-x-0 top-0 h-40"
              />
            ) : null}

            <div className="relative flex flex-1 flex-col">
              <p
                className={cn(
                  'text-[0.7rem] font-semibold uppercase tracking-[0.28em]',
                  light ? 'text-ember' : 'text-lumen',
                )}
              >
                {data.for}
              </p>

              <h3 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)]">{data.title}</h3>

              <p
                className={cn(
                  'mt-5 leading-relaxed',
                  light ? 'text-ink/70' : 'text-haze',
                )}
              >
                {data.body}
              </p>

              <ul className="mt-8 space-y-3.5">
                {data.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check
                      size={16}
                      aria-hidden
                      className={cn(
                        'mt-0.5 shrink-0',
                        light ? 'text-ember' : 'text-lumen',
                      )}
                    />
                    <span className={light ? 'text-ink/80' : 'text-bone/85'}>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3 pt-2">
                <CTA
                  href={whatsappLink(data.subject)}
                  variant={light ? 'dark' : 'primary'}
                >
                  {data.cta}
                </CTA>
                <CTA
                  href={mailtoLink(data.subject)}
                  variant={light ? 'ghost' : 'outline'}
                  className={
                    light
                      ? 'border border-ink/25 text-ink/75 hover:border-ink hover:text-ink'
                      : undefined
                  }
                >
                  {t.book.email}
                </CTA>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
