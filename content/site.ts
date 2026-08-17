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

  // Email and phone deliberately do NOT live here. They are held encoded in
  // lib/contact.ts and assembled in the browser on click, so they never reach
  // the served HTML where harvesters would find them.

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

// whatsappLink() and mailtoLink() used to live here. They were removed on
// purpose: any helper that builds a contact URL during server rendering puts
// the address straight into the HTML. Use the components in
// components/ContactActions.tsx, which build the URL in the browser instead.
