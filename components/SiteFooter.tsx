import Link from 'next/link'
import { Mail } from 'lucide-react'

import { InstagramIcon, WhatsappIcon, YoutubeIcon } from '@/components/BrandIcons'
import { Beam, CTA } from '@/components/ui'
import type { Copy } from '@/content/copy'
import { mailtoLink, site, whatsappLink } from '@/content/site'
import type { Locale } from '@/lib/i18n'

export function SiteFooter({ locale, t }: { locale: Locale; t: Copy }) {
  const base = `/${locale}`

  const nav = [
    { href: base, label: t.nav.home },
    { href: `${base}/watch`, label: t.nav.sound },
    { href: `${base}/shows`, label: t.nav.shows },
    { href: `${base}/gallery`, label: t.nav.gallery },
    { href: `${base}/book`, label: t.nav.book },
    { href: `${base}/epk`, label: t.nav.epk },
  ]

  const channels = [
    { href: site.social.youtube, label: t.common.youtube, Icon: YoutubeIcon },
    { href: site.social.instagram, label: t.common.instagram, Icon: InstagramIcon },
    { href: whatsappLink(), label: t.common.whatsapp, Icon: WhatsappIcon },
    { href: mailtoLink(), label: t.common.email, Icon: Mail },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div aria-hidden className="bloom pointer-events-none absolute inset-x-0 top-0 h-64" />

      <div className="relative mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <p className="font-display text-4xl font-extrabold tracking-tight">
              {site.name}
            </p>
            <p className="mt-1 text-sm uppercase tracking-[0.28em] text-lumen">
              {t.footer.tagline}
            </p>
            <p className="mt-6 leading-relaxed text-haze">{t.footer.description}</p>

            <CTA href={`${base}/book`} className="mt-8">
              {t.footer.bookCta}
            </CTA>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-haze-dim">
                {t.footer.nav}
              </h2>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-haze transition hover:text-lumen"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-haze-dim">
                {t.footer.connect}
              </h2>
              <ul className="mt-5 space-y-3">
                {channels.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm text-haze transition hover:text-lumen"
                    >
                      <Icon size={15} aria-hidden />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Beam className="my-12" />

        <div className="flex flex-col gap-4 text-sm text-haze-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {t.footer.rights}
          </p>
          <a
            href={site.labUrl}
            className="transition hover:text-lumen"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.labLink}
          </a>
        </div>
      </div>
    </footer>
  )
}
