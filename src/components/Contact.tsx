import { motion } from 'framer-motion';
import { Mail, MessageCircle, Youtube, Instagram, Music } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  const handleEmailClick = () => {
    window.location.href = `mailto:${t.contact.email}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${t.contact.whatsapp}`, '_blank');
  };

  const handleSocialClick = (url: string, isActive: boolean) => {
    if (isActive) {
      window.open(url, '_blank');
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            {t.ui.contactBooking}
          </h2>
          <p className="text-xl text-text/80 max-w-3xl mx-auto">
            {t.ui.readyToBringExperience}
          </p>
        </motion.div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={handleEmailClick}
              className="w-full glass p-8 rounded-2xl hover:bg-accent/10 transition-all duration-200 focus-ring group"
            >
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Mail size={32} className="text-accent group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-display text-2xl font-bold text-text">Email</h3>
              </div>
              <p className="text-text/80 mb-4">
                For bookings, collaborations, and general inquiries
              </p>
              <p className="text-accent font-semibold text-lg">
                {t.contact.email}
              </p>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={handleWhatsAppClick}
              className="w-full glass p-8 rounded-2xl hover:bg-accent/10 transition-all duration-200 focus-ring group"
            >
              <div className="flex items-center justify-center space-x-4 mb-4">
                <MessageCircle size={32} className="text-accent group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-display text-2xl font-bold text-text">WhatsApp</h3>
              </div>
              <p className="text-text/80 mb-4">
                Quick messages and urgent bookings
              </p>
              <p className="text-accent font-semibold text-lg">
                {t.contact.whatsapp}
              </p>
            </button>
          </motion.div>
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="font-display text-3xl font-bold text-text mb-8">
            {t.ui.followTheJourney}
          </h3>
          <div className="flex justify-center space-x-6">
            {/* YouTube - Active */}
            <button
              onClick={() => handleSocialClick(t.social.youtube, true)}
              className="glass p-4 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring group"
              aria-label="Visit YouTube channel"
            >
              <Youtube size={24} className="text-accent group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Instagram - Disabled */}
            <button
              onClick={() => handleSocialClick(t.social.instagram, false)}
              className="glass p-4 rounded-full opacity-50 cursor-not-allowed"
              aria-disabled="true"
              aria-label="Instagram coming soon"
              title="Coming soon"
              disabled
            >
              <Instagram size={24} className="text-text/50" />
            </button>

            {/* TikTok - Disabled */}
            <button
              onClick={() => handleSocialClick(t.social.tiktok, false)}
              className="glass p-4 rounded-full opacity-50 cursor-not-allowed"
              aria-disabled="true"
              aria-label="TikTok coming soon"
              title="Coming soon"
              disabled
            >
              <Music size={24} className="text-text/50" />
            </button>
          </div>
          <p className="text-text/60 text-sm mt-4">
            {t.ui.instagramTiktokComingSoon}
          </p>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass p-8 rounded-2xl text-center"
        >
          <h3 className="font-display text-2xl font-bold text-accent mb-6">
            Booking Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-text mb-3">What to Expect</h4>
              <ul className="space-y-2 text-text/80">
                <li>• Professional DJ setup</li>
                <li>• Custom lighting rig</li>
                <li>• Genre flexibility</li>
                <li>• Pre-event consultation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-3">Response Time</h4>
              <ul className="space-y-2 text-text/80">
                <li>• Email: Within 24 hours</li>
                <li>• WhatsApp: Within 2 hours</li>
                <li>• Urgent bookings: Same day</li>
                <li>• Weekend inquiries: Monday</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
