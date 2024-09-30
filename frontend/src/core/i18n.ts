import LanguageDetector from 'i18next-browser-languagedetector';
import {
  format as formatDate,
  formatDistance,
  formatRelative,
  isDate,
} from 'date-fns';
import { enGB, fr as french } from 'date-fns/locale';
import en from '../assets/translation/en/en.json';
import fr from '../assets/translation/fr/fr.json';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import i18n from 'i18next';

export type SupportedLanguages = keyof typeof locales;

const supportedFormats = [
  'shortest',
  'short',
  'medium',
  'long',
  'relative',
  'ago',
];

const defaultLanguage: SupportedLanguages = 'fr';
const languages: SupportedLanguages[] = ['fr', 'en'];
const locales = { en: enGB, fr: french };
export const defaultNS = 'translation';
export const resources = {
  fr: {
    translation: fr,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS,
    fallbackLng: defaultLanguage,
    supportedLngs: languages,
    lng: defaultLanguage,
    saveMissing: true,
    returnNull: false,
    debug: false,
    resources,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // react escapes by default so we can set it to false

      // we use date-fns lib combined with i18n to format dates depending on locales and supported languages
      format: (value, format = 'P', lng = defaultLanguage) => {
        // handle invalid date
        if (!isDate(value) || isNaN(value.getTime())) {
          console.warn('Invalid date passed to i18n format function');
          return 'Invalid date';
        }

        // handle supported languages and locales
        const locale = locales[lng as SupportedLanguages];
        if (!locale) {
          console.warn(`Locale for language '${lng}' not found`);

          // return a default format if locale not found
          return formatDate(value, 'P');
        }

        // handle unknown formats
        if (!supportedFormats.includes(format)) {
          console.warn(`Unknown format '${format}', using default format 'P'`);
          return formatDate(value, 'P', { locale });
        }

        // handle format
        switch (format) {
          case 'shortest':
            return formatDate(value, 'P', { locale });
          case 'short':
            return formatDate(value, 'PP', { locale });
          case 'medium':
            return formatDate(value, 'PPP', { locale });
          case 'long':
            return formatDate(value, 'PPPP', { locale });
          case 'relative':
            return formatRelative(value, new Date(), { locale });
          case 'ago':
            return formatDistance(value, new Date(), {
              locale,
              addSuffix: true,
            });
          default:
            // default format
            return formatDate(value, format, { locale });
        }
      },
    },
  });

export default i18n;
