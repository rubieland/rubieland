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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultLanguage = 'fr';
const languages = ['fr', 'en'];

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
        loadPath: path.join(__dirname, '..', 'locales/{{lng}}/{{lng}}.json'),
      },
    },
    (error) => {
      if (error) {
        console.error(`i18next initialization failed: ${error}`);
        process.exit(1);
      } else {
        console.log('i18next initialized successfully!');
      }
    },
  );

export default i18n;
