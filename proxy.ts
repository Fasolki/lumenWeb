import { NextResponse, type NextRequest } from 'next/server'

import { site } from '@/content/site'
import { LOCALES, isLocale, matchLocale } from '@/lib/i18n'

const LOCALE_COOKIE = 'lumen_locale'

/**
 * The Lab has moved to lab.vitaligiggy.com. Every request to the old lab host
 * gets a permanent (308) redirect there; nothing is served from it any more.
 */
const NEW_LAB = 'https://lab.vitaligiggy.com'

/** Where an old lab-host path lives on the new Lab. */
function newLabUrl(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/echo' || path.startsWith('/echo/')) return `${NEW_LAB}/echo/`
  if (path === '/tequila') return `${NEW_LAB}/fun/tequila`
  return `${NEW_LAB}/`
}

/**
 * Two jobs:
 *
 *  1. Redirect lab.lifeonfullvolume.com to lab.vitaligiggy.com (see above).
 *  2. Make sure every main-site request carries a locale prefix, chosen from
 *     the visitor's cookie first and their Accept-Language header second.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host')?.split(':')[0] ?? ''

  // Any lab.* host counts, so the redirect can be tested locally with a
  // Host header (see scripts/smoke.sh).
  if (host === site.labHost || host.startsWith('lab.')) {
    return NextResponse.redirect(newLabUrl(pathname), 308)
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : matchLocale(request.headers.get('accept-language'))

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )

  if (hasLocale) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  const response = NextResponse.redirect(url)
  // Remember the choice so a visitor who switches language keeps it.
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  matcher: [
    /*
      Main site: everything except Next internals, the static asset folders
      and the well-known metadata files, which must resolve at the root.
    */
    '/((?!_next/|images/|downloads/|favicon.ico|robots.txt|sitemap.xml|opengraph-image|.*\\.[\\w]+$).*)',
    /*
      Old lab host: every path, files included, so old links such as
      /lab/tequila.html or /lab/echo/index.html redirect instead of 404ing.
    */
    {
      source: '/:path*',
      has: [{ type: 'header', key: 'host', value: '(?:lab\\..*)' }],
    },
  ],
}
