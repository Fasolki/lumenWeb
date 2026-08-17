import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Mail } from 'lucide-react'

import {
  InstagramIcon,
  TiktokIcon,
  WhatsappIcon,
  YoutubeIcon,
} from '@/components/BrandIcons'
import { CopyButton } from '@/components/CopyButton'
import { PageIntro } from '@/components/PageIntro'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { CTA, Section, SectionTitle } from '@/components/ui'
import { getCopy } from '@/content/copy'
import { gallery } from '@/content/gallery'
import { mailtoLink, site, whatsappLink } from '@/content/site'
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
    title: `${t.info.eyebrow} — ${site.legalName}`,
    description: t.info.subtitle,
    alternates: { canonical: `/${lang}/info` },
    // A link that gets handed out, not a page meant to rank against the
    // home page for the same terms.
    robots: { index: false, follow: true },
  }
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const t = getCopy(lang)

  // Bios are composed from the same source as the About section, so a copy
  // edit there can never leave this page saying something different.
  const shortBio = `${t.hero.tagline}. ${t.about.body[0]}`
  const longBio = [...t.about.body, t.sunset.body[1]].join('\n\n')

  const pressPhotos = gallery.slice(0, 8)

  const channels = [
    { href: site.social.youtube, label: '@LifeOnFullVolume', Icon: YoutubeIcon },
    { href: site.social.instagram, label: '@lifeonfullvolume_', Icon: InstagramIcon },
    { href: site.social.tiktok, label: '@lumen_dj', Icon: TiktokIcon },
  ]

  return (
    <>
      <PageIntro eyebrow={t.info.eyebrow} title={t.info.title} subtitle={t.info.subtitle}>
        <p className="mt-6 font-display text-[clamp(1rem,2.2vw,1.4rem)] font-semibold tracking-tight text-lumen">
          {t.hero.tagline}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <CTA href={`/${lang}/book`} size="lg">
            {t.info.bookCta}
          </CTA>
          <CTA href={whatsappLink()} variant="outline" size="lg">
            <WhatsappIcon size={17} />
            {t.common.whatsapp}
          </CTA>
        </div>
      </PageIntro>

      {/* --------------------------- At a glance ------------------------ */}
      <Section width="wide" className="pt-4">
        <SectionTitle title={t.info.factsTitle} className="mb-10" />

        <dl className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {t.info.facts.map((fact) => (
            <div key={fact.label} data-reveal className="bg-ink p-7">
              <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-lumen">
                {fact.label}
              </dt>
              <dd className="mt-3 text-bone/90">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---------------------------- Sound ----------------------------- */}
      <Section width="wide" className="bg-ink-2">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <SectionTitle eyebrow={t.sound.eyebrow} title={t.info.soundTitle} />
            <div className="mt-6 space-y-5">
              {t.sound.body.map((paragraph) => (
                <p key={paragraph} data-reveal className="leading-relaxed text-haze">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div data-reveal>
            <YouTubeEmbed
              id={site.videos.featured[0]}
              title={t.info.listenTitle}
              label={t.watch.loadVideo}
            />
          </div>
        </div>
      </Section>

      {/* -------------------------- Where played ------------------------ */}
      <Section width="wide">
        <SectionTitle
          title={t.info.historyTitle}
          subtitle={t.info.historyNote}
          className="mb-12"
        />

        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {t.info.experience.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${Math.min(i, 5) * 70}ms` }}
              className="flex flex-col gap-3 bg-ink p-8"
            >
              <span className="font-display text-4xl font-extrabold text-lumen/20">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-haze">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------------------- Listen ---------------------------- */}
      <Section width="wide" className="bg-ink-2">
        <SectionTitle
          eyebrow={t.watch.eyebrow}
          title={t.info.listenTitle}
          subtitle={t.info.listenNote}
          className="mb-10"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {[...site.videos.featured.slice(0, 2), ...site.videos.sunset].map((id) => (
            <div key={id} data-reveal>
              <YouTubeEmbed
                id={id}
                title={t.info.listenTitle}
                label={t.watch.loadVideo}
              />
            </div>
          ))}
        </div>

        <div data-reveal className="mt-10">
          <CTA href={site.social.youtube} variant="outline">
            <YoutubeIcon size={16} />
            {t.watch.channelCta}
          </CTA>
        </div>
      </Section>

      {/* ---------------------------- Photos ---------------------------- */}
      <Section width="wide">
        <SectionTitle
          title={t.info.photos}
          subtitle={t.info.photosNote}
          className="mb-10"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {pressPhotos.map((photo, i) => (
            <a
              key={photo.src}
              href={photo.src}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${Math.min(i, 7) * 55}ms` }}
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
            {t.info.downloadAll}
          </CTA>
        </div>
      </Section>

      {/* ------------------------------ Bio ----------------------------- */}
      <Section width="wide" className="bg-ink-2">
        <SectionTitle title={t.info.bioTitle} className="mb-10" />

        <div className="grid gap-6 lg:grid-cols-2">
          <div data-reveal className="card-surface rounded-[var(--radius-card)] p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-2xl">{t.info.shortBio}</h3>
              <CopyButton
                text={shortBio}
                label={t.info.copyBio}
                copiedLabel={t.info.copied}
              />
            </div>
            <p className="mt-6 leading-relaxed text-haze">{shortBio}</p>
          </div>

          <div data-reveal className="card-surface rounded-[var(--radius-card)] p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-2xl">{t.info.longBio}</h3>
              <CopyButton
                text={longBio}
                label={t.info.copyBio}
                copiedLabel={t.info.copied}
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

      {/* ----------------------------- Tech ----------------------------- */}
      <Section width="wide">
        <SectionTitle title={t.info.tech} subtitle={t.info.techNote} className="mb-10" />

        <dl className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-[color:var(--color-line)]">
          {t.info.techItems.map((item) => (
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

      {/* --------------------------- Contact ---------------------------- */}
      <Section width="wide" className="bg-ink-2">
        <div className="grid gap-12 sm:grid-cols-2">
          <div data-reveal>
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-haze-dim">
              {t.info.contactBlock}
            </h2>
            <div className="mt-6 space-y-4">
              <a
                href={mailtoLink()}
                className="flex items-center gap-3 text-lg transition hover:text-lumen"
              >
                <Mail size={17} aria-hidden />
                {site.contact.email}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg transition hover:text-lumen"
              >
                <WhatsappIcon size={17} />
                {site.contact.whatsappDisplay}
              </a>
              {/* Listed for US promoters; every button uses the primary line. */}
              <a
                href={whatsappLink(undefined, site.contact.whatsappAlt)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-wrap items-center gap-x-3 gap-y-1 text-haze transition hover:text-lumen"
              >
                <WhatsappIcon size={15} />
                {site.contact.whatsappAltDisplay}
                <span className="text-xs uppercase tracking-[0.18em] text-haze-dim">
                  {t.info.altLine}
                </span>
              </a>
              <p className="pt-2 text-sm text-haze">{site.basedIn[lang]}</p>
            </div>
          </div>

          <div data-reveal>
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-haze-dim">
              {t.info.socialBlock}
            </h2>
            <div className="mt-6 space-y-4">
              {channels.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg transition hover:text-lumen"
                >
                  <Icon size={17} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="mt-14 flex flex-col items-start gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-lg text-haze">{t.info.bookNote}</p>
          <CTA href={`/${lang}/book`} size="lg">
            {t.info.bookCta}
          </CTA>
        </div>
      </Section>
    </>
  )
}
