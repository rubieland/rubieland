import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../../types/Error';
import { env } from '../../loaders/env.loader';
import i18n from '../../config/i18n';

const { NODE_ENV } = env;

// handle not found errors and send error to the global errorHandler middleware
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404);
  const error = new Error(`${i18n.t('common.error.404')}: ${req.originalUrl}`);
  next(error);
};

// handle errors globally
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
) => {
  // log error message in console
  console.error(err);

  /**
   * check for invalid :id in routes
   * (e.g.: /users/:userId) => if :userId does not belong to a user in base, send error like 'This user does not exist'
   */
  if (
    err instanceof Error &&
    err?.name === 'CastError' &&
    err.message.includes('Cast to ObjectId failed')
  ) {
    let message = i18n.t('common.error.resourceDoesNotExist');
    if (err.message.includes('User')) {
      message = i18n.t('common.error.userDoesNotExist');
    }
    if (err.message.includes('Post')) {
      message = i18n.t('common.error.postDoesNotExist');
    }
    if (err.message.includes('Prestation')) {
      message = i18n.t('common.error.prestationDoesNotExist');
    }
    if (err.message.includes('Dog')) {
      message = i18n.t('common.error.dogDoesNotExist');
    }

    return res.status(404).json({ message });
  }

  // define status code to send back in response
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  /**
   * define error message to send back in response.
   * If status code is 404, just send the err.message
   * because notFoundHandler already sends an error message
   * to this middleware
   */
  const message =
    statusCode !== 404
      ? `${i18n.t(`common.error.${statusCode}`)}: ${err.message}`
      : err.message;

  /**
   *  define stack property which returns the error stack trace
   *  but we send this stack trace only in dev mode
   */
  const stack = NODE_ENV === 'production' ? '🥞' : err.stack;

  res.status(statusCode).json({
    message,
    stack,
  });
};
