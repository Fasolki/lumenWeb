'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { LanguageToggle } from '@/components/LanguageToggle'
import { CTA, cn } from '@/components/ui'
import type { Copy } from '@/content/copy'
import type { Locale } from '@/lib/i18n'

export function SiteHeader({ locale, t }: { locale: Locale; t: Copy }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const base = `/${locale}`
  const links = [
    { href: `${base}/watch`, label: t.nav.sound },
    { href: `${base}/shows`, label: t.nav.shows },
    { href: `${base}/gallery`, label: t.nav.gallery },
    { href: `${base}/info`, label: t.nav.info },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the open sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-line bg-ink/85 backdrop-blur-xl'
          : // Over a bright hero photo the nav is unreadable without a scrim.
            // A gradient keeps it legible while still feeling transparent.
            'border-b border-transparent bg-gradient-to-b from-ink/85 via-ink/45 to-transparent',
      )}
    >
      <div className="mx-auto flex h-18 max-w-[88rem] items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href={base}
          className="font-display text-xl font-extrabold tracking-tight transition hover:text-lumen"
          aria-label={t.nav.home}
        >
          LÜMEN
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  active ? 'text-lumen' : 'text-bone/75 hover:text-bone',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Wrapped rather than putting `hidden` on the children: both set
              their own display, and utility order — not class order — decides
              the winner, so `hidden inline-flex` is a coin flip. */}
          <div className="hidden items-center gap-3 sm:flex">
            <LanguageToggle locale={locale} label={t.nav.language} />
            <CTA href={`${base}/book`} size="sm">
              {t.nav.book}
            </CTA>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="rounded-full border border-line p-2.5 text-bone transition hover:border-lumen hover:text-lumen lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-6 sm:px-8">
          {[{ href: base, label: t.nav.home }, ...links].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // Closing here rather than in an effect on pathname keeps the
              // sheet's open state driven by the interaction that changes it.
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-display text-2xl font-bold tracking-tight transition hover:text-lumen"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-6 flex items-center justify-between gap-4">
            <LanguageToggle locale={locale} label={t.nav.language} />
            <CTA href={`${base}/book`} size="sm" onClick={() => setOpen(false)}>
              {t.nav.book}
            </CTA>
          </div>
        </nav>
      </div>
    </header>
  )
}
