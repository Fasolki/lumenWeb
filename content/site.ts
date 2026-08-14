/**
 * Single source of truth for identity, contact details and outbound links.
 * Change a value here and it updates everywhere on the site.
 */
export const site = {
  name: 'LÜMEN',
  legalName: 'DJ LÜMEN',
  brand: 'Life on Full Volume',
  domain: 'lifeonfullvolume.com',
  url: 'https://lifeonfullvolume.com',
  labUrl: 'https://lab.lifeonfullvolume.com',

  /** Host that middleware rewrites onto the /lab route tree. */
  labHost: 'lab.lifeonfullvolume.com',

  contact: {
    email: 'lifeonfullvolume@gmail.com',
    // Primary line. Every WhatsApp button on the site points here.
    whatsapp: '+34665232662',
    whatsappDisplay: '+34 665 232 662',
    // Alternate line, listed in the press kit for US promoters. Deliberately
    // not wired to any button, so enquiries land in one inbox.
    whatsappAlt: '+16507144540',
    whatsappAltDisplay: '+1 650 714 4540',
  },

  social: {
    youtube: 'https://www.youtube.com/@LifeOnFullVolume',
    instagram: 'https://www.instagram.com/lifeonfullvolume_',
    tiktok: 'https://www.tiktok.com/@lumen_dj',
  },

  /** Response-time promise surfaced on the booking page. */
  responseHours: 24,

  basedIn: {
    en: 'Madrid, Spain — available worldwide',
    es: 'Madrid, España — disponible en todo el mundo',
  },

  videos: {
    featured: ['gCTGzejY9Rg', '9C6-wqf_LnM', '0FP1gqEGJU8', '2qAApFX4vjM'],
    sunset: ['BlQOyqiI_zs', 'MMYqqozr0Y4'],
  },

  /** Venues and rooms worth naming to a promoter. */
  venues: [
    'Icon · Madrid',
    'Shoko · Madrid',
    'Beach Clubs · Mexico',
    'Rooftop Series · USA',
    'Sunset Sessions · Spain',
  ],
} as const

// `number` is widened to string: `site` is `as const`, so inferring the type
// from the default would pin it to the primary number's literal type.
export function whatsappLink(message?: string, number: string = site.contact.whatsapp) {
  const digits = number.replace(/[^0-9]/g, '')
  // A blank `text` param renders an empty draft on some clients, so omit it.
  return message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`
}

export function mailtoLink(subject?: string) {
  return subject
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${site.contact.email}`
}
