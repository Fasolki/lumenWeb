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
  {
    slug: 'echo',
    title: 'ECHO',
    blurb: {
      en: 'A scroll-driven site for a fictional band’s debut album. It opens in a packed gym and fades to an empty one.',
      es: 'Una web para el álbum debut de una banda ficticia. Empieza en un gimnasio lleno y termina en uno vacío.',
    },
    description: {
      en: 'Room Tone, the debut by Echo, plays the band’s sound in reverse: full volume first, then everything strips away until one note rings out. The site does the same as you scroll. The colour drains, the crowd leaves, and the line “The room remembers” fades out letter by letter. Ten tracks with full lyrics, the artwork, and slots for the songs and the music video. A fictional band created for a Technology group project.',
      es: 'Room Tone, el debut de Echo, recorre el sonido de la banda al revés: primero a todo volumen, luego todo se va apagando hasta que solo queda una nota resonando. La web hace lo mismo al hacer scroll. El color se apaga, el público se va y la frase “The room remembers” se desvanece letra a letra. Diez canciones con sus letras, el arte del álbum y espacio para las canciones y el videoclip. Una banda ficticia creada para un proyecto grupal de Tecnología.',
    },
    year: 2026,
    language: 'en',
    tags: ['Website', 'Music', 'Parallax'],
    kind: 'embed',
    file: 'echo/index.html',
    accent: '#FF3EA5',
    status: 'live',
  },
]

export function findProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
