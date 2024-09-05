import i18n from '../config/i18n';
import { handle as i18nextMiddleware } from 'i18next-express-middleware';
import cors from 'cors';
import path from 'path';
import express, { Express } from 'express';
import authRouter from '../routers/public/auth.router';
import blogRouter from '../routers/public/blog.router';
import profileRouter from '../routers/secured/user/profile.router';
import prestationsRouter from '../routers/public/prestations.router';
import backOfficeRouter from '../routers/secured/admin/backOffice.router';
import { fileURLToPath } from 'url';
import { env } from './env.loader';
import {
  errorHandler,
  notFoundHandler,
} from '../middlewares/errorHandlers/errorHandlers.middleware';
import session from 'express-session';

// destructure env to get env variables
const { CLIENT_HOST, CLIENT_PORT, SESSION_SECRET, COOKIE_MAX_AGE } = env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadExpress = async ({ server }: { server: Express }) => {
  try {
    // middlewares
    server.use(
      session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          httpOnly: true,
          maxAge: Number(COOKIE_MAX_AGE), // 1h
        },
      }),
    );
    server.use(i18nextMiddleware(i18n));
    server.use(express.static(path.join(__dirname, '../..', 'public')));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(
      cors({
        origin: `http://${CLIENT_HOST ?? 'localhost'}:${CLIENT_PORT ?? 5173}`,
        credentials: true,
      }),
    );

    // routers
    server.use('/auth', authRouter);
    server.use('/profile', profileRouter);
    server.use('/back-office', backOfficeRouter);
    server.use('/blog', blogRouter);
    server.use('/about', prestationsRouter);

    // error handlers
    server.use(notFoundHandler);
    server.use(errorHandler);
  } catch (error: unknown) {
    console.error(`An error occured when loading Express: ${error}`);
    process.exit(1);
  }
};
