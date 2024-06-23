import { Schema, model } from 'mongoose';
import { regexes } from './validators/validators';
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

const { JWT_SECRET, JWT_EXPIRATION } = env;

/**
 * TODO:
 * add validators for avatar (define accepted file formats, sizes...)
 * add pre('save') middleware to hash password, comparePasswords method, createJWT method
 */

const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: [true, getValidationErrorMessage('firstName', 'required')],
      trim: true,
      maxlength: 30,
      minlength: 2,
      validate: [
        (v: string) => regexes.nameField.test(v),
        getValidationErrorMessage('firstName', 'firstName'),
      ],
    },
    lastName: {
      type: String,
      required: [true, getValidationErrorMessage('lastName', 'required')],
      trim: true,
      maxlength: 30,
      minlength: 2,
      validate: [
        (v: string) => regexes.nameField.test(v),
        getValidationErrorMessage('lastName', 'lastName'),
      ],
    },
    email: {
      type: String,
      required: [true, getValidationErrorMessage('email', 'required')],
      trim: true,
      unique: true,
      lowercase: true,
      maxlength: 60,
      validate: [
        validator.isEmail,
        getValidationErrorMessage('email', 'email'),
      ],
    },
    password: {
      type: String,
      required: [true, getValidationErrorMessage('password', 'required')],
      trim: true,
      maxlength: 100,
      minlength: 8,
      validate: [
        (v: string) => regexes.password.test(v),
        getValidationErrorMessage('password', 'password'),
      ],
    },
    phone: {
      type: String,
      trim: true,
      minlength: 10,
      validate: [
        (v: string) => validatePhoneNumber(v),
        getValidationErrorMessage('phone', 'phone'),
      ],
    },
    avatar: {
      type: String,
      trim: true,
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
