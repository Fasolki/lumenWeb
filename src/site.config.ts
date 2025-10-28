export interface SiteConfig {
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
}

export const siteConfig: SiteConfig = {
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
      'gCTGzejY9Rg', // Placeholder - replace with actual video IDs
      'YLLrNYGTOL0',
      'g12m8rw-CWs',
      'cj4vF98p_I0'
    ],
    sunset: [
      'YLLrNYGTOL0', // Placeholder - replace with actual video IDs
      'gCTGzejY9Rg'
    ]
  },
  gallery: {
    images: [
      '/images/gallery/1.jpg', // TODO: Replace with actual gallery images
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
      'LÜMEN delivers sleek, energetic sets that bridge Afro-Tech, Jungle, Deep, and Organic House rhythms.',
      'Starting in his bedroom making mixes three years ago. Shaped by artists like CARRILLO. B, Hugel, Antdot, BadBwoy, and Fred Again. He now brings a polished, crowd-first approach to clubs, showcases, and private rooms.',
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
      riderUrl: '/downloads/lumen-tech-rider.pdf' // TODO: Replace with actual rider PDF
    }
  }
};
