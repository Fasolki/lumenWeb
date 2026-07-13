import { renderToString } from 'react-dom/server';
import App from './App';
import type { Language } from './contexts/LanguageContext';
import { translations } from './translations';

export const LANGUAGES: Language[] = ['en', 'es'];

export const seoFor = (language: Language) => translations[language].seo;

export const render = (language: Language): string =>
  renderToString(<App language={language} />);
