export interface Translations {
  /** Used for <title>, meta description and the Open Graph tags, per language. */
  seo: {
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: {
    labels: string[];
    anchors: string[];
  };
  social: {
    youtube: string;
    instagram: string;
    tiktok: string;
  };
  videos: {
    featured: string[];
    sunset: string[];
  };
  contact: {
    email: string;
    whatsapp: string;
  };
  content: {
    hero: {
      tagline: string;
      subtitle: string;
      /** Alt text per carousel slide, in the order the slides appear. */
      imageAlts: string[];
    };
    about: string[];
    watch: {
      description: string;
      videoTitles: string[];
    };
    sunset: {
      title: string;
      description: string[];
      videoTitles: string[];
    };
    experience: string[];
    tech: {
      description: string;
      riderUrl: string;
    };
  };
  ui: {
    languageToggle: string;
    bookContact: string;
    gallery: string;
    watch: string;
    aboutMe: string;
    viewMoreOnYouTube: string;
    bookSunsetSession: string;
    perfectForYourEvent: string;
    sunsetPerfectDescription: string;
    readyToCreateMagic: string;
    bookNow: string;
    viewTechRequirements: string;

    // About
    aboutLumen: string;
    lumenExperienceTitle: string;
    lumenExperienceDescription: string;

    // Experience
    experienceHighlights: string;
    experienceSubtitle: string;
    experienceCta: string;

    // Gigs
    upcomingGigs: string;
    catchLumenLive: string;
    wantToBookLumen: string;
    gigsBookingDescription: string;
    contactForBooking: string;
    ticketsAvailable: string;
    soldOut: string;
    cancelled: string;
    getTickets: string;

    // Quick contact
    quickContact: string;
    quickContactDescription: string;

    // Contact
    contactBooking: string;
    readyToBringExperience: string;
    emailDescription: string;
    whatsappDescription: string;
    followTheJourney: string;
    spotifyComingSoon: string;
    bookingInformation: string;
    whatToExpect: string;
    whatToExpectItems: string[];
    responseTime: string;
    responseTimeItems: string[];

    // Tech
    techRequirements: string;
    professionalSetupRequirements: string;
    professionalSetup: string;
    equipmentOverview: string;
    equipment: {
      audio: { title: string; description: string };
      lighting: { title: string; description: string };
      connectivity: { title: string; description: string };
      documentation: { title: string; description: string };
    };
    setupRequirements: string;
    technicalQuestions: string;
    contactForTechnicalDetails: string;
    downloadTechnicalRider: string;
    setupTime: string;
    advanceNotice: string;
    backupPlan: string;
    minimumHours: string;
    technicalRequirementsConfirmed: string;
    backupEquipmentContingency: string;

    // Gallery
    momentsCapturedFromPerformances: string;
    galleryImageAlt: string;

    haveSpecificTechnicalRequirements: string;

    // Booking form
    form: {
      title: string;
      subtitle: string;
      name: string;
      email: string;
      eventDate: string;
      eventType: string;
      eventTypePlaceholder: string;
      eventTypes: string[];
      location: string;
      locationPlaceholder: string;
      budget: string;
      budgetPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      responseNote: string;
      successTitle: string;
      successBody: string;
      errorBody: string;
      errorEmailFallback: string;
      mailSubject: string;
    };

    // Accessibility labels
    a11y: {
      previousImage: string;
      nextImage: string;
      pauseCarousel: string;
      playCarousel: string;
      goToImage: string;
      toggleMenu: string;
      sendEmail: string;
      visitYouTube: string;
      visitInstagram: string;
      play: string;
    };

    footer: {
      description: string;
      rightsReserved: string;
    };
  };
}

export const translations: Record<'en' | 'es', Translations> = {
  en: {
    seo: {
      title: 'DJ LÜMEN — Afro House, Afro-Tech & Deep House DJ | Bookings',
      description:
        'DJ LÜMEN plays organic Afro-Tech, jungle rhythms and deep house at clubs, beach clubs and private events in Madrid and across Spain. Watch the Sunset Sessions and request a booking.',
      ogLocale: 'en_US'
    },
    nav: {
      labels: ['About', 'Watch', 'Sunset Sessions', 'Experience', 'Gigs', 'Gallery', 'Contact', 'Tech'],
      anchors: ['#about', '#watch', '#sunset', '#experience', '#gigs', '#gallery', '#contact', '#tech']
    },
    social: {
      youtube: 'https://www.youtube.com/@LifeOnFullVolume',
      instagram: 'https://www.instagram.com/lifeonfullvolume_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      tiktok: 'https://tiktok.com/@lumen_dj'
    },
    videos: {
      featured: [
        'gCTGzejY9Rg',
        '9C6-wqf_LnM',
        '0FP1gqEGJU8',
        '2qAApFX4vjM'
      ],
      sunset: [
        'BlQOyqiI_zs',
        'MMYqqozr0Y4'
      ]
    },
    contact: {
      email: 'lifeonfullvolume@gmail.com',
      whatsapp: '+34665232662'
    },
    content: {
      hero: {
        tagline: 'LÜMEN',
        subtitle: 'Organic Afro-Tech | Jungle Rhythms | Deep House',
        imageAlts: [
          'DJ LÜMEN performing at a festival',
          'Crowd dancing to a LÜMEN set',
          'LÜMEN behind the decks',
          'Energized crowd at a LÜMEN show',
          'LÜMEN mixing live'
        ]
      },
      about: [
        'LÜMEN delivers sleek, energetic sets that bridge Afro-Tech, Jungle House, Deep House, and more. Having started over three years ago in his bedroom he is shaped by artists like CARRILLO. B, Hugel, Fred Again, Badbwoy, etc.',
        'He now brings a polished, crowd-first approach to clubs, showcases, and private rooms.',
      ],
      watch: {
        description: 'Experience the energy and artistry of LÜMEN through these featured performances and mixes.',
        videoTitles: [
          'Sunset Session Vol. 4 — Live on Segovia\'s Ancient City Walls',
          'B2B | Sunset Sessions Vol.9 — LÜMEN & DJ Tepid',
          'Afro & Jungle House | LÜMEN Cave Rave Vol.1',
          'LÜMEN - South of Spain Sunset Session'
        ]
      },
      sunset: {
        title: 'Sunset Sessions',
        description: [
          'Open-air live mixes recorded in Spain and shared on YouTube; Afro-Tech and Organic House with natural ambience.',
          'My main project featuring intimate performances in public spaces, creating positive atmospheres where the drinks go down smooth and the vibes stay positive.'
        ],
        videoTitles: [
          'Afro House • Deep House | Sunset Session Vol. 5 [Recorded Live - 2025]',
          'Afro & Deep House | LÜMEN Sunset Session Vol.7'
        ]
      },
      experience: [
        'House Parties & Private Events: Versatile sets tailored to diverse audiences and settings',
        'Rooftop Party | Sports Tournament (USA): High-energy performance spanning day-to-night',
        'Madrid Nightlife: Immersive crowd first club sets in Madrid\'s nightlife scene at clubs like Icon, Shoko, and more',
        'Mexico Beach Clubs: High-energy performances at beach clubs along the Mexican coast, including sunset sessions',
        'Sunset Sessions: Open-air live mixes recorded in around the world and shared on YouTube; Afro-Tech and Organic House with natural ambience',
        'YouTube Presence: Growing channel featuring multi-hour mixes and Sunset Sessions'
      ],
      tech: {
        description: 'Flexible and adaptable to a wide range of professional DJ setups.',
        riderUrl: '/downloads/lumen-tech-rider.pdf'
      }
    },
    ui: {
      languageToggle: 'Language',
      bookContact: 'Book / Contact',
      gallery: 'Gallery',
      watch: 'Watch',
      aboutMe: 'About Me',
      viewMoreOnYouTube: 'View More on YouTube',
      bookSunsetSession: 'Book Sunset Session',
      perfectForYourEvent: 'Perfect for Your Event',
      sunsetPerfectDescription: 'Sunset Sessions are ideal for outdoor venues, rooftop parties, beach clubs, and intimate gatherings where the music becomes part of the natural rhythm of the evening.',
      readyToCreateMagic: 'Ready to Create Magic Together?',
      bookNow: 'Book Now',
      viewTechRequirements: 'View Tech Requirements',

      aboutLumen: 'About LÜMEN',
      lumenExperienceTitle: 'The LÜMEN Experience',
      lumenExperienceDescription: 'Every set is a movie, carefully crafted to create moments to take you from this life into the music. From house parties to night clubs, LÜMEN brings the same passion and energy to every performance.',

      experienceHighlights: 'Experience & Highlights',
      experienceSubtitle: '3 years of experience creating unforgettable moments on dance floors around the world.',
      experienceCta: 'Whether it\'s an intimate club night, a house party, or a special sunset, LÜMEN brings the same passion and energy to every performance. Let\'s create something unforgettable together.',

      upcomingGigs: 'Upcoming Gigs',
      catchLumenLive: 'Catch LÜMEN live at these upcoming events. Don\'t miss out on the experience.',
      wantToBookLumen: 'Want to Book LÜMEN?',
      gigsBookingDescription: 'Don\'t see your event listed? Get in touch to discuss booking LÜMEN for your venue or event.',
      contactForBooking: 'Contact for Booking',
      ticketsAvailable: 'Tickets Available',
      soldOut: 'Sold Out',
      cancelled: 'Cancelled',
      getTickets: 'Get Tickets',

      quickContact: 'Quick Contact',
      quickContactDescription: 'Booking inquiries and collaborations - reach out anytime.',

      contactBooking: 'Contact & Booking',
      readyToBringExperience: 'Ready to bring the LÜMEN experience to your event? Get in touch to discuss bookings, collaborations, or just to say hello.',
      emailDescription: 'For bookings, collaborations, and general inquiries',
      whatsappDescription: 'Quick messages and urgent bookings via WhatsApp',
      followTheJourney: 'Follow the Journey',
      spotifyComingSoon: 'Spotify coming soon',
      bookingInformation: 'Booking Information',
      whatToExpect: 'What to Expect',
      whatToExpectItems: [
        'Professional DJ setup',
        'Genre flexibility',
        'Pre-event consultation'
      ],
      responseTime: 'Response Time',
      responseTimeItems: [
        'Email: Within 24 hours',
        'WhatsApp: Within a few hours',
        'Urgent bookings: Same day',
        'Weekend inquiries: Monday'
      ],

      techRequirements: 'Tech Requirements',
      professionalSetupRequirements: 'Professional setup requirements and technical specifications for optimal performance quality.',
      professionalSetup: 'Professional Setup',
      equipmentOverview: 'Equipment Overview',
      equipment: {
        audio: {
          title: 'Audio Equipment',
          description: 'I am adaptable to any setup, CDJs are preferable. No turntables.'
        },
        lighting: {
          title: 'Lighting Rig',
          description: 'Custom LED setup'
        },
        connectivity: {
          title: 'Connectivity',
          description: 'WiFi, Ethernet, USB-C connections'
        },
        documentation: {
          title: 'Documentation',
          description: 'Complete technical specifications'
        }
      },
      setupRequirements: 'Setup Requirements',
      technicalQuestions: 'Technical Questions?',
      contactForTechnicalDetails: 'Contact for Technical Details',
      downloadTechnicalRider: 'Download Technical Rider',
      setupTime: 'Setup Time',
      advanceNotice: 'Advance Notice',
      backupPlan: 'Backup Plan',
      minimumHours: 'Minimum 2 hours for sound check and equipment setup',
      technicalRequirementsConfirmed: 'Technical requirements must be confirmed 24 hours prior',
      backupEquipmentContingency: 'Always have backup equipment and contingency plans',

      momentsCapturedFromPerformances: 'Moments captured from performances around the world. Each image tells a story of energy, connection, and pure musical magic.',
      galleryImageAlt: 'DJ LÜMEN performing live',

      haveSpecificTechnicalRequirements: 'Have specific technical requirements or questions about the setup? Get in touch to discuss your venue\'s needs and requirements.',

      form: {
        title: 'Book LÜMEN',
        subtitle: 'Tell me about your event and I\'ll get back to you with availability and a quote.',
        name: 'Your name',
        email: 'Email',
        eventDate: 'Event date',
        eventType: 'Type of event',
        eventTypePlaceholder: 'Select one',
        eventTypes: [
          'Club night',
          'Private party',
          'Wedding',
          'Festival',
          'Beach club / rooftop',
          'Sunset Session',
          'Other'
        ],
        location: 'Venue / city',
        locationPlaceholder: 'e.g. Icon, Madrid',
        budget: 'Budget',
        budgetPlaceholder: 'e.g. €500 (optional)',
        message: 'Message',
        messagePlaceholder: 'Set length, expected crowd, what you\'re after...',
        submit: 'Send booking request',
        submitting: 'Sending...',
        responseNote: 'I reply to booking requests within 24 hours.',
        successTitle: 'Request sent',
        successBody: 'Thanks — I\'ve got your details and will get back to you within 24 hours.',
        errorBody: 'Something went wrong sending your request.',
        errorEmailFallback: 'Send it as an email instead',
        mailSubject: 'Booking request'
      },

      a11y: {
        previousImage: 'Previous image',
        nextImage: 'Next image',
        pauseCarousel: 'Pause carousel',
        playCarousel: 'Play carousel',
        goToImage: 'Go to image',
        toggleMenu: 'Toggle menu',
        sendEmail: 'Send an email',
        visitYouTube: 'Visit YouTube channel',
        visitInstagram: 'Visit Instagram profile',
        play: 'Play'
      },

      footer: {
        description: 'Bringing the energy that moves your soul. Professional DJ services for events worldwide.',
        rightsReserved: 'DJ LÜMEN. All rights reserved.'
      }
    }
  },
  es: {
    seo: {
      title: 'DJ LÜMEN — DJ de Afro House, Afro-Tech y Deep House | Contrataciones',
      description:
        'DJ LÜMEN pincha Afro-Tech orgánico, ritmos jungle y deep house en clubes, beach clubs, bodas y eventos privados en Madrid y toda España. Mira las Sunset Sessions y pide presupuesto.',
      ogLocale: 'es_ES'
    },
    nav: {
      labels: ['Sobre mí', 'Vídeos', 'Sunset Sessions', 'Experiencia', 'Fechas', 'Galería', 'Contacto', 'Técnico'],
      anchors: ['#about', '#watch', '#sunset', '#experience', '#gigs', '#gallery', '#contact', '#tech']
    },
    social: {
      youtube: 'https://www.youtube.com/@LifeOnFullVolume',
      instagram: 'https://www.instagram.com/lifeonfullvolume_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      tiktok: 'https://tiktok.com/@lumen_dj'
    },
    videos: {
      featured: [
        'gCTGzejY9Rg',
        '9C6-wqf_LnM',
        '0FP1gqEGJU8',
        '2qAApFX4vjM'
      ],
      sunset: [
        'BlQOyqiI_zs',
        'MMYqqozr0Y4'
      ]
    },
    contact: {
      email: 'lifeonfullvolume@gmail.com',
      whatsapp: '+34665232662'
    },
    content: {
      hero: {
        tagline: 'LÜMEN',
        subtitle: 'Afro-Tech Orgánico | Ritmos Jungle | Deep House',
        imageAlts: [
          'DJ LÜMEN actuando en un festival',
          'El público bailando con un set de LÜMEN',
          'LÜMEN tras los platos',
          'Público entregado en un show de LÜMEN',
          'LÜMEN mezclando en directo'
        ]
      },
      about: [
        'LÜMEN ofrece sets elegantes y enérgicos que combinan Afro-Tech, Jungle House, Deep House y mucho más. Empezó hace más de tres años en su habitación, influenciado por artistas como CARRILLO. B, Hugel, Fred Again o Badbwoy.',
        'Hoy lleva un sonido pulido y siempre pensado para la pista a clubes, showcases y salas privadas.'
      ],
      watch: {
        description: 'Vive la energía y el arte de LÜMEN a través de estas actuaciones y sesiones destacadas.',
        videoTitles: [
          'Sunset Session Vol. 4 — En directo sobre las murallas de Segovia',
          'B2B | Sunset Sessions Vol.9 — LÜMEN & DJ Tepid',
          'Afro & Jungle House | LÜMEN Cave Rave Vol.1',
          'LÜMEN - Sunset Session en el sur de España'
        ]
      },
      sunset: {
        title: 'Sunset Sessions',
        description: [
          'Sesiones en directo al aire libre grabadas en España y publicadas en YouTube: Afro-Tech y Organic House con ambiente natural.',
          'Mi proyecto principal: actuaciones íntimas en espacios abiertos, creando atmósferas donde las copas entran solas y las buenas vibras no se van.'
        ],
        videoTitles: [
          'Afro House • Deep House | Sunset Session Vol. 5 [Grabado en directo - 2025]',
          'Afro & Deep House | LÜMEN Sunset Session Vol.7'
        ]
      },
      experience: [
        'Fiestas privadas y eventos: sets versátiles adaptados a públicos y espacios muy distintos',
        'Fiesta en azotea | Torneo deportivo (EE. UU.): sesión de alta energía de día a noche',
        'Noche madrileña: sets de club inmersivos y centrados en la pista en salas como Icon, Shoko y más',
        'Beach clubs en México: sesiones de alta energía en la costa mexicana, incluidas sunset sessions',
        'Sunset Sessions: sesiones en directo al aire libre grabadas por todo el mundo y publicadas en YouTube: Afro-Tech y Organic House con ambiente natural',
        'Presencia en YouTube: canal en crecimiento con sesiones de varias horas y Sunset Sessions'
      ],
      tech: {
        description: 'Flexible y adaptable a una amplia gama de equipos profesionales de DJ.',
        riderUrl: '/downloads/lumen-tech-rider.pdf'
      }
    },
    ui: {
      languageToggle: 'Idioma',
      bookContact: 'Reservar / Contacto',
      gallery: 'Galería',
      watch: 'Vídeos',
      aboutMe: 'Sobre mí',
      viewMoreOnYouTube: 'Ver más en YouTube',
      bookSunsetSession: 'Reservar una Sunset Session',
      perfectForYourEvent: 'Perfecto para tu evento',
      sunsetPerfectDescription: 'Las Sunset Sessions son ideales para espacios al aire libre, fiestas en azotea, beach clubs y encuentros íntimos, donde la música se convierte en parte del ritmo natural de la tarde.',
      readyToCreateMagic: '¿Creamos algo mágico juntos?',
      bookNow: 'Reservar ahora',
      viewTechRequirements: 'Ver requisitos técnicos',

      aboutLumen: 'Sobre LÜMEN',
      lumenExperienceTitle: 'La experiencia LÜMEN',
      lumenExperienceDescription: 'Cada set es una película, construida con cuidado para crear momentos que te sacan de esta vida y te meten en la música. De una fiesta en casa a un club, LÜMEN pone la misma pasión y energía en cada actuación.',

      experienceHighlights: 'Experiencia y momentos destacados',
      experienceSubtitle: '3 años creando momentos inolvidables en pistas de baile de todo el mundo.',
      experienceCta: 'Ya sea una noche íntima de club, una fiesta en casa o un atardecer especial, LÜMEN pone la misma pasión y energía en cada actuación. Creemos algo inolvidable juntos.',

      upcomingGigs: 'Próximas fechas',
      catchLumenLive: 'Ve a LÜMEN en directo en estos próximos eventos. No te pierdas la experiencia.',
      wantToBookLumen: '¿Quieres reservar a LÜMEN?',
      gigsBookingDescription: '¿No ves tu evento en la lista? Escríbeme para hablar sobre reservar a LÜMEN para tu sala o evento.',
      contactForBooking: 'Contactar para reservas',
      ticketsAvailable: 'Entradas disponibles',
      soldOut: 'Entradas agotadas',
      cancelled: 'Cancelado',
      getTickets: 'Conseguir entradas',

      quickContact: 'Contacto rápido',
      quickContactDescription: 'Reservas y colaboraciones: escríbeme cuando quieras.',

      contactBooking: 'Contacto y reservas',
      readyToBringExperience: '¿Listo para llevar la experiencia LÜMEN a tu evento? Escríbeme para hablar de reservas, colaboraciones o simplemente para saludar.',
      emailDescription: 'Para reservas, colaboraciones y consultas generales',
      whatsappDescription: 'Mensajes rápidos y reservas urgentes por WhatsApp',
      followTheJourney: 'Sigue el viaje',
      spotifyComingSoon: 'Spotify próximamente',
      bookingInformation: 'Información de reservas',
      whatToExpect: 'Qué esperar',
      whatToExpectItems: [
        'Equipo de DJ profesional',
        'Flexibilidad de estilos',
        'Consulta previa al evento'
      ],
      responseTime: 'Tiempo de respuesta',
      responseTimeItems: [
        'Email: en menos de 24 horas',
        'WhatsApp: en unas pocas horas',
        'Reservas urgentes: el mismo día',
        'Consultas de fin de semana: el lunes'
      ],

      techRequirements: 'Requisitos técnicos',
      professionalSetupRequirements: 'Requisitos de equipo profesional y especificaciones técnicas para una calidad óptima en directo.',
      professionalSetup: 'Equipo profesional',
      equipmentOverview: 'Resumen del equipo',
      equipment: {
        audio: {
          title: 'Equipo de audio',
          description: 'Me adapto a cualquier equipo; preferiblemente CDJs. Sin platos de vinilo.'
        },
        lighting: {
          title: 'Iluminación',
          description: 'Montaje LED personalizado'
        },
        connectivity: {
          title: 'Conectividad',
          description: 'Conexiones WiFi, Ethernet y USB-C'
        },
        documentation: {
          title: 'Documentación',
          description: 'Especificaciones técnicas completas'
        }
      },
      setupRequirements: 'Requisitos de montaje',
      technicalQuestions: '¿Dudas técnicas?',
      contactForTechnicalDetails: 'Contactar para detalles técnicos',
      downloadTechnicalRider: 'Descargar rider técnico',
      setupTime: 'Tiempo de montaje',
      advanceNotice: 'Aviso previo',
      backupPlan: 'Plan de respaldo',
      minimumHours: 'Mínimo 2 horas para la prueba de sonido y el montaje del equipo',
      technicalRequirementsConfirmed: 'Los requisitos técnicos deben confirmarse con 24 horas de antelación',
      backupEquipmentContingency: 'Siempre con equipo de repuesto y plan de contingencia',

      momentsCapturedFromPerformances: 'Momentos capturados en actuaciones por todo el mundo. Cada imagen cuenta una historia de energía, conexión y pura magia musical.',
      galleryImageAlt: 'DJ LÜMEN actuando en directo',

      haveSpecificTechnicalRequirements: '¿Tienes requisitos técnicos concretos o dudas sobre el montaje? Escríbeme para hablar de las necesidades de tu sala.',

      form: {
        title: 'Reserva a LÜMEN',
        subtitle: 'Cuéntame cómo es tu evento y te respondo con disponibilidad y presupuesto.',
        name: 'Tu nombre',
        email: 'Email',
        eventDate: 'Fecha del evento',
        eventType: 'Tipo de evento',
        eventTypePlaceholder: 'Elige una opción',
        eventTypes: [
          'Noche de club',
          'Fiesta privada',
          'Boda',
          'Festival',
          'Beach club / azotea',
          'Sunset Session',
          'Otro'
        ],
        location: 'Sala / ciudad',
        locationPlaceholder: 'p. ej. Icon, Madrid',
        budget: 'Presupuesto',
        budgetPlaceholder: 'p. ej. 500 € (opcional)',
        message: 'Mensaje',
        messagePlaceholder: 'Duración del set, público esperado, qué buscas...',
        submit: 'Enviar solicitud de reserva',
        submitting: 'Enviando...',
        responseNote: 'Respondo a las solicitudes de reserva en menos de 24 horas.',
        successTitle: 'Solicitud enviada',
        successBody: 'Gracias, ya tengo tus datos. Te respondo en menos de 24 horas.',
        errorBody: 'Ha ocurrido un error al enviar tu solicitud.',
        errorEmailFallback: 'Enviarla por email',
        mailSubject: 'Solicitud de reserva'
      },

      a11y: {
        previousImage: 'Imagen anterior',
        nextImage: 'Imagen siguiente',
        pauseCarousel: 'Pausar el carrusel',
        playCarousel: 'Reproducir el carrusel',
        goToImage: 'Ir a la imagen',
        toggleMenu: 'Abrir o cerrar el menú',
        sendEmail: 'Enviar un email',
        visitYouTube: 'Visitar el canal de YouTube',
        visitInstagram: 'Visitar el perfil de Instagram',
        play: 'Reproducir'
      },

      footer: {
        description: 'La energía que mueve tu alma. Servicios profesionales de DJ para eventos en todo el mundo.',
        rightsReserved: 'DJ LÜMEN. Todos los derechos reservados.'
      }
    }
  }
};
