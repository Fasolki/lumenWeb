import Link from 'next/link'

import { buttonClass } from '@/components/ui'
import { getCopy } from '@/content/copy'
import { DEFAULT_LOCALE } from '@/lib/i18n'

/**
 * Rendered inside the [lang] root layout, which owns <html>. The segment
 * params are not available to a not-found boundary, so this falls back to the
 * default locale rather than guessing.
 */
export default function NotFound() {
  const t = getCopy(DEFAULT_LOCALE)

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5">
      <div aria-hidden className="bloom absolute inset-0" />

      <div className="relative text-center">
        <p className="font-display text-[clamp(6rem,22vw,14rem)] font-extrabold leading-none tracking-tighter text-lumen/15">
          404
        </p>
        <h1 className="-mt-6 text-[clamp(2rem,6vw,3.5rem)]">{t.common.notFoundTitle}</h1>
        <p className="mt-5 text-lg text-haze">{t.common.notFoundBody}</p>
        <Link href={`/${DEFAULT_LOCALE}`} className={`${buttonClass()} mt-10`}>
          {t.common.backHome}
        </Link>
      </div>
    </div>
  )
}
