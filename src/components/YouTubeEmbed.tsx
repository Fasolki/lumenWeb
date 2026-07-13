import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  index: number;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useLanguage();

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
          {/* A CSS background-image can't be lazy-loaded, so all six thumbnails
              were fetched on page load. An <img> defers them until scrolled to. */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="glass p-6 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring transform hover:scale-110"
              aria-label={`${t.ui.a11y.play}: ${title}`}
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
