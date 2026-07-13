import { Mail, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const QuickContact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-2xl p-5 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-wider text-accent font-semibold">
                {t.ui.quickContact}
              </p>
              <p className="text-text/85 mt-1">
                {t.ui.quickContactDescription}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${t.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-200"
                aria-label={t.ui.a11y.sendEmail}
              >
                <Mail size={16} />
                <span>Email</span>
              </a>

              <a
                href={t.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-accent/20 transition-all duration-200"
                aria-label={t.ui.a11y.visitInstagram}
              >
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
