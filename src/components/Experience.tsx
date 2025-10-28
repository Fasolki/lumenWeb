import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            Experience & Highlights
          </h2>
          <p className="text-xl text-text/80 max-w-3xl mx-auto">
            3 years of experience creating unforgettable moments on dance floors around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.content.experience.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-6 rounded-lg hover:bg-accent/5 transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-3" />
                <p className="text-text/90 leading-relaxed">{highlight}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-accent mb-6">
              Ready to Create Magic Together?
            </h3>
            <p className="text-text/80 mb-8 text-lg">
              Whether it's an intimate club night, a house party, or a special sunset, 
              LÜMEN brings the same passion and energy to every performance. Let's create something unforgettable together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105">
                Book Now
              </button>
              <button className="px-8 py-4 glass text-text font-semibold rounded-lg hover:bg-accent/20 transition-all duration-200 focus-ring transform hover:scale-105">
                View Tech Requirements
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
