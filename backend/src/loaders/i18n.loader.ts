import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';
import path from 'path';

export const initI18n = () =>
  new Promise<void>((resolve, reject) => {
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .init(
        {
          lng: 'fr',
          fallbackLng: 'en',
          backend: {
            loadPath: path.join(__dirname, '../locales/{{lng}}/{{lng}}.json'),
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
