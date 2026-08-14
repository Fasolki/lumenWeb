'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { LOCALES, isLocale, type Locale } from '@/lib/i18n'
import { cn } from '@/components/ui'

const ONE_YEAR = 60 * 60 * 24 * 365

/** Kept at module scope: writing document.cookie is a side effect on a value
 *  the component does not own, which the React Compiler lint correctly flags
 *  when it happens inline in the component body. */
function persistLocale(locale: Locale) {
  document.cookie = `lumen_locale=${locale};path=/;max-age=${ONE_YEAR};samesite=lax`
}

/**
 * Swaps the locale segment of the current path and remembers the choice, so a
 * visitor who picks Spanish keeps it on their next visit.
 */
export function LanguageToggle({
  locale,
  label,
  className,
}: {
  locale: Locale
  label: string
  className?: string
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function switchTo(next: Locale) {
    if (next === locale) return

    persistLocale(next)

    const segments = pathname.split('/')
    if (isLocale(segments[1])) segments[1] = next
    else segments.splice(1, 0, next)

    startTransition(() => {
      router.push(segments.join('/') || `/${next}`)
      router.refresh()
    })
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'flex items-center rounded-full border border-line p-0.5 text-xs font-semibold',
        pending && 'opacity-60',
        className,
      )}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale ? 'true' : undefined}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase tracking-wider transition',
            l === locale ? 'bg-bone text-ink' : 'text-haze hover:text-bone',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
