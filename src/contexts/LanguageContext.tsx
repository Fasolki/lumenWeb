import React, { createContext, useContext } from 'react';
import { translations, Translations } from '../translations';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'lumen-language';

/** English is served at `/`, Spanish at `/es/`. */
export const pathForLanguage = (lang: Language): string => (lang === 'es' ? '/es/' : '/');

export const languageForPath = (pathname: string): Language =>
  pathname.startsWith('/es') ? 'es' : 'en';

const isLanguage = (value: string | null): value is Language =>
  value === 'en' || value === 'es';

/**
 * Each language is its own URL rather than a piece of client state, so that
 * search engines can index the Spanish site at all — with a toggle they only
 * ever see the default language.
 */
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  language: Language;
}> = ({ children, language }) => {
  const setLanguage = (next: Language) => {
    if (next === language) return;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing — the choice just won't be remembered.
    }
    window.location.assign(pathForLanguage(next));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Sends a first-time visitor with a Spanish browser to the Spanish site.
 * Only ever runs on `/`, only in the browser, and never overrides a choice the
 * visitor has already made. Crawlers don't run this, so both URLs stay
 * independently indexable.
 */
export const redirectToPreferredLanguage = () => {
  if (window.location.pathname !== '/') return;

  const saved = localStorage.getItem(STORAGE_KEY);
  const preferred: Language = isLanguage(saved)
    ? saved
    : navigator.language.toLowerCase().startsWith('es')
      ? 'es'
      : 'en';

  if (preferred === 'es') {
    window.location.replace(pathForLanguage('es'));
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
