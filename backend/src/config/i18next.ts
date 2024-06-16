import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';
import path from 'path';

export const initI18next = () =>
  new Promise<void>((resolve, reject) => {
    i18next
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
        }
      );
  });

export const t = i18next.t.bind(i18next);
export default i18next;
