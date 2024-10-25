import { NextFunction, Request, Response } from 'express';
import { env } from '../../loaders/env.loader';
import nodemailer from 'nodemailer';
import path from 'path';
import pug from 'pug';
import {
  checkContactData,
  ContactMessageBody,
} from '../../validation/Contact.validators';
import {
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
import { DataContext } from '../../validation/types/validation.types';
import i18n from '../../config/i18n';
import { trimData } from '../../utils/string.utils';

const { EMAIL_USER, EMAIL_APP_PASSWORD, NODE_ENV } = env;

const context = DataContext.CONTACT;

export const postContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // TODO: improve mail templates

  try {
    const { fullName, email, subject, message } = trimData(req.body);

    const contactData: ContactMessageBody = {
      fullName,
      email,
      subject,
      message,
    };

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields(contactData);

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      const errors = getMissingOrEmptyFieldsErrorMessage(
        context,
        missingOrEmptyFields,
      );

      return res.status(400).json({
        message: i18n.t('contact.error.messageNotSent'),
        errors,
      });
    }

    // data validation
    const contactDataErrors = checkContactData(contactData);

    if (contactDataErrors && contactDataErrors.length > 0) {
      return res.status(400).json({
        message: i18n.t('contact.error.messageNotSent'),
        errors: contactDataErrors,
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: NODE_ENV === 'production',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    // paths to the email templates
    const confirmationTemplatePath = path.join(
      __dirname,
      '../../views/emails/userConfirmation.pug',
    );
    const notificationTemplatePath = path.join(
      __dirname,
      '../../views/emails/adminNotification.pug',
    );

    // render the email confirmation template to the user
    const confirmationHtml = pug.renderFile(confirmationTemplatePath, {
      fullName,
      subject,
      message,
    });

    // render the email notification template to the admin
    const notificationHtml = pug.renderFile(notificationTemplatePath, {
      fullName,
      email,
      subject,
      message,
    });

    // options for the user confirmation email
    const confirmationMailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: i18n.t('contact.email.confirmationSubject'),
      html: confirmationHtml,
    };

    // options for the admin notification email
    const notificationMailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      replyTo: email,
      subject: i18n.t('contact.email.notificationSubject', { fullName }),
      html: notificationHtml,
    };

    // send confirmation email to the user
    transporter.sendMail(confirmationMailOptions, (error, info) => {
      if (error) {
        console.error(
          i18n.t('contact.error.confirmationEmailFailed', {
            errorMessage: error.message,
          }),
        );
        return res.status(500).json({
          message: i18n.t('contact.error.confirmationEmailFailed', {
            errorMessage: error.message,
          }),
        });
      } else {
        console.log(
          i18n.t('contact.success.confirmationEmailSent', {
            infoResponse: info.response,
          }),
        );
      }
    });

    // send notification email to the admin
    transporter.sendMail(notificationMailOptions, (error, info) => {
      if (error) {
        console.error(
          i18n.t('contact.error.notificationEmailFailed', {
            errorMessage: error.message,
          }),
        );
        return res.status(500).json({
          message: i18n.t('contact.error.notificationEmailFailed', {
            errorMessage: error.message,
          }),
        });
      } else {
        console.log(
          i18n.t('contact.success.notificationEmailSent', {
            infoResponse: info.response,
          }),
        );
      }
    });

    return res.status(200).json({
      message: i18n.t('contact.success.messageSent'),
    });
  } catch (error) {
    next(error);
  }
};
