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

export const SunsetSessions: React.FC = () => {
  const { t } = useLanguage();
  
  const sunsetVideoTitles = [
    'Afro House • Deep House | Sunset Session Vol. 5 [Recorded Live - 2025]',
    'Sunset Session Vol. 4 — Live on Segovia\'s Ancient City Walls'
  ];

  return (
    <section id="sunset" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            {t.content.sunset.title}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {t.content.sunset.description.map((paragraph: string, index: number) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-xl text-text/90 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {t.videos.sunset.map((videoId: string, index: number) => (
            <YouTubeEmbed
              key={videoId}
              videoId={videoId}
              title={sunsetVideoTitles[index] || `Sunset Session ${index + 1}`}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="glass p-8 rounded-2xl text-center">
            <h3 className="font-display text-2xl font-bold text-accent mb-4">
              {t.ui.perfectForYourEvent}
            </h3>
            <p className="text-text/80 mb-6">
              Sunset Sessions are ideal for outdoor venues, rooftop parties, beach clubs, and intimate gatherings 
              where the music becomes part of the natural rhythm of the evening.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105">
                {t.ui.bookSunsetSession}
              </button>
              <button className="px-8 py-4 glass text-text font-semibold rounded-lg hover:bg-accent/20 transition-all duration-200 focus-ring transform hover:scale-105">
                {t.ui.learnMore}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
