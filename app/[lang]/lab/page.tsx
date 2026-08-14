import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { Eyebrow } from '@/components/ui'
import { getCopy } from '@/content/copy'
import { projects } from '@/content/projects'
import { isLocale } from '@/lib/i18n'
import { labBase, labHref } from '@/lib/surface'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getCopy(lang)

  return {
    title: `${t.lab.eyebrow} — ${t.lab.title}`,
    description: t.lab.subtitle,
  }
}

export default async function LabIndex({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const t = getCopy(lang)
  const base = await labBase(lang)

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="bloom absolute inset-x-0 top-0 h-[32rem]" />

      <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
        <Eyebrow>{t.lab.eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.5rem,7vw,5rem)]">{t.lab.title}</h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-haze">{t.lab.subtitle}</p>

        {projects.length === 0 ? (
          <p className="mt-20 text-haze">{t.lab.empty}</p>
        ) : (
          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={labHref(base, project.slug)}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2 p-8 transition duration-500 hover:border-line-strong sm:p-10"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-25 transition duration-700 group-hover:opacity-45"
                  style={{
                    backgroundImage: `radial-gradient(60% 100% at 50% 0%, ${project.accent}, transparent 70%)`,
                  }}
                />

                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: project.accent }}
                      aria-hidden
                    />
                    <span className="text-xs uppercase tracking-[0.24em] text-haze-dim">
                      {project.year}
                    </span>
                    {project.status === 'wip' ? (
                      <span className="rounded-full border border-line px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.18em] text-haze-dim">
                        {t.lab.wip}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight">
                    {project.title}
                  </h2>

                  <p className="mt-4 flex-1 leading-relaxed text-haze">
                    {project.blurb[lang]}
                  </p>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 text-xs text-haze"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-lumen">
                      {t.lab.openProject}
                      <ArrowRight
                        size={15}
                        aria-hidden
                        className="transition duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
