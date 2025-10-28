import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = t.nav.anchors.map((anchor: string) => anchor.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [t.nav.anchors]);

  const scrollToSection = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
                onClick={() => scrollToSection('#hero')}
                className="font-display text-2xl font-bold gradient-text focus-ring rounded-lg px-2 py-1"
              >
                LÜMEN
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {t.nav.labels.map((label: string, index: number) => {
                  const anchor = t.nav.anchors[index];
                  const sectionId = anchor.substring(1);
                  const isActive = activeSection === sectionId;
                  
                  return (
                    <button
                      key={label}
                      onClick={() => scrollToSection(anchor)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-ring ${
                        isActive
                          ? 'text-accent bg-accent/10'
                          : 'text-text hover:text-accent hover:bg-accent/5'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
                
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
                aria-label="Toggle menu"
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
              {t.nav.labels.map((label: string, index: number) => {
                const anchor = t.nav.anchors[index];
                const sectionId = anchor.substring(1);
                const isActive = activeSection === sectionId;
                
                return (
                  <button
                    key={label}
                    onClick={() => scrollToSection(anchor)}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 focus-ring ${
                      isActive
                        ? 'text-accent bg-accent/10'
                        : 'text-text hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              
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
