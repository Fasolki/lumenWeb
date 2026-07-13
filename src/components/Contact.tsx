import { motion } from 'framer-motion';
import { Mail, MessageCircle, Youtube, Instagram, Music } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BookingForm } from './BookingForm';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  const handleEmailClick = () => {
    window.location.href = `mailto:${t.contact.email}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${t.contact.whatsapp.replace(/\D/g, '')}`, '_blank');
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

        {/* Booking form — the primary way to get in touch */}
        <div id="booking-form" className="mb-16 scroll-mt-24">
          <BookingForm />
        </div>

        {/* Direct channels, for anyone who'd rather not use the form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            id="contact-email"
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
                {t.ui.emailDescription}
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
            transition={{ duration: 0.6, delay: 0.3 }}
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
                {t.ui.whatsappDescription}
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
            <a
              href={t.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring group"
              aria-label={t.ui.a11y.visitYouTube}
            >
              <Youtube size={24} className="text-accent group-hover:scale-110 transition-transform duration-200" />
            </a>

            <a
              href={t.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring group"
              aria-label={t.ui.a11y.visitInstagram}
            >
              <Instagram size={24} className="text-accent group-hover:scale-110 transition-transform duration-200" />
            </a>

            {/* Spotify - not live yet */}
            <button
              className="glass p-4 rounded-full opacity-50 cursor-not-allowed"
              aria-label={t.ui.spotifyComingSoon}
              title={t.ui.spotifyComingSoon}
              disabled
            >
              <Music size={24} className="text-text/50" />
            </button>
          </div>
          <p className="text-text/60 text-sm mt-4">
            {t.ui.spotifyComingSoon}
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
            {t.ui.bookingInformation}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-text mb-3">{t.ui.whatToExpect}</h4>
              <ul className="space-y-2 text-text/80">
                {t.ui.whatToExpectItems.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-3">{t.ui.responseTime}</h4>
              <ul className="space-y-2 text-text/80">
                {t.ui.responseTimeItems.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
