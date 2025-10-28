import { motion } from 'framer-motion';
import { Download, FileText, Wifi, Volume2, Zap } from 'lucide-react';
import { siteConfig } from '../site.config';

export const Tech: React.FC = () => {
  const handleDownloadRider = () => {
    // TODO: Replace with actual rider PDF URL
    const link = document.createElement('a');
    link.href = siteConfig.content.tech.riderUrl;
    link.download = 'lumen-tech-rider.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            Tech Requirements
          </h2>
          <p className="text-xl text-text/80 max-w-3xl mx-auto">
            Professional setup requirements and technical specifications for optimal performance quality.
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
                Professional Setup
              </h3>
              <p className="text-text/90 leading-relaxed mb-6">
                {siteConfig.content.tech.description}
              </p>
              <button
                onClick={handleDownloadRider}
                className="inline-flex items-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105"
              >
                <Download size={20} className="mr-2" />
                Download Technical Rider
              </button>
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
                Equipment Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="glass p-3 rounded-lg">
                    <Volume2 size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text">Audio Equipment</h4>
                    <p className="text-text/80 text-sm">I am adaptable to any setup, just make sure it's good.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="glass p-3 rounded-lg">
                    <Zap size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text">Lighting Rig</h4>
                    <p className="text-text/80 text-sm">Custom LED setup</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="glass p-3 rounded-lg">
                    <Wifi size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text">Connectivity</h4>
                    <p className="text-text/80 text-sm">WiFi, Ethernet, USB-C connections</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="glass p-3 rounded-lg">
                    <FileText size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text">Documentation</h4>
                    <p className="text-text/80 text-sm">Complete technical specifications</p>
                  </div>
                </div>
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
              Setup Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="glass p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">2h</span>
                </div>
                <h4 className="font-semibold text-text mb-2">Setup Time</h4>
                <p className="text-text/80 text-sm">
                  Minimum 2 hours for sound check and equipment setup
                </p>
              </div>
              <div className="text-center">
                <div className="glass p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">24h</span>
                </div>
                <h4 className="font-semibold text-text mb-2">Advance Notice</h4>
                <p className="text-text/80 text-sm">
                  Technical requirements must be confirmed 24 hours prior
                </p>
              </div>
              <div className="text-center">
                <div className="glass p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">✓</span>
                </div>
                <h4 className="font-semibold text-text mb-2">Backup Plan</h4>
                <p className="text-text/80 text-sm">
                  Always have backup equipment and contingency plans
                </p>
              </div>
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
              Technical Questions?
            </h3>
            <p className="text-text/80 mb-6">
              Have specific technical requirements or questions about the setup? 
              Get in touch to discuss your venue's needs and requirements.
            </p>
            <button 
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105"
            >
              Contact for Technical Details
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
