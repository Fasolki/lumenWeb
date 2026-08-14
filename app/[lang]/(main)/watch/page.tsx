import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { YoutubeIcon } from '@/components/BrandIcons'
import { PageIntro } from '@/components/PageIntro'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { CTA, Section, SectionTitle } from '@/components/ui'
import { getCopy } from '@/content/copy'
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
    title: t.watch.title,
    description: t.watch.subtitle,
    alternates: { canonical: `/${lang}/watch` },
  }
}

export default async function WatchPage({
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
        eyebrow={t.watch.eyebrow}
        title={t.watch.title}
        subtitle={t.watch.subtitle}
      >
        <div className="mt-9">
          <CTA href={site.social.youtube} variant="outline">
            <YoutubeIcon size={16} />
            {t.watch.channelCta}
          </CTA>
        </div>
      </PageIntro>

      <Section width="wide" className="pt-4">
        <SectionTitle title={t.watch.featured} className="mb-10" />
        <div className="grid gap-5 md:grid-cols-2">
          {site.videos.featured.map((id) => (
            <div key={id} data-reveal>
              <YouTubeEmbed id={id} title={t.watch.featured} label={t.watch.loadVideo} />
            </div>
          ))}
        </div>
      </Section>

      <Section width="wide" className="bg-ink-2">
        <SectionTitle
          eyebrow={t.sunset.eyebrow}
          title={t.watch.sunsetSets}
          subtitle={t.sunset.body[0]}
          tone="ember"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {site.videos.sunset.map((id) => (
            <div key={id} data-reveal>
              <YouTubeEmbed
                id={id}
                title={t.watch.sunsetSets}
                label={t.watch.loadVideo}
              />
            </div>
          ))}
        </div>

        <div data-reveal className="mt-12 flex flex-wrap gap-4">
          <CTA href={`/${lang}/book`}>{t.hero.primaryCta}</CTA>
          <CTA href={site.social.youtube} variant="outline">
            {t.watch.channelCta}
          </CTA>
        </div>
      </Section>
    </>
  )
}
