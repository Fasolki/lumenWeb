import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            About LÜMEN
          </h2>
        </motion.div>

        <div className="space-y-8">
          {t.content.about.map((paragraph: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-lg md:text-xl text-text/90 leading-relaxed">
                {paragraph}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-accent mb-4">
              The LÜMEN Experience
            </h3>
            <p className="text-text/80">
              Every set is a movie, carefully crafted to create moments to take you from this life into the music. 
              From house parties to night clubs, LÜMEN brings the same passion and energy to every performance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
