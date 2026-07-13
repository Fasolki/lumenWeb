import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h3 className="font-display text-3xl font-bold gradient-text mb-4">
            DJ LÜMEN
          </h3>
          <p className="text-text/80 max-w-2xl mx-auto">
            {t.ui.footer.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
          <a
            href={`mailto:${t.contact.email}`}
            className="text-text/80 hover:text-accent transition-colors duration-200"
          >
            {t.contact.email}
          </a>
        </div>

        <div className="text-text/60 text-sm">
          <p>&copy; {new Date().getFullYear()} {t.ui.footer.rightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};
