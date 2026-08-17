/**
 * Contact details, kept out of the served HTML.
 *
 * Email and phone harvesters scrape markup. They fetch a page, run a regex for
 * `mailto:`, `wa.me/<digits>` and phone-shaped strings, and move on — they do
 * not execute click handlers. So the defence that actually works is simple:
 * the real values must never appear in the HTML, in a link href, or in the
 * JSON-LD block. They are assembled in the browser, on interaction.
 *
 * The encoding below is deliberately not presented as cryptography. Anyone who
 * opens devtools can recover these in a few seconds, and that is fine — the
 * threat being defended against is bulk automated scraping, not a human who
 * wants to contact you. The encoding exists so the values are not greppable as
 * plain literals in the JS bundle either.
 */

const KEY = 7

/** Reverses the build-time encoding. Runs in the browser only. */
export function reveal(encoded: string): string {
  const raw = typeof atob === 'function'
    ? atob(encoded)
    : Buffer.from(encoded, 'base64').toString('binary')

  return String.fromCharCode(...[...raw].map((c) => c.charCodeAt(0) - KEY))
}

/**
 * Encoded contact details.
 *
 * To change one, run:
 *   node -e "const K=7;const s='NEW VALUE';console.log(Buffer.from(
 *     String.fromCharCode(...[...s].map(c=>c.charCodeAt(0)+K)),'binary'
 *   ).toString('base64'))"
 */
export const CONTACT = {
  /** Digits only — wa.me takes no punctuation. */
  waPrimary: 'Ojs9PTw5Ojk9PTk=',
  waPrimaryDisplay: 'Mjo7Jz09PCc5OjknPT05',
  waAlt: 'OD08Nz44Ozs8Ozc=',
  waAltDisplay: 'MjgnPTw3Jz44Oyc7PDs3',
  email: 'c3BtbHZ1bXxzc312c3x0bEdudGhwczVqdnQ=',
} as const

/** Masked stand-in rendered into the HTML until a visitor asks to see it. */
export const MASKED_PHONE = '+·· ··· ··· ···'
export const MASKED_EMAIL = '·······@·····.···'

export function whatsappUrl(encodedNumber: string, message?: string) {
  const number = reveal(encodedNumber)
  // A blank `text` param renders an empty draft on some clients, so omit it.
  return message
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${number}`
}

export function mailtoUrl(subject?: string) {
  const address = reveal(CONTACT.email)
  return subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`
}
