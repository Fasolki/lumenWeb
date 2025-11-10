export interface Translations {
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
  gallery: {
    images: string[];
  };
  contact: {
    email: string;
    whatsapp: string;
  };
  content: {
    hero: {
      tagline: string;
      subtitle: string;
    };
    about: string[];
    sunset: {
      title: string;
      description: string[];
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
    learnMore: string;
    perfectForYourEvent: string;
    readyToCreateMagic: string;
    bookNow: string;
    viewTechRequirements: string;
    upcomingGigs: string;
    catchLumenLive: string;
    wantToBookLumen: string;
    contactForBooking: string;
    contactBooking: string;
    readyToBringExperience: string;
    followTheJourney: string;
    instagramTiktokComingSoon: string;
    bookingInformation: string;
    whatToExpect: string;
    responseTime: string;
    techRequirements: string;
    professionalSetupRequirements: string;
    professionalSetup: string;
    equipmentOverview: string;
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
    comingSoon: string;
    galleryPhotosBeingPrepared: string;
    momentsCapturedFromPerformances: string;
    haveSpecificTechnicalRequirements: string;
    footer: {
      tagline: string;
      description: string;
      rightsReserved: string;
      builtWith: string;
    };
  };
}

export const translations: Record<'en' | 'es', Translations> = {
  en: {
    nav: {
      labels: ['About', 'Watch', 'Sunset Sessions', 'Experience', 'Gigs', 'Gallery', 'Contact', 'Tech'],
      anchors: ['#about', '#watch', '#sunset', '#experience', '#gigs', '#gallery', '#contact', '#tech']
    },
    social: {
      youtube: 'https://www.youtube.com/@LifeOnFullVolume',
      instagram: 'https://instagram.com/lumen_dj',
      tiktok: 'https://tiktok.com/@lumen_dj'
    },
    videos: {
      featured: [
        'gCTGzejY9Rg',
        'YLLrNYGTOL0',
        'g12m8rw-CWs',
        'DPMY-jVmAk8'
      ],
      sunset: [
        'BlQOyqiI_zs',
        'gCTGzejY9Rg'
      ]
    },
    gallery: {
      images: [
        '/images/gallery/1.jpg',
        '/images/gallery/2.jpg',
        '/images/gallery/3.jpg',
        '/images/gallery/4.jpg',
        '/images/gallery/5.jpg',
        '/images/gallery/6.jpg',
        '/images/gallery/7.jpg',
        '/images/gallery/8.jpg'
      ]
    },
    contact: {
      email: 'lifeonfullvolume@gmail.com',
      whatsapp: '+16507144540'
    },
    content: {
      hero: {
        tagline: 'LÜMEN',
        subtitle: 'Organic Afro-Tech | Jungle Rhythms | Deep House'
      },
      about: [
        'LÜMEN delivers sleek, energetic sets that bridge Afro-Tech, Jungle House, Deep House, and more. Having started over three years ago in his bedroom he is shaped by artists like CARRILLO. B, Hugel, Fred Again, Badbwoy, etc.',
        'He now brings a polished, crowd-first approach to clubs, showcases, and private rooms.',
      ],
      sunset: {
        title: 'Sunset Sessions',
        description: [
          'Open-air live mixes recorded in Spain and shared on YouTube; Afro-Tech and Organic House with natural ambience.',
          'My main project featuring intimate performances in public spaces, creating positive atmospheres where the drinks go down smooth and the vibes stay positive.'
        ]
      },
      experience: [
        'House Parties & Private Events: Versatile sets tailored to diverse audiences and settings',
        'Rooftop Party | Sports Tournament (USA): High-energy performance spanning day-to-night',
        'Sunset Sessions: Open-air live mixes recorded in Spain and shared on YouTube; Afro-Tech and Organic House with natural ambience',
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
      learnMore: 'Learn More',
      perfectForYourEvent: 'Perfect for Your Event',
      readyToCreateMagic: 'Ready to Create Magic Together?',
      bookNow: 'Book Now',
      viewTechRequirements: 'View Tech Requirements',
      upcomingGigs: 'Upcoming Gigs',
      catchLumenLive: 'Catch LÜMEN live at these upcoming events. Don\'t miss out on the experience.',
      wantToBookLumen: 'Want to Book LÜMEN?',
      contactForBooking: 'Contact for Booking',
      contactBooking: 'Contact & Booking',
      readyToBringExperience: 'Ready to bring the LÜMEN experience to your event? Get in touch to discuss bookings, collaborations, or just to say hello.',
      followTheJourney: 'Follow the Journey',
      instagramTiktokComingSoon: 'Instagram & TikTok coming soon',
      bookingInformation: 'Booking Information',
      whatToExpect: 'What to Expect',
      responseTime: 'Response Time',
      techRequirements: 'Tech Requirements',
      professionalSetupRequirements: 'Professional setup requirements and technical specifications for optimal performance quality.',
      professionalSetup: 'Professional Setup',
      equipmentOverview: 'Equipment Overview',
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
      comingSoon: 'COMING SOON',
      galleryPhotosBeingPrepared: 'Gallery photos are being prepared. Check back soon for amazing visuals from LÜMEN\'s performances!',
      momentsCapturedFromPerformances: 'Moments captured from performances around the world. Each image tells a story of energy, connection, and pure musical magic.',
      haveSpecificTechnicalRequirements: 'Have specific technical requirements or questions about the setup? Get in touch to discuss your venue\'s needs and requirements.',
      footer: {
        tagline: 'DJ LÜMEN',
        description: 'Bringing the energy that moves your soul. Professional DJ services for events worldwide.',
        rightsReserved: '© 2024 DJ LÜMEN. All rights reserved.',
        builtWith: 'Built with React, Tailwind CSS, and Framer Motion'
      }
    }
  },
  es: {
    nav: {
      labels: ['Acerca de', 'Ver', 'Sesiones Sunset', 'Experiencia', 'Conciertos', 'Galería', 'Contacto', 'Técnico'],
      anchors: ['#about', '#watch', '#sunset', '#experience', '#gigs', '#gallery', '#contact', '#tech']
    },
    social: {
      youtube: 'https://www.youtube.com/@LifeOnFullVolume',
      instagram: 'https://instagram.com/lumen_dj',
      tiktok: 'https://tiktok.com/@lumen_dj'
    },
    videos: {
      featured: [
        'gCTGzejY9Rg',
        'YLLrNYGTOL0',
        'g12m8rw-CWs',
        'DPMY-jVmAk8'
      ],
      sunset: [
        'BlQOyqiI_zs',
        'gCTGzejY9Rg'
      ]
    },
    gallery: {
      images: [
        '/images/gallery/1.jpg',
        '/images/gallery/2.jpg',
        '/images/gallery/3.jpg',
        '/images/gallery/4.jpg',
        '/images/gallery/5.jpg',
        '/images/gallery/6.jpg',
        '/images/gallery/7.jpg',
        '/images/gallery/8.jpg'
      ]
    },
    contact: {
      email: 'lifeonfullvolume@gmail.com',
      whatsapp: '+16507144540'
    },
    content: {
      hero: {
        tagline: 'LÜMEN',
        subtitle: 'Organic Afro-Tech | Jungle Rhythms | Deep House'
      },
      about: [
        'LÜMEN ofrece sets elegantes y enérgicos que combinan Afro-Tech, Jungle House, Deep House y mucho más. Comenzó hace más de tres años en su dormitorio y ha recibido la influencia de artistas como CARRILLO. B, Hugel, Fred Again, Badbwoy, etc.',
        'Ahora aporta un enfoque pulido y centrado en el público a clubes, showcases y salas privadas'
      ],
      sunset: {
        title: 'Sunset Sessions',
        description: [
          'Mezclas en vivo al aire libre grabadas en España y compartidas en YouTube; Afro-Tech y House Orgánico con ambiente natural.',
          'Mi proyecto principal con presentaciones íntimas en espacios públicos, creando atmósferas positivas donde las bebidas bajen suaves y las vibras se mantengan positivas.'
        ]
      },
      experience: [
        'Fiestas Privadas y Eventos Privados: Sets versátiles adaptados a audiencias y entornos diversos',
        'Fiesta en Azotea | Torneo Deportivo (USA): Presentación de alta energía que abarca día y noche',
        'Sesiones Sunset: Mezclas en vivo al aire libre grabadas en España y compartidas en YouTube; Afro-Tech y House Orgánico con ambiente natural',
        'Presencia en YouTube: Canal en crecimiento con mezclas de varias horas y Sesiones Sunset'
      ],
      tech: {
        description: 'Flexible y adaptable a una amplia gama de configuraciones profesionales de DJ.',
        riderUrl: '/downloads/lumen-tech-rider.pdf'
      }
    },
    ui: {
      languageToggle: 'Idioma',
      bookContact: 'Reservar / Contacto',
      gallery: 'Galería',
      watch: 'Ver',
      aboutMe: 'Acerca de Mí',
      viewMoreOnYouTube: 'Ver Más en YouTube',
      bookSunsetSession: 'Reservar Sunset Session',
      learnMore: 'Saber Más',
      perfectForYourEvent: 'Perfecto para Tu Evento',
      readyToCreateMagic: '¿Listo para Crear Magia Juntos?',
      bookNow: 'Reservar Ahora',
      viewTechRequirements: 'Ver Requisitos Técnicos',
      upcomingGigs: 'Próximos Conciertos',
      catchLumenLive: 'Ve a LÜMEN en vivo en estos próximos eventos. No te pierdas la experiencia.',
      wantToBookLumen: '¿Quieres Reservar a LÜMEN?',
      contactForBooking: 'Contacto para Reservas',
      contactBooking: 'Contacto y Reservas',
      readyToBringExperience: '¿Listo para llevar la experiencia LÜMEN a tu evento? Ponte en contacto para discutir reservas, colaboraciones o simplemente para saludar.',
      followTheJourney: 'Sigue el Viaje',
      instagramTiktokComingSoon: 'Instagram y TikTok próximamente',
      bookingInformation: 'Información de Reservas',
      whatToExpect: 'Qué Esperar',
      responseTime: 'Tiempo de Respuesta',
      techRequirements: 'Requisitos Técnicos',
      professionalSetupRequirements: 'Requisitos de configuración profesional y especificaciones técnicas para una calidad de rendimiento óptima.',
      professionalSetup: 'Configuración Profesional',
      equipmentOverview: 'Resumen del Equipo',
      setupRequirements: 'Requisitos de Configuración',
      technicalQuestions: '¿Preguntas Técnicas?',
      contactForTechnicalDetails: 'Contacto para Detalles Técnicos',
      downloadTechnicalRider: 'Descargar Rider Técnico',
      setupTime: 'Tiempo de Configuración',
      advanceNotice: 'Aviso Previo',
      backupPlan: 'Plan de Respaldo',
      minimumHours: 'Mínimo 2 horas para prueba de sonido y configuración del equipo',
      technicalRequirementsConfirmed: 'Los requisitos técnicos deben confirmarse 24 horas antes',
      backupEquipmentContingency: 'Siempre tener equipo de respaldo y planes de contingencia',
      comingSoon: 'PRÓXIMAMENTE',
      galleryPhotosBeingPrepared: 'Las fotos de la galería se están preparando. ¡Vuelve pronto para ver increíbles visuales de las presentaciones de LÜMEN!',
      momentsCapturedFromPerformances: 'Momentos capturados de presentaciones alrededor del mundo. Cada imagen cuenta una historia de energía, conexión y pura magia musical.',
      haveSpecificTechnicalRequirements: '¿Tienes requisitos técnicos específicos o preguntas sobre la configuración? Ponte en contacto para discutir las necesidades y requisitos de tu lugar.',
      footer: {
        tagline: 'DJ LÜMEN',
        description: 'Llevando la energía que mueve tu alma. Servicios profesionales de DJ para eventos en todo el mundo.',
        rightsReserved: '© 2024 DJ LÜMEN. Todos los derechos reservados.',
        builtWith: 'Construido con React, Tailwind CSS y Framer Motion'
      }
    }
  }
};
