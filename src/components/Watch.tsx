import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  index: number;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative aspect-video rounded-lg overflow-hidden"
    >
      {!isPlaying ? (
        <div className="relative w-full h-full bg-surface rounded-lg overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
            }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="glass p-6 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring transform hover:scale-110"
              aria-label={`Play ${title}`}
            >
              <Play size={32} className="text-text" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-text font-semibold text-lg">{title}</h3>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </motion.div>
  );
};

export const Watch: React.FC = () => {
  const { t } = useLanguage();
  
  const videoTitles = [
    'Sunset Session Vol. 4 — Live on Segovia\'s Ancient City Walls',
    'Sunset Sessions Vol. 3 — LÜMEN',
    'Afro & Deep House | LÜMEN Sunset Sessions Vol.2',
    'LÜMEN - Sunset Vibes | Deep House & Afro House DJ Set'
  ];

  return (
    <section id="watch" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            {t.ui.watch}
          </h2>
          <p className="text-xl text-text/80 max-w-3xl mx-auto">
            Experience the energy and artistry of LÜMEN through these featured performances and mixes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.videos.featured.map((videoId: string, index: number) => (
            <YouTubeEmbed
              key={videoId}
              videoId={videoId}
              title={videoTitles[index] || `Performance ${index + 1}`}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href={t.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105"
          >
            <Play size={20} className="mr-2" />
            {t.ui.viewMoreOnYouTube}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
