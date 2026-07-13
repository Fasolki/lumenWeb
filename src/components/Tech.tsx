import { motion } from 'framer-motion';
import { Download, FileText, Wifi, Volume2, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollToSection } from '../utils/scroll';

export const Tech: React.FC = () => {
  const { t } = useLanguage();

  const equipment = [
    { icon: Volume2, ...t.ui.equipment.audio },
    { icon: Zap, ...t.ui.equipment.lighting },
    { icon: Wifi, ...t.ui.equipment.connectivity },
    { icon: FileText, ...t.ui.equipment.documentation },
  ];

  const setupRequirements = [
    { badge: '2h', title: t.ui.setupTime, description: t.ui.minimumHours },
    { badge: '24h', title: t.ui.advanceNotice, description: t.ui.technicalRequirementsConfirmed },
    { badge: '✓', title: t.ui.backupPlan, description: t.ui.backupEquipmentContingency },
  ];

  return (
    <section id="tech" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            {t.ui.techRequirements}
          </h2>
          <p className="text-xl text-text/80 max-w-3xl mx-auto">
            {t.ui.professionalSetupRequirements}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold text-accent mb-6">
                {t.ui.professionalSetup}
              </h3>
              <p className="text-text/90 leading-relaxed mb-6">
                {t.content.tech.description}
              </p>
              <a
                href={t.content.tech.riderUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105"
              >
                <Download size={20} className="mr-2" />
                {t.ui.downloadTechnicalRider}
              </a>
            </div>
          </motion.div>

          {/* Equipment List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold text-accent mb-6">
                {t.ui.equipmentOverview}
              </h3>
              <div className="space-y-4">
                {equipment.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-center space-x-4">
                    <div className="glass p-3 rounded-lg">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text">{title}</h4>
                      <p className="text-text/80 text-sm">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="glass p-8 rounded-2xl">
            <h3 className="font-display text-2xl font-bold text-accent mb-6 text-center">
              {t.ui.setupRequirements}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {setupRequirements.map(({ badge, title, description }) => (
                <div key={title} className="text-center">
                  <div className="glass p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent">{badge}</span>
                  </div>
                  <h4 className="font-semibold text-text mb-2">{title}</h4>
                  <p className="text-text/80 text-sm">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact for Tech Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-accent mb-4">
              {t.ui.technicalQuestions}
            </h3>
            <p className="text-text/80 mb-6">
              {t.ui.haveSpecificTechnicalRequirements}
            </p>
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105"
            >
              {t.ui.contactForTechnicalDetails}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
