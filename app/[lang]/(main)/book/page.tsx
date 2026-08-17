import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, Mail } from 'lucide-react'

import { WhatsappIcon } from '@/components/BrandIcons'
import { BookingTracks } from '@/components/BookingTracks'
import { ContactButton, RevealContact } from '@/components/ContactActions'
import { Faq } from '@/components/Faq'
import { PageIntro } from '@/components/PageIntro'
import { CTA, Section, SectionTitle, buttonClass } from '@/components/ui'
import { fill, getCopy } from '@/content/copy'
import { site } from '@/content/site'
import { isLocale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getCopy(lang)

  return {
    title: t.book.title,
    description: fill(t.book.subtitle, { hours: site.responseHours }),
    alternates: { canonical: `/${lang}/book` },
  }
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const t = getCopy(lang)

  return (
    <>
      <PageIntro
        eyebrow={t.book.eyebrow}
        title={t.book.title}
        subtitle={fill(t.book.subtitle, { hours: site.responseHours })}
      >
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <ContactButton kind="whatsapp" className={buttonClass({ size: 'lg' })}>
            <WhatsappIcon size={17} />
            {t.book.whatsapp}
          </ContactButton>
          <span className="text-sm text-haze-dim">{t.book.or}</span>
          <ContactButton
            kind="email"
            className={buttonClass({ variant: 'outline', size: 'lg' })}
          >
            <Mail size={17} aria-hidden />
            {t.book.email}
          </ContactButton>
        </div>

        <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-sm text-haze">
          <Clock size={15} aria-hidden className="text-lumen" />
          {fill(t.book.responseNote, { hours: site.responseHours })}
        </p>
      </PageIntro>

      {/* Two tracks, so the enquiry arrives pre-qualified. */}
      <Section width="wide" className="pt-6">
        <SectionTitle title={t.book.pickTrack} className="mb-12" />
        <BookingTracks t={t} />
      </Section>

      {/* What to include — fewer round trips means faster quotes. */}
      <Section width="wide" className="bg-ink-2">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle eyebrow={t.book.eyebrow} title={t.book.details} />
            <ul className="mt-10 space-y-4">
              {t.book.detailItems.map((item, i) => (
                <li
                  key={item}
                  data-reveal
                  style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}
                  className="flex items-center gap-4 border-b border-line pb-4 text-lg"
                >
                  <span className="font-display text-sm font-bold text-lumen/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            className="card-surface flex flex-col justify-center gap-6 rounded-[var(--radius-card)] p-9 sm:p-11"
          >
            <p className="text-lg leading-relaxed text-haze">{t.book.epkNote}</p>
            <div>
              <CTA href={`/${lang}/epk`} variant="outline">
                {t.book.epkCta}
                <ArrowRight size={16} aria-hidden />
              </CTA>
            </div>

            <div className="mt-2 space-y-3 border-t border-line pt-6 text-sm">
              <RevealContact
                kind="email"
                label={t.common.reveal}
                icon={<Mail size={15} aria-hidden />}
                className="text-haze"
              />
              <RevealContact
                kind="whatsapp"
                label={t.common.reveal}
                icon={<WhatsappIcon size={15} />}
                className="text-haze"
              />
              <noscript>
                <p className="text-haze-dim">{t.common.noScriptContact}</p>
              </noscript>
            </div>
          </div>
        </div>
      </Section>

      <Section width="default">
        <SectionTitle eyebrow={t.faq.eyebrow} title={t.faq.title} className="mb-14" />
        <Faq items={t.faq.items} />
      </Section>
    </>
  )
}
