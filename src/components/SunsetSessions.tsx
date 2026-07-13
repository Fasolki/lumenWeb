import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollToBooking } from '../utils/scroll';
import { YouTubeEmbed } from './YouTubeEmbed';

export const SunsetSessions: React.FC = () => {
  const { t } = useLanguage();

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
              title={t.content.sunset.videoTitles[index] ?? t.content.sunset.title}
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
              {t.ui.sunsetPerfectDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToBooking}
                className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105"
              >
                {t.ui.bookSunsetSession}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
