import './src/config/i18n'; // initialize i18n
import express from 'express';
import { loadExpress } from './src/loaders/express.loader';
import { loadDatabaseConnection } from './src/loaders/db.loader';
import { env } from './src/loaders/env.loader';

// destructure env to get env variables
const { PORT } = env;

const server = express();

const startServer = async () => {
  try {
    // connect to database
    await loadDatabaseConnection();

    // load express
    await loadExpress({ server });

    // start server
    server
      .listen(PORT, () => {
        console.log(`Server is running on port ${PORT ?? '9000'}`);
      })
      .on('error', (error: Error) => {
        console.error(`An error occured when starting server: ${error}`);
        process.exit(1);
      });
  } catch (error: unknown) {
    console.error(`An error occured when initializing project: ${error}`);
    process.exit(1);
  }
};

startServer();
