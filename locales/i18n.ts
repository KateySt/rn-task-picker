import i18n from 'i18next';
import * as Localization from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import it from './it.json';

export async function changeLanguage(lang: string) {
  await i18n.changeLanguage(lang);
}

export function strings(key: string, options?: any): string {
  const res = i18n.t(key, options);
  return typeof res === 'string' ? res : '';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
  },
  lng: Localization.locale?.substring(0, 2) || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
