import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import authRouter from './src/routers/auth.router';

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

// define db uri depending on mode (dev or prod)
const MONGO_URI = NODE_ENV === 'development' ? DEV_DB_URI : PROD_DB_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI must be defined');
}

const init = async () => {
  const app = express();

  // middlewares
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: `http://${CLIENT_HOST ?? 'localhost'}:${CLIENT_PORT ?? 5173}`,
    })
  );

  app.use('/', authRouter);

  // start server
  app.listen(APP_PORT, () => {
    console.log(
      `Server is running on http://${APP_HOST ?? 'localhost'}:${
        APP_PORT ?? 9000
      }`
    );
  });
};

// connect to database
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connection to DB successful'))
  .then(init)
  .catch((err) => console.log(err));
