import { Schema, model } from 'mongoose';
import {
  regexes,
  strongPasswordOptions,
  userDataLengths,
} from '../validation/User.validators';
import validator from 'validator';
import {
  getValidationErrorMessage,
  validatePhoneNumber,
} from '../utils/validation.utils';
import { UserDocument, UserRole } from './types/User.types';
import bcrypt from 'bcrypt';
import { formatName } from '../utils/string.utils';
import jwt from 'jsonwebtoken';
import { env } from '../loaders/env.loader';
import i18n from '../config/i18n';
import { Reason } from '../validation/types/validation.types';
import { fileURLToPath } from 'url';
import path from 'path';

const { JWT_SECRET, JWT_EXPIRATION } = env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultAvatar = path.join(
  __dirname,
  '..',
  'uploads/placeholders/user-default-avatar.jpg',
);

/**
 * TODO:
 * add validators for avatar (define accepted file formats, sizes...)
 * test validations
 */

const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: [
        true,
        getValidationErrorMessage({
          field: 'firstName',
          reason: Reason.REQUIRED,
        }),
      ],
      trim: true,
      maxlength: [
        userDataLengths.firstName.maxLength,
        getValidationErrorMessage({
          field: 'firstName',
          maxLength: userDataLengths.firstName.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        userDataLengths.firstName.minLength,
        getValidationErrorMessage({
          field: 'firstName',
          minLength: userDataLengths.firstName.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        (v: string) => regexes.nameField.test(v),
        getValidationErrorMessage({
          field: 'firstName',
          rule: 'firstName',
          reason: Reason.INVALID,
        }),
      ],
    },
    lastName: {
      type: String,
      required: [
        true,
        getValidationErrorMessage({
          field: 'lastName',
          reason: Reason.REQUIRED,
        }),
      ],
      trim: true,
      maxlength: [
        userDataLengths.lastName.maxLength,
        getValidationErrorMessage({
          field: 'lastName',
          maxLength: userDataLengths.lastName.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        userDataLengths.lastName.minLength,
        getValidationErrorMessage({
          field: 'lastName',
          minLength: userDataLengths.lastName.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        (v: string) => regexes.nameField.test(v),
        getValidationErrorMessage({
          field: 'lastName',
          rule: 'lastName',
          reason: Reason.INVALID,
        }),
      ],
    },
    email: {
      type: String,
      required: [
        true,
        getValidationErrorMessage({
          field: 'email',
          reason: Reason.REQUIRED,
        }),
      ],
      trim: true,
      unique: true,
      lowercase: true,
      maxlength: [
        userDataLengths.email.maxLength,
        getValidationErrorMessage({
          field: 'email',
          maxLength: userDataLengths.email.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        userDataLengths.email.minLength,
        getValidationErrorMessage({
          field: 'email',
          minLength: userDataLengths.email.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        validator.isEmail,
        getValidationErrorMessage({
          field: 'email',
          rule: 'email',
          reason: Reason.INVALID,
        }),
      ],
    },
    password: {
      type: String,
      required: [
        true,
        getValidationErrorMessage({
          field: 'password',
          reason: Reason.REQUIRED,
        }),
      ],
      trim: true,
      maxlength: [
        userDataLengths.password.maxLength,
        getValidationErrorMessage({
          field: 'password',
          maxLength: userDataLengths.password.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        userDataLengths.password.minLength,
        getValidationErrorMessage({
          field: 'password',
          minLength: userDataLengths.password.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        (v: string) =>
          validator.isStrongPassword(v, {
            ...strongPasswordOptions,
            returnScore: false,
          }),
        getValidationErrorMessage({
          field: 'password',
          rule: 'password',
          reason: Reason.INVALID,
        }),
      ],
    },
    phone: {
      type: String,
      trim: true,
      minlength: [
        userDataLengths.phone.minLength,
        getValidationErrorMessage({
          field: 'phone',
          minLength: userDataLengths.phone.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        (v: string) => validatePhoneNumber(v),
        getValidationErrorMessage({
          field: 'phone',
          rule: 'phone',
          reason: Reason.INVALID,
        }),
      ],
    },
    avatar: {
      type: String,
      trim: true,
      default: defaultAvatar,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  { timestamps: true },
);

userSchema.pre(
  'save',
  async function (this: UserDocument, next: (err?: Error) => void) {
    try {
      // check if the password is modified
      if (this.isModified('password')) {
        // hash the password only if it is modified
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
      }

      // format user firstName and lastName
      if (this.isModified('firstName')) {
        this.firstName = formatName(this.firstName);
      }

      if (this.isModified('lastName')) {
        this.lastName = formatName(this.lastName);
      }

      next();
    } catch (error: unknown) {
      next(
        error instanceof Error
          ? new Error(i18n.t('common.error.saveFailed'))
          : new Error(i18n.t('common.error.unknown')),
      );
    }
  },
);

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this as UserDocument;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error: unknown) {
    throw error instanceof Error
      ? new Error(i18n.t('auth.error.comparePasswordFailed'))
      : new Error(i18n.t('common.error.unknown'));
  }
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION },
  );
};

const User = model('User', userSchema);

export default User;
