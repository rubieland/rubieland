import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config();

const {
  APP_HOST,
  APP_PORT,
  CLIENT_HOST,
  CLIENT_PORT,
  NODE_ENV,
  DEV_DB_URI,
  PROD_DB_URI,
} = process.env;

const MONGO_URI = NODE_ENV === 'development' ? DEV_DB_URI : PROD_DB_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI must be defined');
}

const init = async () => {
  const app = express();

  // ============================= \\
  // ======== Middlewares ======== \\
  // ============================= \\

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: `http://${CLIENT_HOST ?? 'localhost'}:${CLIENT_PORT ?? 5173}`,
    })
  );

  app.listen(APP_PORT, () => {
    console.log(
      `Server is running on http://${APP_HOST ?? 'localhost'}:${
        APP_PORT ?? 9000
      }`
    );
  });
};

// Connection to database
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connection to DB successful'))
  .then(init)
  .catch((err) => console.log(err));
