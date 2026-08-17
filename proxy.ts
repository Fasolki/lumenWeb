import { NextResponse, type NextRequest } from 'next/server'

import { site } from '@/content/site'
import { SURFACE_HEADER } from '@/lib/headers'
import { LOCALES, isLocale, matchLocale } from '@/lib/i18n'

const LOCALE_COOKIE = 'lumen_locale'

/**
 * Two jobs:
 *
 *  1. Serve lab.lifeonfullvolume.com from the /lab route tree, with clean
 *     paths — the visitor sees /tequila, the app renders /en/lab/tequila.
 *  2. Make sure every main-site request carries a locale prefix, chosen from
 *     the visitor's cookie first and their Accept-Language header second.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host')?.split(':')[0] ?? ''

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : matchLocale(request.headers.get('accept-language'))

  // Treat any *.lab host as the lab, so Vercel preview URLs work too.
  const isLabHost = host === site.labHost || host.startsWith('lab.')

  if (isLabHost) {
    // Already rewritten (or someone typed the long form) — leave it alone.
    if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
      return NextResponse.next()
    }

    const url = request.nextUrl.clone()
    url.pathname = pathname === '/' ? `/${locale}/lab` : `/${locale}/lab${pathname}`

    // Passed as a *request* header so server components can read it with
    // headers() and emit short links (/tequila) instead of /en/lab/tequila.
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set(SURFACE_HEADER, 'lab')

    return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  }

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )

  if (hasLocale) {
    // Strip any inbound copy of the surface header. It is set by this proxy
    // and read by server components, so a client that sends its own must not
    // be able to change what the server renders.
    const requestHeaders = new Headers(request.headers)
    requestHeaders.delete(SURFACE_HEADER)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  const response = NextResponse.redirect(url)
  // Remember the choice so a visitor who switches language keeps it.
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    // Not HttpOnly: the language toggle writes this from the client, and
    // document.cookie cannot set HttpOnly cookies. The value is validated
    // against the locale list before it is ever used, so a tampered cookie
    // just falls back to the default.
    secure: request.nextUrl.protocol === 'https:',
  })
  return response
}

export const config = {
  matcher: [
    /*
      Everything except Next internals, the static asset folders and the
      well-known metadata files, which must resolve at the root.
    */
    '/((?!_next/|images/|lab/|downloads/|favicon.ico|robots.txt|sitemap.xml|opengraph-image|.*\\.[\\w]+$).*)',
  ],
}
