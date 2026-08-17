'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play } from 'lucide-react'

import { cn } from '@/components/ui'

/**
 * Facade embed: shows the poster frame and only injects the YouTube iframe
 * once the visitor actually asks for it. A cold YouTube iframe pulls well over
 * a megabyte of script per video — on a page with six sets that is the whole
 * performance budget spent before anyone presses play.
 */
export function YouTubeEmbed({
  id,
  title,
  label,
  caption,
  className,
}: {
  id: string
  /** Used for the iframe title and the play button's accessible name. */
  title: string
  label: string
  /**
   * Optional visible caption. Left off where a section heading already names
   * the videos — YouTube poster frames usually carry the title in the artwork,
   * so repeating one section heading across four cards is just noise.
   */
  caption?: string
  className?: string
}) {
  const [active, setActive] = useState(false)

  return (
    <div
      className={cn(
        'group relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink-3',
        className,
      )}
    >
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`${label}: ${title}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent transition group-hover:from-ink/70"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lumen text-ink shadow-[0_0_50px_-6px_var(--color-lumen)] transition duration-500 group-hover:scale-110"
          >
            <Play size={22} className="ml-0.5 fill-current" />
          </span>
          {caption ? (
            <span className="absolute inset-x-0 bottom-0 p-5 text-left font-display text-lg font-bold tracking-tight">
              {caption}
            </span>
          ) : null}
        </button>
      )}
    </div>
  )
}
