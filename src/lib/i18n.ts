// src/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { supportedLanguages } from './supportedLanguages';

// Generate supportedLngs dynamically from supportedLanguages array
const supportedLngs = supportedLanguages.map(lang => lang.code);

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs, // dynamic
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // translation files path
    },
  });

export default i18n;
