import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CalendarDays, MapPin, Ticket } from 'lucide-react'

import { PageIntro } from '@/components/PageIntro'
import { CTA, Section, SectionTitle, cn } from '@/components/ui'
import { getCopy } from '@/content/copy'
import { pastGigs, upcomingGigs, type Gig } from '@/content/gigs'
import { isLocale, type Locale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getCopy(lang)

  return {
    title: t.shows.title,
    description: t.shows.empty.body,
    alternates: { canonical: `/${lang}/shows` },
  }
}

function formatDate(iso: string, locale: Locale) {
  // Parsed as UTC so the displayed day never shifts with the server timezone.
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`))
}

function GigRow({
  gig,
  locale,
  t,
  dim,
}: {
  gig: Gig
  locale: Locale
  t: ReturnType<typeof getCopy>
  dim?: boolean
}) {
  return (
    <li
      data-reveal
      className={cn(
        'flex flex-col gap-4 border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8',
        dim && 'opacity-55',
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
        <time
          dateTime={gig.date}
          className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.16em] text-lumen sm:w-44"
        >
          <CalendarDays size={15} aria-hidden />
          {formatDate(gig.date, locale)}
        </time>

        <div>
          <p className="font-display text-2xl font-bold tracking-tight">{gig.venue}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-haze">
            <MapPin size={13} aria-hidden />
            {gig.city}, {gig.country}
          </p>
        </div>
      </div>

      {gig.private ? (
        <span className="w-fit rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.18em] text-haze-dim">
          {t.shows.privateLabel}
        </span>
      ) : gig.url ? (
        <CTA href={gig.url} size="sm" variant="outline">
          <Ticket size={15} aria-hidden />
          {t.shows.tickets}
        </CTA>
      ) : null}
    </li>
  )
}

export default async function ShowsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const t = getCopy(lang)
  const upcoming = upcomingGigs()
  const past = pastGigs()

  return (
    <>
      <PageIntro eyebrow={t.shows.eyebrow} title={t.shows.title} />

      <Section width="default" className="pt-4">
        {upcoming.length > 0 ? (
          <ul className="border-t border-line">
            {upcoming.map((gig) => (
              <GigRow key={`${gig.date}-${gig.venue}`} gig={gig} locale={lang} t={t} />
            ))}
          </ul>
        ) : (
          <div
            data-reveal
            className="card-surface rounded-[var(--radius-card)] p-10 text-center sm:p-14"
          >
            <h2 className="text-[clamp(1.6rem,4vw,2.25rem)]">{t.shows.empty.title}</h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-haze">
              {t.shows.empty.body}
            </p>
            <CTA href={`/${lang}/book`} className="mt-9">
              {t.shows.empty.cta}
            </CTA>
          </div>
        )}

        {past.length > 0 ? (
          <div className="mt-20">
            <SectionTitle title={t.shows.pastTitle} className="mb-8" />
            <ul className="border-t border-line">
              {past.map((gig) => (
                <GigRow
                  key={`${gig.date}-${gig.venue}`}
                  gig={gig}
                  locale={lang}
                  t={t}
                  dim
                />
              ))}
            </ul>
          </div>
        ) : null}
      </Section>
    </>
  )
}
