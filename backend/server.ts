import { initI18next } from './src/config/i18next';
import express from 'express';
import * as dotenv from 'dotenv';
import { loadExpress } from './src/loaders/express.loader';
import { connectToDatabase } from './src/loaders/db.loader';

dotenv.config();

const { APP_HOST, APP_PORT } = process.env;
const server = express();

const startServer = async () => {
  try {
    // load translation files
    await initI18next();

    // connect to database
    await connectToDatabase();

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
