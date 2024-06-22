import i18n from './i18n.loader';
import { handle as i18nextMiddleware } from 'i18next-express-middleware';
import cors from 'cors';
import path from 'path';
import express, { Express } from 'express';
import authRouter from '../routers/auth.router';
import { fileURLToPath } from 'url';
import { env } from './env.loader';
import {
  errorHandler,
  notFoundHandler,
} from '../middlewares/errorHandlers/errorHandlers.middleware';

// destructure env to get env variables
const { CLIENT_HOST, CLIENT_PORT } = env;

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const loadExpress = async ({ server }: { server: Express }) => {
  try {
    // middlewares
    server.use(i18nextMiddleware(i18n));
    server.use(express.static(path.join(__dirname, '../..', 'public')));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(
      cors({
        origin: `http://${CLIENT_HOST ?? 'localhost'}:${CLIENT_PORT ?? 5173}`,
      }),
    );

    // routers
    server.use('/', authRouter);

    // error handlers
    server.use(notFoundHandler);
    server.use(errorHandler);
  } catch (error) {
    console.error(error);
  }
};
