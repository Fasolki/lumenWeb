import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Maximize2 } from 'lucide-react'

import { CTA, cn } from '@/components/ui'
import { getCopy } from '@/content/copy'
import { findProject, projects } from '@/content/projects'
import { isLocale } from '@/lib/i18n'
import { labBase, labHref } from '@/lib/surface'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}

  const project = findProject(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.blurb[lang],
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()

  const project = findProject(slug)
  if (!project) notFound()

  const t = getCopy(lang)
  const base = await labBase(lang)
  const fileUrl = project.kind === 'embed' ? `/lab/${project.file}` : project.href

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-30"
        style={{
          backgroundImage: `radial-gradient(55% 100% at 50% 0%, ${project.accent}, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <Link
          href={labHref(base)}
          className="inline-flex items-center gap-2 text-sm text-haze transition hover:text-lumen"
        >
          <ArrowLeft size={15} aria-hidden />
          {t.lab.eyebrow}
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold tracking-tight">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-haze">
              {project.description[lang]}
            </p>
          </div>

          {fileUrl ? (
            <CTA href={fileUrl} variant="outline" external>
              <Maximize2 size={15} aria-hidden />
              {t.lab.fullscreen}
            </CTA>
          ) : null}
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs text-haze"
            >
              {tag}
            </li>
          ))}
        </ul>

        {project.kind === 'embed' && project.file ? (
          <div
            className={cn(
              'mt-14 overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2',
              'shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]',
            )}
          >
            <iframe
              src={`/lab/${project.file}`}
              title={project.title}
              // The game is a self-contained page from the same origin; the
              // sandbox still blocks it from navigating the parent frame.
              sandbox="allow-scripts allow-same-origin allow-popups"
              loading="lazy"
              className="h-[min(78svh,900px)] w-full border-0"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
