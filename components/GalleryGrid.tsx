'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { cn } from '@/components/ui'
import type { Copy } from '@/content/copy'
import type { Photo } from '@/content/gallery'
import { fill } from '@/content/copy'
import type { Locale } from '@/lib/i18n'

export function GalleryGrid({
  photos,
  locale,
  t,
}: {
  photos: Photo[]
  locale: Locale
  t: Copy
}) {
  const [open, setOpen] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => {
    setOpen(null)
    // Send focus back to the thumbnail that opened the lightbox.
    triggerRef.current?.focus()
  }, [])

  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (open === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  const active = open === null ? null : photos[open]

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={(e) => {
              triggerRef.current = e.currentTarget
              setOpen(i)
            }}
            aria-label={`${t.gallery.openImage}: ${photo.alt[locale]}`}
            data-reveal
            style={{ ['--reveal-delay' as string]: `${Math.min(i, 8) * 45}ms` }}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-line bg-ink-3"
          >
            <Image
              src={photo.src}
              alt={photo.alt[locale]}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 768px) 50vw, 33vw"
              // The first screenful loads eagerly; everything below waits.
              loading={i < 4 ? 'eager' : 'lazy'}
              className="h-auto w-full transition duration-700 group-hover:scale-[1.04]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/25"
            />
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt[locale]}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/96 backdrop-blur-md"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t.gallery.closeImage}
            className="absolute right-4 top-4 z-10 rounded-full border border-line p-3 text-bone transition hover:border-lumen hover:text-lumen sm:right-6 sm:top-6"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label={t.gallery.previous}
            className="absolute left-2 z-10 rounded-full border border-line bg-ink/60 p-3 text-bone transition hover:border-lumen hover:text-lumen sm:left-6"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label={t.gallery.next}
            className="absolute right-2 z-10 rounded-full border border-line bg-ink/60 p-3 text-bone transition hover:border-lumen hover:text-lumen sm:right-6"
          >
            <ChevronRight size={20} />
          </button>

          <figure
            className="flex max-h-[90svh] w-full max-w-5xl flex-col items-center gap-4 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt[locale]}
              width={active.width}
              height={active.height}
              sizes="100vw"
              className={cn('max-h-[78svh] w-auto rounded-lg object-contain')}
              priority
            />
            <figcaption className="text-center text-sm text-haze">
              {active.alt[locale]}
              <span className="mt-1 block text-xs uppercase tracking-[0.24em] text-haze-dim">
                {fill(t.gallery.counter, {
                  current: (open ?? 0) + 1,
                  total: photos.length,
                })}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  )
}
