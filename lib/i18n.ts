export const LOCALES = ['en', 'es'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** Prefixes a root-relative path with the active locale. */
export function localePath(locale: Locale, path = '/') {
  const suffix = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `/${locale}${suffix}`
}

/** Picks the best supported locale from an Accept-Language header. */
export function matchLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split('=')[1]) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    if (isLocale(base)) return base
  }

  return DEFAULT_LOCALE
}
