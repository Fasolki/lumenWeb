import { useState, useEffect, useMemo } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollToSection } from '../utils/scroll';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [renderedSections, setRenderedSections] = useState<string[]>([]);
  const { language, setLanguage, t } = useLanguage();

  // Sections can render nothing (Gigs hides itself when there are no dates),
  // so only link to the ones actually on the page.
  useEffect(() => {
    setRenderedSections(
      Array.from(document.querySelectorAll('section[id]')).map((section) => section.id)
    );
  }, []);

  const links = useMemo(
    () =>
      t.nav.labels
        .map((label: string, index: number) => ({
          label,
          anchor: t.nav.anchors[index],
          sectionId: t.nav.anchors[index].substring(1),
        }))
        .filter(({ sectionId }) => renderedSections.includes(sectionId)),
    [t.nav.labels, t.nav.anchors, renderedSections]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const { sectionId } of links) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  const handleNavClick = (anchor: string) => {
    scrollToSection(anchor);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="glass backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavClick('#hero')}
                className="font-display text-2xl font-bold gradient-text focus-ring rounded-lg px-2 py-1"
              >
                LÜMEN
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map(({ label, anchor, sectionId }) => (
                  <button
                    key={anchor}
                    onClick={() => handleNavClick(anchor)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-ring ${
                      activeSection === sectionId
                        ? 'text-accent bg-accent/10'
                        : 'text-text hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    {label}
                  </button>
                ))}

                {/* Language Toggle */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-ring text-text hover:text-accent hover:bg-accent/5"
                  title={t.ui.languageToggle}
                >
                  <Globe size={16} />
                  <span>{language.toUpperCase()}</span>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text hover:text-accent focus-ring rounded-md p-2"
                aria-label={t.ui.a11y.toggleMenu}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface/95 backdrop-blur-md">
              {links.map(({ label, anchor, sectionId }) => (
                <button
                  key={anchor}
                  onClick={() => handleNavClick(anchor)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 focus-ring ${
                    activeSection === sectionId
                      ? 'text-accent bg-accent/10'
                      : 'text-text hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {label}
                </button>
              ))}

              {/* Mobile Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 focus-ring text-text hover:text-accent hover:bg-accent/5"
              >
                <Globe size={20} />
                <span>{t.ui.languageToggle}: {language.toUpperCase()}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
