import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Mail } from 'lucide-react'

import { InstagramIcon, WhatsappIcon, YoutubeIcon } from '@/components/BrandIcons'
import { CopyButton } from '@/components/CopyButton'
import { PageIntro } from '@/components/PageIntro'
import { CTA, Section, SectionTitle } from '@/components/ui'
import { getCopy } from '@/content/copy'
import { photos } from '@/content/gallery'
import { RevealContact } from '@/components/ContactActions'
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
    title: `${t.epk.title} — ${site.legalName}`,
    description: t.epk.subtitle,
    alternates: { canonical: `/${lang}/epk` },
    // The press kit is for people who were sent the link, not for search.
    robots: { index: false, follow: true },
  }
}

export default async function EpkPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const t = getCopy(lang)

  // Bios are composed from the same source as the About section, so a copy
  // edit there can never leave the press kit saying something different.
  const shortBio = `${t.hero.tagline}. ${t.about.body[0]}`
  const longBio = [...t.about.body, t.sunset.body[1]].join('\n\n')

  // Stills only: this section renders with next/image, and the gallery now
  // also holds video.
  const pressPhotos = photos.slice(0, 8)

  return (
    <>
      <PageIntro eyebrow={t.epk.eyebrow} title={t.epk.title} subtitle={t.epk.subtitle} />

      {/* --------------------------- Bios ------------------------------- */}
      <Section width="wide" className="pt-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="card-surface rounded-[var(--radius-card)] p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl">{t.epk.shortBio}</h2>
              <CopyButton
                text={shortBio}
                label={t.epk.copyBio}
                copiedLabel={t.epk.copied}
              />
            </div>
            <p className="mt-6 leading-relaxed text-haze">{shortBio}</p>
          </div>

          <div data-reveal className="card-surface rounded-[var(--radius-card)] p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl">{t.epk.longBio}</h2>
              <CopyButton
                text={longBio}
                label={t.epk.copyBio}
                copiedLabel={t.epk.copied}
              />
            </div>
            <div className="mt-6 space-y-4 leading-relaxed text-haze">
              {longBio.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------------- Photos ------------------------------ */}
      <Section width="wide" className="bg-ink-2">
        <SectionTitle title={t.epk.photos} subtitle={t.epk.photosNote} className="mb-10" />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {pressPhotos.map((photo, i) => (
            <a
              key={photo.src}
              href={photo.src}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 55}ms` }}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-line"
            >
              <Image
                src={photo.src}
                alt={photo.alt[lang]}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </a>
          ))}
        </div>

        <div data-reveal className="mt-10">
          <CTA href={`/${lang}/gallery`} variant="outline">
            {t.epk.downloadAll}
          </CTA>
        </div>
      </Section>

      {/* --------------------------- Tech ------------------------------- */}
      <Section width="wide">
        <SectionTitle title={t.epk.tech} subtitle={t.epk.techNote} className="mb-10" />

        <dl className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-[color:var(--color-line)]">
          {t.epk.techItems.map((item) => (
            <div
              key={item.label}
              data-reveal
              className="grid gap-2 bg-ink p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:p-7"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-lumen">
                {item.label}
              </dt>
              <dd className="text-bone/90">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ------------------------- Contact ------------------------------ */}
      <Section width="wide" className="bg-ink-2">
        <div className="grid gap-12 sm:grid-cols-2">
          <div data-reveal>
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-haze-dim">
              {t.epk.contactBlock}
            </h2>
            <div className="mt-6 space-y-4">
              <RevealContact
                kind="email"
                label={t.common.reveal}
                icon={<Mail size={17} aria-hidden />}
                className="text-lg"
              />
              <RevealContact
                kind="whatsapp"
                label={t.common.reveal}
                icon={<WhatsappIcon size={17} />}
                className="text-lg"
              />
              {/* Listed for US promoters. Every button elsewhere uses the
                  primary line, so enquiries stay in one place. */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <RevealContact
                  kind="whatsappAlt"
                  label={t.common.reveal}
                  icon={<WhatsappIcon size={15} />}
                  className="text-haze"
                />
                <span className="text-xs uppercase tracking-[0.18em] text-haze-dim">
                  {t.epk.altLine}
                </span>
              </div>
              <p className="pt-2 text-sm text-haze">{site.basedIn[lang]}</p>
              <noscript>
                <p className="text-sm text-haze-dim">{t.common.noScriptContact}</p>
              </noscript>
            </div>
          </div>

          <div data-reveal>
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-haze-dim">
              {t.epk.socialBlock}
            </h2>
            <div className="mt-6 space-y-4">
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg transition hover:text-lumen"
              >
                <YoutubeIcon size={17} />
                @LifeOnFullVolume
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg transition hover:text-lumen"
              >
                <InstagramIcon size={17} />
                @lifeonfullvolume_
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
