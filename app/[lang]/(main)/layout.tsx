import { notFound } from 'next/navigation'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getCopy } from '@/content/copy'
import { isLocale } from '@/lib/i18n'

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const t = getCopy(lang)

  return (
    <>
      <SiteHeader locale={lang} t={t} />
      <main id="main">{children}</main>
      <SiteFooter locale={lang} t={t} />
    </>
  )
}
