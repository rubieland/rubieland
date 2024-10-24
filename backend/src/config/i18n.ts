import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';
import path from 'path';

const defaultLanguage = 'fr';
const languages = ['fr', 'en'];

(async () => {
  try {
    await i18n
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
            console.error(`i18next initialization failed: ${error}`);
            process.exit(1);
          } else {
            console.log('i18next initialized successfully!');
          }
        },
      );
  } catch (error) {
    console.error('Error initializing i18next:', error);
    process.exit(1);
  }
})();

export default i18n;
