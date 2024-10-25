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
import contactRouter from '../routers/public/contact.router';
import { env } from './env.loader';
import {
  errorHandler,
  notFoundHandler,
} from '../middlewares/errorHandlers/errorHandlers.middleware';
import cookieParser from 'cookie-parser';

// destructure env to get env variables
const { CLIENT_URL, UPLOADS_DIR } = env;

export const loadExpress = async ({ server }: { server: Express }) => {
  try {
    // configure pug as view engine
    server.set('view engine', 'pug');
    server.set('views', path.join(__dirname, '../views'));

    // middlewares
    server.use(i18nextMiddleware(i18n));
    server.use(
      '/uploads',
      express.static(path.resolve(UPLOADS_DIR ?? 'uploads')),
    );
    server.use(cookieParser());
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(
      cors({
        origin: CLIENT_URL,
        credentials: true,
      }),
    );

    // routers
    server.get('/', (req, res) => {
      res.status(200).json({ message: 'Hello World' });
    });
    server.use('/auth', authRouter);
    server.use('/profile', profileRouter);
    server.use('/back-office', backOfficeRouter);
    server.use('/blog', blogRouter);
    server.use('/about', prestationsRouter);
    server.use('/contact', contactRouter);

    // error handlers
    server.use(notFoundHandler);
    server.use(errorHandler);
  } catch (error: unknown) {
    console.error(`An error occured when loading Express: ${error}`);
    process.exit(1);
  }
};
