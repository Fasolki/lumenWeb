import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Translations } from '../translations';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const isLanguage = (value: string | null): value is Language =>
  value === 'en' || value === 'es';

// Saved preference wins; otherwise follow the browser so Spanish-speaking
// visitors land on the Spanish site without touching the toggle.
const getInitialLanguage = (): Language => {
  const saved = localStorage.getItem('lumen-language');
  if (isLanguage(saved)) {
    return saved;
  }
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    setLanguage(getInitialLanguage());
  }, []);

  useEffect(() => {
    localStorage.setItem('lumen-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
