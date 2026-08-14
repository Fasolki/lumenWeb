import { headers } from 'next/headers'

import { SURFACE_HEADER } from '@/lib/headers'
import type { Locale } from '@/lib/i18n'

/**
 * Whether the current request arrived on lab.lifeonfullvolume.com.
 *
 * The lab is one route tree served from two hosts. On the lab host the locale
 * and /lab prefix are hidden by the proxy, so links have to be generated
 * relative to whichever door the visitor came through.
 */
export async function isLabHost() {
  const h = await headers()
  return h.get(SURFACE_HEADER) === 'lab'
}

/** Base path for lab links: '' on the lab host, '/<lang>/lab' on the main site. */
export async function labBase(locale: Locale) {
  return (await isLabHost()) ? '' : `/${locale}/lab`
}

/** Builds a lab URL that works on either host. */
export function labHref(base: string, path = '') {
  const suffix = path ? `/${path}` : ''
  return `${base}${suffix}` || '/'
}
