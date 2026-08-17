export type GalleryItem = {
  kind: 'photo' | 'video'
  /** .webp for photos, .mp4 for videos. */
  src: string
  /** Videos only: the still shown before playback starts. */
  poster?: string
  width: number
  height: number
  /** Shown as the alt attribute; keep it descriptive for accessibility and SEO. */
  alt: { en: string; es: string }
  /** Larger items claim more grid space. Set on the shots worth leading with. */
  feature?: boolean
}

/** Kept as an alias so existing imports do not need to care about video. */
export type Photo = GalleryItem

/**
 * The gallery, in display order. Videos are silent, looping and muted — they
 * exist to put movement in the grid, not to be watched with sound.
 *
 * To add a photo: drop it in public/images/gallery, run `npm run images`,
 * then add an entry with its real dimensions.
 *
 * To add a video: run
 *   sh scripts/optimize-videos.sh name=/path/to/clip.mov
 * which writes public/videos/name.mp4 and name.webp, then add an entry with
 * the mp4's dimensions (the script prints them; phone clips are usually
 * rotated, so do not assume the source dimensions carry over).
 */
export const gallery: GalleryItem[] = [
  {
    kind: 'photo',
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
    kind: 'video',
    src: '/videos/tropikos-booth.mp4',
    poster: '/videos/tropikos-booth.webp',
    width: 608,
    height: 1080,
    alt: {
      en: 'Playing the booth at a beach club as guests gather around',
      es: 'Pinchando en la cabina de un beach club mientras los invitados se reúnen alrededor',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/poolside-sunset-booth.webp',
    width: 1200,
    height: 1600,
    alt: {
      en: 'Playing to the pool as the sun drops toward the sea',
      es: 'Pinchando junto a la piscina mientras el sol baja hacia el mar',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/tropikos-booth-crowd.webp',
    width: 1280,
    height: 853,
    alt: {
      en: 'Guests gathered at the DJ booth under an umbrella at a beach club',
      es: 'Invitados reunidos en la cabina de DJ bajo una sombrilla en un beach club',
    },
    feature: true,
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_4391.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'LÜMEN mixing behind the decks',
      es: 'LÜMEN mezclando detrás de los platos',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/b2b-decks.webp',
    width: 1179,
    height: 915,
    alt: {
      en: 'Back-to-back on the controller during an afternoon set',
      es: 'Back to back en el controlador durante un set de tarde',
    },
  },
  {
    kind: 'video',
    src: '/videos/tropikos-guests.mp4',
    poster: '/videos/tropikos-guests.webp',
    width: 608,
    height: 1080,
    alt: {
      en: 'Guests around the booth during a daytime beach club set',
      es: 'Invitados alrededor de la cabina durante un set diurno en un beach club',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/poolside-golden-hour.webp',
    width: 1200,
    height: 1600,
    alt: {
      en: 'Golden hour by the pool with the crowd in the water',
      es: 'Hora dorada junto a la piscina con el público dentro del agua',
    },
  },
  {
    kind: 'photo',
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
    kind: 'photo',
    src: '/images/gallery/tropikos-daytime-set.webp',
    width: 853,
    height: 1280,
    alt: {
      en: 'Daytime set at an open-air beach club under thatched roofs and palms',
      es: 'Set diurno en un beach club al aire libre bajo palapas y palmeras',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_4398.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'Close-up of the CDJ setup mid-set',
      es: 'Primer plano de los CDJ durante el set',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_4381.webp',
    width: 1800,
    height: 1200,
    alt: {
      en: 'Wide view of the room from the DJ booth',
      es: 'Vista amplia de la sala desde la cabina',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_4069.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'LÜMEN performing under warm stage light',
      es: 'LÜMEN actuando bajo luz cálida de escenario',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_4420.webp',
    width: 1800,
    height: 1200,
    alt: {
      en: 'Crowd reacting to a drop',
      es: 'El público reaccionando a un drop',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_4438.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'Hands up on the floor during a peak-time moment',
      es: 'Manos en alto en la pista en un momento de máxima energía',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_6027.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'Booth view looking out over the dancefloor',
      es: 'Vista desde la cabina hacia la pista de baile',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/halloween2025_1.webp',
    width: 1600,
    height: 1200,
    alt: {
      en: 'Halloween 2025 party in full swing',
      es: 'Fiesta de Halloween 2025 a pleno ritmo',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/halloween2025_2.webp',
    width: 1600,
    height: 1200,
    alt: {
      en: 'Costumed crowd at the Halloween 2025 set',
      es: 'Público disfrazado en el set de Halloween 2025',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/c415eca0-2884-4818-b6bc-662ada0eab9f.webp',
    width: 1800,
    height: 2700,
    alt: {
      en: 'Portrait of LÜMEN mid-performance',
      es: 'Retrato de LÜMEN durante una actuación',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_0571.webp',
    width: 1080,
    height: 1616,
    alt: {
      en: 'Night set with the room in silhouette',
      es: 'Set nocturno con la sala en silueta',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_0835.webp',
    width: 1179,
    height: 2083,
    alt: {
      en: 'Vertical shot of the booth and lighting rig',
      es: 'Toma vertical de la cabina y la iluminación',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_0585.webp',
    width: 1616,
    height: 1080,
    alt: {
      en: 'Guests dancing at a private event',
      es: 'Invitados bailando en un evento privado',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/IMG_0698.webp',
    width: 1616,
    height: 1080,
    alt: {
      en: 'Late-night room energy',
      es: 'Energía de madrugada en la sala',
    },
  },
  {
    kind: 'photo',
    src: '/images/gallery/cf004465-439f-46ff-a57c-0c82977e29da.webp',
    width: 1600,
    height: 1200,
    alt: {
      en: 'Sunset session with the crowd gathered outdoors',
      es: 'Sunset session con el público reunido al aire libre',
    },
  },
]

/** Stills only — for the press kit, which renders them with next/image. */
export const photos = gallery.filter((item) => item.kind === 'photo')

/** Full-bleed art used by the home hero. */
export const heroImages = [
  '/images/hero/crowd-1.webp',
  '/images/hero/performance-1.webp',
  '/images/hero/crowd-2.webp',
  '/images/hero/performance-2.webp',
  '/images/hero/performance-3.webp',
]
