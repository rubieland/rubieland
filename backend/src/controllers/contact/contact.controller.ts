import { NextFunction, Request, Response } from 'express';
import { env } from '../../loaders/env.loader';
import nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_APP_PASSWORD, NODE_ENV } = env;

export const postContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /**
   * TODO: add data validation
   * TODO: add email template
   */

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: NODE_ENV === 'production',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      form: req.body?.email,
      to: EMAIL_USER,
      subject: `${req.body?.fullName} - ${req.body?.subject}`,
      text: req.body?.message,
    };

    const response = transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Internal server error',
          error: error.message,
        });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({
          message: 'Email sent successfully',
        });
      }
    });

    return response;
  } catch (error) {
    next(error);
  }
};
