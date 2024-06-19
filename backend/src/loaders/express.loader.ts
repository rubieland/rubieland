import i18n from './i18n.loader';
import { handle as i18nextMiddleware } from 'i18next-express-middleware';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import authRouter from '../routers/auth.router';

dotenv.config();

const { CLIENT_HOST, CLIENT_PORT } = process.env;

export const loadExpress = async ({ server }: { server: Express }) => {
  try {
    // middlewares
    server.use(i18nextMiddleware(i18n));
    server.use(express.static(path.join(__dirname, 'public')));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(
      cors({
        origin: `http://${CLIENT_HOST ?? 'localhost'}:${CLIENT_PORT ?? 5173}`,
      }),
    );

    // routers
    server.use('/', authRouter);
  } catch (error) {
    console.error(error);
  }
};
