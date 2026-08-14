'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowDown, Play } from 'lucide-react'

import { CTA } from '@/components/ui'
import type { Copy } from '@/content/copy'
import { heroImages } from '@/content/gallery'
import type { Locale } from '@/lib/i18n'

const INTERVAL = 6500

export function Hero({ locale, t }: { locale: Locale; t: Copy }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % heroImages.length), INTERVAL)
    return () => clearInterval(id)
  }, [])

  const base = `/${locale}`

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Art */}
      <div aria-hidden className="absolute inset-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              // The first frame is the LCP element, so it loads eagerly at full
              // width; the rest can wait.
              priority={i === 0}
              sizes="100vw"
              className="drift object-cover"
            />
          </div>
        ))}
      </div>

      {/* Legibility: a vertical wash plus the gold bloom motif. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35"
      />
      <div aria-hidden className="bloom absolute inset-x-0 bottom-0 h-2/3" />

      <div className="relative mx-auto w-full max-w-[88rem] px-5 pb-20 pt-32 sm:px-8 sm:pb-24">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-lumen">
          {t.hero.eyebrow}
        </p>

        {/*
          The 0.82 line-height is tighter than the glyphs, so the umlaut on Ü
          overflows above its line box and collides with the eyebrow. The gap
          has to grow with the type, hence a clamp on the same vw basis as the
          font size rather than a fixed margin.
        */}
        <h1 className="mt-[clamp(1.5rem,4vw,4rem)] font-display text-[clamp(4.5rem,20vw,16rem)] font-extrabold leading-[0.82] tracking-[-0.05em]">
          <span className="text-gradient-lumen">{t.hero.title}</span>
        </h1>

        <p className="mt-4 font-display text-[clamp(1rem,2.4vw,1.6rem)] font-semibold tracking-tight text-bone/90">
          {t.hero.tagline}
        </p>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-haze">{t.hero.pitch}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <CTA href={`${base}/book`} size="lg">
            {t.hero.primaryCta}
          </CTA>
          <CTA href={`${base}/watch`} variant="outline" size="lg">
            <Play size={16} aria-hidden />
            {t.hero.secondaryCta}
          </CTA>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[88rem] items-center gap-3 px-5 pb-8 text-xs uppercase tracking-[0.28em] text-haze-dim sm:px-8">
        <ArrowDown size={14} aria-hidden className="animate-bounce" />
        {t.hero.scroll}
      </div>
    </section>
  )
}
