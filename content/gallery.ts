export type Photo = {
  src: string
  width: number
  height: number
  /** Shown as the alt attribute; keep it descriptive for accessibility and SEO. */
  alt: { en: string; es: string }
  /** Larger photos claim more grid space. Set on the shots worth leading with. */
  feature?: boolean
}

/**
 * Every file in public/images/gallery, with real dimensions so the grid can
 * reserve space and avoid layout shift. Reorder freely — the grid follows
 * this array. To add a photo: drop it in public/images/gallery, run
 * `npm run images`, then add an entry here.
 */
export const gallery: Photo[] = [
  {
    src: '/images/gallery/crowd-1.webp',
    width: 1712,
    height: 972,
    alt: {
      en: 'A packed dancefloor lit from the booth during a LÜMEN set',
      es: 'Pista de baile llena iluminada desde la cabina durante un set de LÜMEN',
    },
    feature: true,
  },
  {
    src: '/images/gallery/IMG_4391.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'LÜMEN mixing behind the decks',
      es: 'LÜMEN mezclando detrás de los platos',
    },
  },
  {
    src: '/images/gallery/IMG_4398.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'Close-up of the CDJ setup mid-set',
      es: 'Primer plano de los CDJ durante el set',
    },
  },
  {
    src: '/images/gallery/IMG_4381.webp',
    width: 1800,
    height: 1200,
    alt: {
      en: 'Wide view of the room from the DJ booth',
      es: 'Vista amplia de la sala desde la cabina',
    },
  },
  {
    src: '/images/gallery/IMG_4069.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'LÜMEN performing under warm stage light',
      es: 'LÜMEN actuando bajo luz cálida de escenario',
    },
  },
  {
    src: '/images/gallery/performance-3.webp',
    width: 1800,
    height: 1003,
    alt: {
      en: 'Open-air performance at golden hour',
      es: 'Actuación al aire libre en la hora dorada',
    },
    feature: true,
  },
  {
    src: '/images/gallery/IMG_4420.webp',
    width: 1800,
    height: 1200,
    alt: {
      en: 'Crowd reacting to a drop',
      es: 'El público reaccionando a un drop',
    },
  },
  {
    src: '/images/gallery/IMG_4438.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'Hands up on the floor during a peak-time moment',
      es: 'Manos en alto en la pista en un momento de máxima energía',
    },
  },
  {
    src: '/images/gallery/IMG_6027.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'Booth view looking out over the dancefloor',
      es: 'Vista desde la cabina hacia la pista de baile',
    },
  },
  {
    src: '/images/gallery/halloween2025_1.webp',
    width: 1600,
    height: 1200,
    alt: {
      en: 'Halloween 2025 party in full swing',
      es: 'Fiesta de Halloween 2025 a pleno ritmo',
    },
  },
  {
    src: '/images/gallery/halloween2025_2.webp',
    width: 1600,
    height: 1200,
    alt: {
      en: 'Costumed crowd at the Halloween 2025 set',
      es: 'Público disfrazado en el set de Halloween 2025',
    },
  },
  {
    src: '/images/gallery/c415eca0-2884-4818-b6bc-662ada0eab9f.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'Portrait of LÜMEN mid-performance',
      es: 'Retrato de LÜMEN durante una actuación',
    },
  },
  {
    src: '/images/gallery/IMG_0571.webp',
    width: 1080,
    height: 1616,
    alt: {
      en: 'Night set with the room in silhouette',
      es: 'Set nocturno con la sala en silueta',
    },
  },
  {
    src: '/images/gallery/IMG_0835.webp',
    width: 1179,
    height: 2083,
    alt: {
      en: 'Vertical shot of the booth and lighting rig',
      es: 'Toma vertical de la cabina y la iluminación',
    },
  },
  {
    src: '/images/gallery/IMG_0585.webp',
    width: 1616,
    height: 1080,
    alt: {
      en: 'Guests dancing at a private event',
      es: 'Invitados bailando en un evento privado',
    },
  },
  {
    src: '/images/gallery/IMG_0698.webp',
    width: 1616,
    height: 1080,
    alt: {
      en: 'Late-night room energy',
      es: 'Energía de madrugada en la sala',
    },
  },
  {
    src: '/images/gallery/cf004465-439f-46ff-a57c-0c82977e29da.webp',
    width: 1600,
    height: 1200,
    alt: {
      en: 'Sunset session with the crowd gathered outdoors',
      es: 'Sunset session con el público reunido al aire libre',
    },
  },
]

/** Full-bleed art used by the home hero. */
export const heroImages = [
  '/images/hero/crowd-1.webp',
  '/images/hero/performance-1.webp',
  '/images/hero/crowd-2.webp',
  '/images/hero/performance-2.webp',
  '/images/hero/performance-3.webp',
]
