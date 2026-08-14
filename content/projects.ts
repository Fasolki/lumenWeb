export type Project = {
  slug: string
  title: string
  /** Short line shown on the lab index card. */
  blurb: { en: string; es: string }
  /** Longer description shown on the project page. */
  description: { en: string; es: string }
  year: number
  /** Primary language the project itself is written in. */
  language: 'en' | 'es'
  tags: string[]
  /**
   * Where the project lives. `embed` renders a self-contained HTML file from
   * public/lab/<file> inside a full-bleed frame. `external` links out.
   */
  kind: 'embed' | 'external'
  file?: string
  href?: string
  /** Accent colour used for the card. */
  accent: string
  status: 'live' | 'wip'
}

/**
 * Everything on lab.lifeonfullvolume.com.
 *
 * To add a self-contained HTML project: drop the file in public/lab/ and add
 * an entry with kind: 'embed' and file: '<name>.html'.
 */
export const projects: Project[] = [
  {
    slug: 'tequila',
    title: 'TEQUILA',
    blurb: {
      en: 'A party game of dares and questions. Spanish, no install, works on any phone.',
      es: 'Un juego de retos y preguntas para fiestas. Sin instalación, funciona en cualquier móvil.',
    },
    description: {
      en: 'Pass the phone, pick a card, take the dare — or drink. Built as a single self-contained page so it loads instantly and works offline once opened. Designed for a table of friends, not an app store.',
      es: 'Pasa el móvil, elige una carta, cumple el reto — o bebe. Hecho como una sola página autocontenida: carga al instante y funciona sin conexión una vez abierta. Pensado para una mesa de amigos, no para una tienda de apps.',
    },
    year: 2026,
    language: 'es',
    tags: ['Game', 'Party', 'Español'],
    kind: 'embed',
    file: 'tequila.html',
    accent: '#FF5E3A',
    status: 'live',
  },
]

export function findProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
