import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GalleryGrid } from '@/components/GalleryGrid'
import { PageIntro } from '@/components/PageIntro'
import { CTA, Section } from '@/components/ui'
import { getCopy } from '@/content/copy'
import { gallery } from '@/content/gallery'
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
    title: t.gallery.title,
    description: t.gallery.subtitle,
    alternates: { canonical: `/${lang}/gallery` },
  }
}

export default async function GalleryPage({
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
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        subtitle={t.gallery.subtitle}
      />

      <Section width="wide" className="pt-4">
        <GalleryGrid photos={gallery} locale={lang} t={t} />

        <div data-reveal className="mt-16 flex justify-center">
          <CTA href={`/${lang}/book`} size="lg">
            {t.hero.primaryCta}
          </CTA>
        </div>
      </Section>
    </>
  )
}
