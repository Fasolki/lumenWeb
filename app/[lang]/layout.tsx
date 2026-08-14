import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import '../globals.css'

import { Reveal } from '@/components/Reveal'
import { getCopy } from '@/content/copy'
import { site } from '@/content/site'
import { LOCALES, isLocale, type Locale } from '@/lib/i18n'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}

  const t = getCopy(lang)
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `/${l}`]))

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.meta.title,
      template: `%s · ${site.name}`,
    },
    description: t.meta.description,
    applicationName: site.brand,
    authors: [{ name: site.legalName }],
    keywords: [
      'DJ',
      'Afro-Tech',
      'Organic House',
      'Deep House',
      'LÜMEN',
      'Life on Full Volume',
      'Madrid DJ',
      'wedding DJ',
      'corporate event DJ',
      'festival DJ',
    ],
    alternates: {
      canonical: `/${lang}`,
      languages: { ...languages, 'x-default': '/en' },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      url: `${site.url}/${lang}`,
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['/opengraph-image'],
    },
    robots: { index: true, follow: true },
  }
}

export const viewport: Viewport = {
  themeColor: '#0a0908',
  colorScheme: 'dark',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const locale: Locale = lang
  const t = getCopy(locale)

  return (
    <html lang={locale} className={`${bricolage.variable} ${inter.variable}`}>
      <body className="grain bg-ink text-bone antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lumen focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
        >
          {t.common.skipToContent}
        </a>
        {children}
        <Reveal />
      </body>
    </html>
  )
}
