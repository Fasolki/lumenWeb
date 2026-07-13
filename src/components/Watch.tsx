import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { YouTubeEmbed } from './YouTubeEmbed';

export const Watch: React.FC = () => {
  const { t } = useLanguage();

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
            {t.content.watch.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.videos.featured.map((videoId: string, index: number) => (
            <YouTubeEmbed
              key={videoId}
              videoId={videoId}
              title={t.content.watch.videoTitles[index] ?? t.ui.watch}
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
