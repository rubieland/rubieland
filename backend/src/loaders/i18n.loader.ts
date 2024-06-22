import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * DOCS: check i18next crash course for a good implementation
 * and use of the library features:
 *  https://www.youtube.com/watch?v=SA_9i4TtxLQ
 */

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const defaultLanguage = 'fr';
const languages = ['fr', 'en'];

export const initI18n = () =>
  new Promise<void>((resolve, reject) => {
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .init(
        {
          lng: defaultLanguage,
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          preload: languages,
          detection: {
            order: ['cookie', 'queryString', 'header'],
            caches: ['cookie'],
            lookupQuerystring: 'lang',
            lookupCookie: 'lang',
            lookupHeader: 'Accept-Language',
          },
          backend: {
            loadPath: path.join(
              __dirname,
              '..',
              'locales/{{lng}}/{{lng}}.json',
            ),
          },
        },
        (error) => {
          if (error) {
            console.error('Error initializing i18next:', error);
            reject(error);
          } else {
            console.log('i18next initialized successfully!');
            resolve();
          }
        },
      );
  });

export const t = i18n.t.bind(i18n);
export default i18n;
