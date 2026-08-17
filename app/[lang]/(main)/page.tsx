import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { BookingTracks } from '@/components/BookingTracks'
import { Faq } from '@/components/Faq'
import { GalleryGrid } from '@/components/GalleryGrid'
import { Hero } from '@/components/Hero'
import { VenueMarquee } from '@/components/VenueMarquee'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { Beam, CTA, Eyebrow, Section, SectionTitle } from '@/components/ui'
import { fill, getCopy } from '@/content/copy'
import { gallery } from '@/content/gallery'
import { site } from '@/content/site'
import { isLocale } from '@/lib/i18n'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const t = getCopy(lang)
  const base = `/${lang}`
  const preview = gallery.slice(0, 6)

  // Structured data helps a promoter searching "LÜMEN DJ" find the real thing,
  // and lets Google show the social profiles alongside the result.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: site.legalName,
    alternateName: site.brand,
    url: `${site.url}/${lang}`,
    genre: ['Afro House', 'Organic House', 'Deep House', 'Tech House'],
    description: t.meta.description,
    // No email or telephone here. Structured data is plain text in the HTML,
    // which makes it one of the easiest things on a page for a harvester to
    // read. Contact details are revealed in the browser instead.
    address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
    sameAs: [site.social.youtube, site.social.instagram, site.social.tiktok],
  }

  return (
    <>
      <script
        type="application/ld+json"
        // The data is static, but escaping `<` is what stops a future edit
        // from being able to close this script tag and inject markup.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <Hero locale={lang} t={t} />

      <VenueMarquee label={t.proof.title} />

      {/* ---------------------------------------------------------------- */}
      <Section id="sound" width="wide">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-6">
            <SectionTitle eyebrow={t.sound.eyebrow} title={t.sound.title} />
            {t.sound.body.map((paragraph) => (
              <p key={paragraph} data-reveal className="text-lg leading-relaxed text-haze">
                {paragraph}
              </p>
            ))}
            <div data-reveal className="pt-2">
              <CTA href={`${base}/watch`} variant="outline">
                {t.sound.listen}
                <ArrowRight size={16} aria-hidden />
              </CTA>
            </div>
          </div>

          <div data-reveal>
            <YouTubeEmbed
              id={site.videos.featured[0]}
              title={t.watch.featured}
              label={t.watch.loadVideo}
            />
          </div>
        </div>
      </Section>

      {/* ------------------------- Sunset Sessions ---------------------- */}
      <section className="relative overflow-hidden bg-ink-2">
        <div aria-hidden className="bloom-ember absolute inset-0" />
        <Beam />

        <div className="relative mx-auto max-w-[88rem] px-5 py-24 sm:px-8 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <div className="flex flex-col gap-6">
              <Eyebrow tone="ember">{t.sunset.eyebrow}</Eyebrow>
              <h2 className="text-[clamp(2.5rem,7vw,5rem)]">
                <span className="text-gradient-sunset">{t.sunset.title}</span>
              </h2>
              {t.sunset.body.map((paragraph) => (
                <p
                  key={paragraph}
                  data-reveal
                  className="max-w-xl text-lg leading-relaxed text-haze"
                >
                  {paragraph}
                </p>
              ))}
              <div data-reveal className="flex flex-wrap gap-3 pt-2">
                <CTA href={`${base}/book`} variant="ember">
                  {t.sunset.cta}
                </CTA>
                <CTA href={`${base}/watch`} variant="outline">
                  {t.sunset.watch}
                </CTA>
              </div>
            </div>

            <div data-reveal className="grid gap-4 sm:grid-cols-2">
              {site.videos.sunset.map((id) => (
                <YouTubeEmbed
                  key={id}
                  id={id}
                  title={t.sunset.title}
                  label={t.watch.loadVideo}
                />
              ))}
            </div>
          </div>
        </div>

        <Beam />
      </section>

      {/* ---------------------------- Bookings -------------------------- */}
      <Section id="bookings" width="wide">
        <SectionTitle
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
          className="mb-14"
        />
        <BookingTracks t={t} />
      </Section>

      {/* ---------------------------- Process --------------------------- */}
      <Section className="bg-ink-2" width="wide">
        <SectionTitle
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          className="mb-16"
        />

        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
              className="flex flex-col gap-4 bg-ink-2 p-8"
            >
              <span className="font-display text-5xl font-extrabold text-lumen/25">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-haze">
                {fill(step.body, { hours: site.responseHours })}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------------------- Gallery --------------------------- */}
      <Section width="wide">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            subtitle={t.gallery.subtitle}
          />
          <div data-reveal>
            <CTA href={`${base}/gallery`} variant="outline">
              {t.gallery.viewAll}
              <ArrowRight size={16} aria-hidden />
            </CTA>
          </div>
        </div>

        <GalleryGrid photos={preview} locale={lang} t={t} />
      </Section>

      {/* ----------------------------- About ---------------------------- */}
      <Section className="bg-ink-2" width="wide">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-line sm:aspect-[3/2] lg:aspect-[4/5]">
            <Image
              src="/images/gallery/IMG_4391.webp"
              alt={t.about.title}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"
            />
          </div>

          <div className="flex flex-col gap-6">
            <SectionTitle eyebrow={t.about.eyebrow} title={t.about.title} />
            {t.about.body.map((paragraph) => (
              <p key={paragraph} data-reveal className="leading-relaxed text-haze">
                {paragraph}
              </p>
            ))}

            <dl data-reveal className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-haze-dim">
                  {t.about.basedLabel}
                </dt>
                <dd className="mt-2 text-sm text-bone">{site.basedIn[lang]}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-haze-dim">
                  {t.about.influencesLabel}
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {t.about.influences.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-line px-3 py-1 text-xs text-haze"
                    >
                      {name}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {/* ------------------------------ FAQ ----------------------------- */}
      <Section width="default">
        <SectionTitle eyebrow={t.faq.eyebrow} title={t.faq.title} className="mb-14" />
        <Faq items={t.faq.items} />
      </Section>

      {/* --------------------------- Final CTA -------------------------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="bloom absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 md:py-36">
          <h2 data-reveal className="text-[clamp(2.5rem,8vw,5.5rem)]">
            <span className="text-gradient-lumen">{t.book.title}</span>
          </h2>
          <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-haze">
            {fill(t.book.subtitle, { hours: site.responseHours })}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-4">
            <CTA href={`${base}/book`} size="lg">
              {t.hero.primaryCta}
            </CTA>
            <CTA href={`${base}/epk`} variant="outline" size="lg">
              {t.epk.title}
            </CTA>
          </div>
        </div>
      </section>
    </>
  )
}
