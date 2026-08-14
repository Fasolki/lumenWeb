'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Fades [data-reveal] elements in as they enter the viewport.
 *
 * Deliberately fail-safe: the CSS only hides anything once this component has
 * added the `js` class, which happens after the bundle has loaded and run. If
 * the script is blocked, slow or errors, the class never lands and every
 * section renders plainly instead of staying invisible forever.
 *
 * Elements already on screen at mount are revealed in the same synchronous
 * block that adds `js`, so they never flash.
 */
export function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (targets.length === 0) return

    const reveal = (el: HTMLElement) => el.classList.add('is-visible')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      // Nothing to animate — leave the page in its plain, always-visible state.
      return
    }

    root.classList.add('js')

    // Anything within the first screenful is revealed immediately. Adding both
    // classes before yielding means the computed opacity never drops to 0.
    const fold = window.innerHeight * 0.95
    const pending: HTMLElement[] = []

    for (const el of targets) {
      if (el.getBoundingClientRect().top < fold) reveal(el)
      else pending.push(el)
    }

    if (pending.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        }
      },
      // Fire slightly before the element is fully on screen so the motion
      // finishes about when the reader arrives at it.
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    pending.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
