import type { Locale } from '@/lib/i18n'

/**
 * All site copy, in both languages. This is the file to edit for wording
 * changes — no component should contain user-facing prose.
 */
export const copy = {
  en: {
    meta: {
      title: 'LÜMEN — DJ for clubs, festivals and private events',
      description:
        'Organic Afro-Tech, jungle rhythms and deep house. LÜMEN plays clubs, beach clubs, festivals and private events across Spain, Mexico and beyond. Based in Madrid, available worldwide.',
      ogAlt: 'LÜMEN performing to a full dancefloor',
    },

    nav: {
      home: 'Home',
      sound: 'Sound',
      shows: 'Shows',
      gallery: 'Gallery',
      about: 'About',
      book: 'Book',
      epk: 'Press kit',
      lab: 'Lab',
      menu: 'Menu',
      close: 'Close',
      language: 'Language',
    },

    hero: {
      eyebrow: 'Madrid · Available worldwide',
      title: 'LÜMEN',
      tagline: 'Organic Afro-Tech · Jungle Rhythms · Deep House',
      pitch:
        'Sets built to read a room and keep it moving — from beach club sunsets to peak-time floors.',
      primaryCta: 'Check availability',
      secondaryCta: 'Listen first',
      scroll: 'Scroll',
    },

    proof: {
      title: 'Rooms played',
      note: 'Clubs, beach clubs, rooftops and private rooms across three countries.',
    },

    sound: {
      eyebrow: 'The sound',
      title: 'Warm, percussive, built to move',
      body: [
        'Afro-Tech and organic house at the core, with jungle rhythms and deep house running through it. Percussion-forward and melodic rather than hard — music that lifts a room without shouting at it.',
        'That makes it flexible. The same palette works for a sunset on the sand, a corporate rooftop at dusk, or a club floor at 3am — the energy shifts, the taste stays the same.',
      ],
      listen: 'Watch a full set',
    },

    about: {
      eyebrow: 'About',
      title: 'From a bedroom setup to the booth',
      body: [
        'LÜMEN started mixing over three years ago in his bedroom, shaped by artists like CARRILLO. B, HUGEL, Fred again.. and Badbwoy.',
        'What began as practice turned into a crowd-first approach that now runs through club nights in Madrid, beach clubs on the Mexican coast, rooftop events in the USA, and a growing catalogue of open-air Sunset Sessions on YouTube.',
        'The through-line is simple: read the room, respect the room, and build the night rather than just play at it.',
      ],
      basedLabel: 'Based in',
      influencesLabel: 'Shaped by',
      influences: ['CARRILLO. B', 'HUGEL', 'Fred again..', 'Badbwoy'],
    },

    sunset: {
      eyebrow: 'Signature project',
      title: 'Sunset Sessions',
      body: [
        'Open-air live mixes recorded in the wild and shared on YouTube — Afro-Tech and organic house with the ambience left in.',
        'Intimate performances in public spaces, built to create an atmosphere where the drinks go down smooth and the vibes stay positive. It is the clearest expression of what LÜMEN does, and the easiest way to hear it.',
      ],
      cta: 'Book a Sunset Session',
      watch: 'Watch the sessions',
    },

    services: {
      eyebrow: 'Bookings',
      title: 'Two ways to work together',
      subtitle:
        'Different rooms need different things. Pick the one that matches your event and the enquiry goes straight to the right place.',
      club: {
        title: 'Clubs & Festivals',
        for: 'For promoters, venues and festival bookers',
        body: 'Peak-time and warm-up sets built around your room and your line-up. Comfortable on any professional setup, arrives early, plays for the floor rather than the booth.',
        points: [
          'Warm-up, peak-time or closing sets',
          'Flexible on any pro CDJ or mixer setup',
          'Press kit, photos and tech rider ready to send',
          'Promo support across YouTube and Instagram',
        ],
        cta: 'Enquire about a date',
        subject: 'Club / festival booking enquiry',
      },
      private: {
        title: 'Private & Corporate',
        for: 'For companies, venues and private hosts',
        body: 'Weddings, birthdays, brand events, rooftop parties and company celebrations. The music is planned around your guests and your run of show, not a fixed setlist.',
        points: [
          'Music planned around your guests and schedule',
          'Can supply or work with your existing sound',
          'Clean, professional presentation on site',
          'Clear written quote before anything is confirmed',
        ],
        cta: 'Request a quote',
        subject: 'Private / corporate event enquiry',
      },
    },

    process: {
      eyebrow: 'How it works',
      title: 'No mystery, no runaround',
      steps: [
        {
          title: 'Tell me about the event',
          body: 'Date, city, venue, rough guest count and what kind of night you want. Two lines is enough to start.',
        },
        {
          title: 'You get a straight answer',
          body: 'Availability, a clear price and what is included — in writing, within {hours} hours.',
        },
        {
          title: 'We lock the details',
          body: 'Set times, sound requirements and any special moments. I confirm the technical side directly with your venue.',
        },
        {
          title: 'I show up early and play',
          body: 'On site ahead of time for sound check, with backup equipment and a contingency plan.',
        },
      ],
    },

    faq: {
      eyebrow: 'Questions',
      title: 'Before you ask',
      items: [
        {
          q: 'How much does it cost?',
          a: 'It depends on the date, the city, the length of the set and what equipment is needed. Tell me those four things and you will get a real number.',
        },
        {
          q: 'Do you travel?',
          a: 'Yes. Based in Madrid and regularly playing across Spain and Mexico, with travel further afield on request. Travel and accommodation are quoted separately and transparently.',
        },
        {
          q: 'Do you bring your own equipment?',
          a: 'For clubs and festivals, normally not — the house setup is used. For private and corporate events, sound can be supplied or your existing system can be worked with. Either way it is agreed in writing before the day.',
        },
        {
          q: 'Can we request specific songs?',
          a: 'Absolutely for private events — a must-play list and a do-not-play list are both genuinely useful. For clubs, the set is read live from the floor.',
        },
        {
          q: 'How far in advance should we book?',
          a: 'Weekend dates in peak season go early, so as soon as you have a date is the honest answer. Short notice is still worth asking about.',
        },
        {
          q: 'What languages do you work in?',
          a: 'English and Spanish, both fluently.',
        },
      ],
    },

    gallery: {
      eyebrow: 'Gallery',
      title: 'Rooms, floors and sunsets',
      subtitle:
        'Moments from performances across Spain, Mexico and the USA.',
      viewAll: 'See the full gallery',
      openImage: 'Open image',
      closeImage: 'Close image',
      previous: 'Previous image',
      next: 'Next image',
      counter: '{current} of {total}',
    },

    watch: {
      eyebrow: 'Watch',
      title: 'Full sets, uncut',
      subtitle:
        'The fastest way to know whether this is right for your event is to hear a whole set, not a thirty-second clip.',
      featured: 'Featured sets',
      sunsetSets: 'Sunset Sessions',
      channelCta: 'More on YouTube',
      loadVideo: 'Play video',
    },

    shows: {
      eyebrow: 'Live',
      title: 'Upcoming shows',
      empty: {
        title: 'No public dates announced right now',
        body: 'Private bookings are not listed here. For availability on a specific date, get in touch — the calendar is usually busier than this page suggests.',
        cta: 'Check a date',
      },
      privateLabel: 'Private event',
      tickets: 'Tickets',
      pastTitle: 'Previously',
    },

    testimonials: {
      eyebrow: 'Feedback',
      title: 'What people say',
      /**
       * Intentionally empty. Add real quotes from real clients only — invented
       * social proof is both dishonest and easy to spot. The section hides
       * itself entirely while this array is empty.
       */
      items: [] as { quote: string; author: string; role: string }[],
    },

    book: {
      eyebrow: 'Booking',
      title: 'Check a date',
      subtitle:
        'Tell me the date, the city and roughly what the night is. You get availability and a real price within {hours} hours.',
      responseNote: 'Every enquiry gets a written answer within {hours} hours.',
      whatsapp: 'Message on WhatsApp',
      email: 'Send an email',
      or: 'or',
      pickTrack: 'What kind of event is it?',
      details: 'What helps most in a first message',
      detailItems: [
        'Date and city',
        'Venue or type of space',
        'Rough guest count',
        'Set length and start time',
        'Whether sound is already sorted',
      ],
      epkNote:
        'Booking on behalf of a venue or festival? The press kit has the bio, photos and technical rider ready to forward.',
      epkCta: 'Open press kit',
    },

    epk: {
      eyebrow: 'Press kit',
      title: 'EPK',
      subtitle:
        'Everything a promoter, venue or agency needs in one place. Copy, photos and technical details — all cleared for use in promotion.',
      shortBio: 'Short bio',
      longBio: 'Full bio',
      copyBio: 'Copy bio',
      copied: 'Copied',
      photos: 'Press photos',
      photosNote:
        'Right-click or long-press to save. Please credit the photographer where known.',
      downloadAll: 'Open gallery',
      tech: 'Technical requirements',
      techNote:
        'Flexible and adaptable to a wide range of professional DJ setups. The list below is a standard preference, not a hard demand — if your room differs, it is almost certainly workable.',
      techItems: [
        {
          label: 'Setup',
          value: '2× CDJ (2000NXS2 or newer) + DJM mixer, or equivalent',
        },
        { label: 'Monitoring', value: 'One booth monitor, independently controllable' },
        { label: 'Sound check', value: 'Minimum 2 hours before doors for setup and check' },
        { label: 'Advance notice', value: 'Technical details confirmed at least 24 hours prior' },
        { label: 'Backup', value: 'Backup equipment and a contingency plan always in place' },
      ],
      contactBlock: 'Booking contact',
      altLine: 'Alternate line (USA)',
      socialBlock: 'Channels',
    },

    lab: {
      eyebrow: 'Lab',
      title: 'Things I make when I am not playing',
      subtitle:
        'Small projects, games and experiments. Nothing here is serious, all of it works.',
      backToMain: 'Back to LÜMEN',
      openProject: 'Open',
      launch: 'Launch',
      fullscreen: 'Open fullscreen',
      wip: 'In progress',
      empty: 'Nothing published yet.',
      builtBy: 'Made by LÜMEN',
    },

    footer: {
      tagline: 'Life on Full Volume',
      description:
        'Organic Afro-Tech, jungle rhythms and deep house. Clubs, festivals and private events.',
      bookCta: 'Check availability',
      nav: 'Site',
      connect: 'Connect',
      rights: 'All rights reserved.',
      labLink: 'Lab — side projects',
    },

    common: {
      email: 'Email',
      whatsapp: 'WhatsApp',
      youtube: 'YouTube',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      reveal: 'show',
      noScriptContact:
        'Contact details are shown on click. With JavaScript off, reach me on Instagram or YouTube instead.',
      backHome: 'Back home',
      notFoundTitle: 'Lost the signal',
      notFoundBody: 'That page does not exist. The music does.',
      skipToContent: 'Skip to content',
    },
  },

  es: {
    meta: {
      title: 'LÜMEN — DJ para clubes, festivales y eventos privados',
      description:
        'Afro-Tech orgánico, ritmos jungle y deep house. LÜMEN pincha en clubes, beach clubs, festivales y eventos privados en España, México y más allá. Con base en Madrid, disponible en todo el mundo.',
      ogAlt: 'LÜMEN actuando ante una pista llena',
    },

    nav: {
      home: 'Inicio',
      sound: 'Sonido',
      shows: 'Fechas',
      gallery: 'Galería',
      about: 'Sobre mí',
      book: 'Reservar',
      epk: 'Press kit',
      lab: 'Lab',
      menu: 'Menú',
      close: 'Cerrar',
      language: 'Idioma',
    },

    hero: {
      eyebrow: 'Madrid · Disponible en todo el mundo',
      title: 'LÜMEN',
      tagline: 'Afro-Tech Orgánico · Ritmos Jungle · Deep House',
      pitch:
        'Sets hechos para leer la sala y mantenerla en movimiento — desde atardeceres en beach club hasta pistas en hora punta.',
      primaryCta: 'Consultar disponibilidad',
      secondaryCta: 'Escuchar primero',
      scroll: 'Desliza',
    },

    proof: {
      title: 'Salas donde he pinchado',
      note: 'Clubes, beach clubs, azoteas y salas privadas en tres países.',
    },

    sound: {
      eyebrow: 'El sonido',
      title: 'Cálido, percusivo, hecho para mover',
      body: [
        'Afro-Tech y house orgánico como base, con ritmos jungle y deep house recorriéndolo todo. Percusivo y melódico antes que duro — música que levanta una sala sin gritarle.',
        'Eso lo hace flexible. La misma paleta funciona para un atardecer en la arena, una azotea corporativa al anochecer o una pista de club a las 3am — la energía cambia, el gusto se mantiene.',
      ],
      listen: 'Ver un set completo',
    },

    about: {
      eyebrow: 'Sobre mí',
      title: 'De un cuarto a la cabina',
      body: [
        'LÜMEN empezó a mezclar hace más de tres años en su habitación, influenciado por artistas como CARRILLO. B, HUGEL, Fred again.. y Badbwoy.',
        'Lo que empezó como práctica se convirtió en un enfoque centrado en el público que hoy pasa por noches de club en Madrid, beach clubs en la costa mexicana, eventos en azoteas en Estados Unidos y un catálogo creciente de Sunset Sessions al aire libre en YouTube.',
        'El hilo conductor es simple: leer la sala, respetar la sala y construir la noche en lugar de solo pinchar en ella.',
      ],
      basedLabel: 'Con base en',
      influencesLabel: 'Influencias',
      influences: ['CARRILLO. B', 'HUGEL', 'Fred again..', 'Badbwoy'],
    },

    sunset: {
      eyebrow: 'Proyecto insignia',
      title: 'Sunset Sessions',
      body: [
        'Mezclas en directo al aire libre grabadas en espacios abiertos y compartidas en YouTube — Afro-Tech y house orgánico con el ambiente natural incluido.',
        'Actuaciones íntimas en espacios públicos, pensadas para crear una atmósfera donde las bebidas bajen suaves y las vibras se mantengan positivas. Es la expresión más clara de lo que hace LÜMEN, y la forma más fácil de escucharlo.',
      ],
      cta: 'Reservar una Sunset Session',
      watch: 'Ver las sesiones',
    },

    services: {
      eyebrow: 'Reservas',
      title: 'Dos formas de trabajar juntos',
      subtitle:
        'Cada sala necesita cosas distintas. Elige la que encaje con tu evento y la consulta llega directamente al sitio correcto.',
      club: {
        title: 'Clubes y Festivales',
        for: 'Para promotores, salas y programadores de festivales',
        body: 'Sets de hora punta o de calentamiento construidos alrededor de tu sala y tu cartel. Cómodo en cualquier equipo profesional, llega pronto y pincha para la pista, no para la cabina.',
        points: [
          'Sets de apertura, hora punta o cierre',
          'Flexible con cualquier setup profesional de CDJ o mesa',
          'Press kit, fotos y rider técnico listos para enviar',
          'Apoyo de promoción en YouTube e Instagram',
        ],
        cta: 'Consultar una fecha',
        subject: 'Consulta de reserva — club / festival',
      },
      private: {
        title: 'Privados y Corporativos',
        for: 'Para empresas, espacios y anfitriones particulares',
        body: 'Bodas, cumpleaños, eventos de marca, fiestas en azotea y celebraciones de empresa. La música se planifica alrededor de tus invitados y del guion del evento, no de un setlist fijo.',
        points: [
          'Música planificada según tus invitados y horarios',
          'Puedo aportar sonido o trabajar con el que ya tienes',
          'Presencia limpia y profesional en el sitio',
          'Presupuesto claro por escrito antes de confirmar nada',
        ],
        cta: 'Pedir presupuesto',
        subject: 'Consulta de evento privado / corporativo',
      },
    },

    process: {
      eyebrow: 'Cómo funciona',
      title: 'Sin misterios ni vueltas',
      steps: [
        {
          title: 'Cuéntame del evento',
          body: 'Fecha, ciudad, espacio, número aproximado de invitados y qué tipo de noche quieres. Con dos líneas basta para empezar.',
        },
        {
          title: 'Recibes una respuesta clara',
          body: 'Disponibilidad, precio concreto y qué incluye — por escrito, en menos de {hours} horas.',
        },
        {
          title: 'Cerramos los detalles',
          body: 'Horarios del set, requisitos de sonido y momentos especiales. La parte técnica la confirmo directamente con tu espacio.',
        },
        {
          title: 'Llego pronto y pincho',
          body: 'En el sitio con antelación para la prueba de sonido, con equipo de respaldo y plan de contingencia.',
        },
      ],
    },

    faq: {
      eyebrow: 'Preguntas',
      title: 'Antes de que preguntes',
      items: [
        {
          q: '¿Cuánto cuesta?',
          a: 'Depende de la fecha, la ciudad, la duración del set y el equipo necesario. Dime esas cuatro cosas y recibirás una cifra real.',
        },
        {
          q: '¿Viajas?',
          a: 'Sí. Con base en Madrid y pinchando habitualmente por España y México, con viajes más lejos bajo petición. Viaje y alojamiento se presupuestan aparte y de forma transparente.',
        },
        {
          q: '¿Llevas tu propio equipo?',
          a: 'Para clubes y festivales normalmente no — se usa el equipo de la sala. Para eventos privados y corporativos puedo aportar sonido o trabajar con el sistema que ya tengas. En cualquier caso se acuerda por escrito antes del día.',
        },
        {
          q: '¿Podemos pedir canciones concretas?',
          a: 'Por supuesto en eventos privados — una lista de imprescindibles y otra de prohibidas son de verdad útiles. En clubes el set se lee en directo desde la pista.',
        },
        {
          q: '¿Con cuánta antelación hay que reservar?',
          a: 'Las fechas de fin de semana en temporada alta vuelan, así que la respuesta honesta es: en cuanto tengas fecha. Aun así, con poca antelación vale la pena preguntar.',
        },
        {
          q: '¿En qué idiomas trabajas?',
          a: 'Español e inglés, ambos con fluidez.',
        },
      ],
    },

    gallery: {
      eyebrow: 'Galería',
      title: 'Salas, pistas y atardeceres',
      subtitle: 'Momentos de actuaciones en España, México y Estados Unidos.',
      viewAll: 'Ver la galería completa',
      openImage: 'Abrir imagen',
      closeImage: 'Cerrar imagen',
      previous: 'Imagen anterior',
      next: 'Imagen siguiente',
      counter: '{current} de {total}',
    },

    watch: {
      eyebrow: 'Ver',
      title: 'Sets completos, sin cortes',
      subtitle:
        'La forma más rápida de saber si esto encaja con tu evento es escuchar un set entero, no un clip de treinta segundos.',
      featured: 'Sets destacados',
      sunsetSets: 'Sunset Sessions',
      channelCta: 'Más en YouTube',
      loadVideo: 'Reproducir vídeo',
    },

    shows: {
      eyebrow: 'En directo',
      title: 'Próximas fechas',
      empty: {
        title: 'Ahora mismo no hay fechas públicas anunciadas',
        body: 'Las reservas privadas no se publican aquí. Para consultar disponibilidad en una fecha concreta, escríbeme — la agenda suele estar más llena de lo que sugiere esta página.',
        cta: 'Consultar una fecha',
      },
      privateLabel: 'Evento privado',
      tickets: 'Entradas',
      pastTitle: 'Anteriormente',
    },

    testimonials: {
      eyebrow: 'Opiniones',
      title: 'Lo que dicen',
      items: [] as { quote: string; author: string; role: string }[],
    },

    book: {
      eyebrow: 'Reservas',
      title: 'Consultar una fecha',
      subtitle:
        'Dime la fecha, la ciudad y a grandes rasgos qué tipo de noche es. Recibes disponibilidad y un precio real en menos de {hours} horas.',
      responseNote: 'Toda consulta recibe respuesta por escrito en menos de {hours} horas.',
      whatsapp: 'Escribir por WhatsApp',
      email: 'Enviar un email',
      or: 'o',
      pickTrack: '¿Qué tipo de evento es?',
      details: 'Lo que más ayuda en un primer mensaje',
      detailItems: [
        'Fecha y ciudad',
        'Espacio o tipo de lugar',
        'Número aproximado de invitados',
        'Duración del set y hora de inicio',
        'Si el sonido ya está resuelto',
      ],
      epkNote:
        '¿Reservas en nombre de una sala o un festival? El press kit tiene la biografía, las fotos y el rider técnico listos para reenviar.',
      epkCta: 'Abrir press kit',
    },

    epk: {
      eyebrow: 'Press kit',
      title: 'EPK',
      subtitle:
        'Todo lo que necesita un promotor, una sala o una agencia en un solo sitio. Textos, fotos y detalles técnicos — libres para usar en promoción.',
      shortBio: 'Biografía corta',
      longBio: 'Biografía completa',
      copyBio: 'Copiar biografía',
      copied: 'Copiado',
      photos: 'Fotos de prensa',
      photosNote:
        'Clic derecho o pulsación larga para guardar. Por favor, acredita al fotógrafo cuando se conozca.',
      downloadAll: 'Abrir galería',
      tech: 'Requisitos técnicos',
      techNote:
        'Flexible y adaptable a una amplia gama de configuraciones profesionales de DJ. La lista de abajo es una preferencia estándar, no una exigencia — si tu sala es distinta, casi seguro que se puede resolver.',
      techItems: [
        {
          label: 'Equipo',
          value: '2× CDJ (2000NXS2 o superior) + mesa DJM, o equivalente',
        },
        { label: 'Monitorización', value: 'Un monitor de cabina con control independiente' },
        {
          label: 'Prueba de sonido',
          value: 'Mínimo 2 horas antes de apertura para montaje y prueba',
        },
        {
          label: 'Aviso previo',
          value: 'Detalles técnicos confirmados al menos 24 horas antes',
        },
        {
          label: 'Respaldo',
          value: 'Equipo de respaldo y plan de contingencia siempre previstos',
        },
      ],
      contactBlock: 'Contacto de reservas',
      altLine: 'Línea alternativa (EE. UU.)',
      socialBlock: 'Canales',
    },

    lab: {
      eyebrow: 'Lab',
      title: 'Cosas que hago cuando no estoy pinchando',
      subtitle:
        'Proyectos pequeños, juegos y experimentos. Nada de esto es serio, todo funciona.',
      backToMain: 'Volver a LÜMEN',
      openProject: 'Abrir',
      launch: 'Lanzar',
      fullscreen: 'Abrir a pantalla completa',
      wip: 'En progreso',
      empty: 'Todavía no hay nada publicado.',
      builtBy: 'Hecho por LÜMEN',
    },

    footer: {
      tagline: 'Life on Full Volume',
      description:
        'Afro-Tech orgánico, ritmos jungle y deep house. Clubes, festivales y eventos privados.',
      bookCta: 'Consultar disponibilidad',
      nav: 'Sitio',
      connect: 'Conectar',
      rights: 'Todos los derechos reservados.',
      labLink: 'Lab — proyectos paralelos',
    },

    common: {
      email: 'Email',
      whatsapp: 'WhatsApp',
      youtube: 'YouTube',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      reveal: 'mostrar',
      noScriptContact:
        'Los datos de contacto se muestran al hacer clic. Sin JavaScript, escríbeme por Instagram o YouTube.',
      backHome: 'Volver al inicio',
      notFoundTitle: 'Se perdió la señal',
      notFoundBody: 'Esa página no existe. La música sí.',
      skipToContent: 'Saltar al contenido',
    },
  },
} satisfies Record<Locale, unknown>

export type Copy = (typeof copy)['en']

export function getCopy(locale: Locale): Copy {
  return copy[locale] as Copy
}

/** Replaces {token} placeholders, e.g. fill(t.book.subtitle, { hours: 24 }). */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  )
}
