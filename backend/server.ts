import { initI18n } from './src/loaders/i18n.loader';
import express from 'express';
import { loadExpress } from './src/loaders/express.loader';
import { loadDatabaseConnection } from './src/loaders/db.loader';
import { env } from './src/loaders/env.loader';

// destructure env to get env variables
const { APP_PORT, APP_HOST } = env;

const server = express();

const startServer = async () => {
  try {
    // initialize i18n
    await initI18n();

    // connect to database
    await loadDatabaseConnection();

    // load express
    await loadExpress({ server });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  // start server
  server
    .listen(APP_PORT, () => {
      const link = `http://${APP_HOST ?? 'localhost'}:${APP_PORT ?? 9000}`;
      console.log(`Server is running on ${link}`);
    })
    .on('error', (error) => {
      console.error(error);
      process.exit(1);
    });
};

startServer();
