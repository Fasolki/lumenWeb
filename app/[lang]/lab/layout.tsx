import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

import { getCopy } from '@/content/copy'
import { site } from '@/content/site'
import { isLocale } from '@/lib/i18n'
import { labBase, labHref } from '@/lib/surface'

export default async function LabLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const t = getCopy(lang)
  const base = await labBase(lang)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href={labHref(base)}
            className="font-display text-lg font-extrabold tracking-tight transition hover:text-lumen"
          >
            LÜMEN
            <span className="ml-2 rounded-full border border-line px-2 py-0.5 align-middle text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-haze">
              {t.lab.eyebrow}
            </span>
          </Link>

          {/* The one link back to the booking site — the whole point of the
              subdomain split is that this is the only crossover. */}
          <a
            href={`${site.url}/${lang}`}
            className="inline-flex items-center gap-1.5 text-sm text-haze transition hover:text-lumen"
          >
            {t.lab.backToMain}
            <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="border-t border-line px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-haze-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.lab.builtBy}
          </p>
          <a href={`${site.url}/${lang}`} className="transition hover:text-lumen">
            {site.domain}
          </a>
        </div>
      </footer>
    </>
  )
}
