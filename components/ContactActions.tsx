'use client'

import { useState, type ReactNode } from 'react'

import { cn } from '@/components/ui'
import {
  CONTACT,
  MASKED_EMAIL,
  MASKED_PHONE,
  mailtoUrl,
  reveal,
  whatsappUrl,
} from '@/lib/contact'

/**
 * Action button that never puts the destination in the markup.
 *
 * Rendered as a <button>, not an <a>, precisely because an anchor would need a
 * real href to be useful — and that href is the thing being protected. The URL
 * is built in the click handler, which a scraper never runs.
 */
export function ContactButton({
  kind,
  message,
  className,
  children,
}: {
  kind: 'whatsapp' | 'email'
  /** WhatsApp draft text, or the email subject. */
  message?: string
  className?: string
  children: ReactNode
}) {
  function open() {
    if (kind === 'email') {
      window.location.href = mailtoUrl(message)
      return
    }

    // noopener matters here: wa.me is a third-party origin.
    window.open(whatsappUrl(CONTACT.waPrimary, message), '_blank', 'noopener,noreferrer')
  }

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  )
}

/**
 * A contact detail shown masked until the visitor asks for it.
 *
 * The first click swaps the mask for the real value and turns it into a
 * working link; the value is not in the DOM before that. One extra click is
 * the whole cost of not being in every spam list that scrapes the page.
 */
export function RevealContact({
  kind,
  icon,
  label,
  className,
}: {
  kind: 'whatsapp' | 'whatsappAlt' | 'email'
  icon?: ReactNode
  /** Visible hint on the masked state, e.g. "show number". */
  label: string
  className?: string
}) {
  const [shown, setShown] = useState(false)

  const masked = kind === 'email' ? MASKED_EMAIL : MASKED_PHONE

  if (!shown) {
    return (
      <button
        type="button"
        onClick={() => setShown(true)}
        className={cn('group flex items-center gap-3 text-left transition', className)}
      >
        {icon}
        <span className="tabular-nums text-haze">{masked}</span>
        <span className="text-xs uppercase tracking-[0.18em] text-lumen underline-offset-4 group-hover:underline">
          {label}
        </span>
      </button>
    )
  }

  const value =
    kind === 'email'
      ? reveal(CONTACT.email)
      : reveal(kind === 'whatsappAlt' ? CONTACT.waAltDisplay : CONTACT.waPrimaryDisplay)

  const href =
    kind === 'email'
      ? mailtoUrl()
      : whatsappUrl(kind === 'whatsappAlt' ? CONTACT.waAlt : CONTACT.waPrimary)

  return (
    <a
      href={href}
      {...(kind === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className={cn('flex items-center gap-3 transition hover:text-lumen', className)}
    >
      {icon}
      {value}
    </a>
  )
}
