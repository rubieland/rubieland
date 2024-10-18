import { Schema, Types, model } from 'mongoose';
import {
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
import i18n from '../config/i18n';
import { DataContext, Reason } from '../validation/types/validation.types';
import { nameRegex } from '../validation/Common.validator';

const context: DataContext = DataContext.USER;

/**
 * TODO:
 * add dogsIds validate
 * add Address
 * REFACTOR: Separate user personal information and user account information
 */

const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'firstName',
          reason: Reason.REQUIRED,
        }),
      ],
      trim: true,
      maxlength: [
        userDataLengths.firstName.maxLength,
        getValidationErrorMessage({
          context,
          field: 'firstName',
          maxLength: userDataLengths.firstName.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        userDataLengths.firstName.minLength,
        getValidationErrorMessage({
          context,
          field: 'firstName',
          minLength: userDataLengths.firstName.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        (v: string) => nameRegex.test(v),
        getValidationErrorMessage({
          context,
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
          context,
          field: 'lastName',
          reason: Reason.REQUIRED,
        }),
      ],
      trim: true,
      maxlength: [
        userDataLengths.lastName.maxLength,
        getValidationErrorMessage({
          context,
          field: 'lastName',
          maxLength: userDataLengths.lastName.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        userDataLengths.lastName.minLength,
        getValidationErrorMessage({
          context,
          field: 'lastName',
          minLength: userDataLengths.lastName.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        (v: string) => nameRegex.test(v),
        getValidationErrorMessage({
          context,
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
          context,
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
          context,
          field: 'email',
          maxLength: userDataLengths.email.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        userDataLengths.email.minLength,
        getValidationErrorMessage({
          context,
          field: 'email',
          minLength: userDataLengths.email.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        validator.isEmail,
        getValidationErrorMessage({
          context,
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
          context,
          field: 'password',
          reason: Reason.REQUIRED,
        }),
      ],
      trim: true,
      maxlength: [
        userDataLengths.password.maxLength,
        getValidationErrorMessage({
          context,
          field: 'password',
          maxLength: userDataLengths.password.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        userDataLengths.password.minLength,
        getValidationErrorMessage({
          context,
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
          context,
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
          context,
          field: 'phone',
          minLength: userDataLengths.phone.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        (v: string) => validatePhoneNumber(v),
        getValidationErrorMessage({
          context,
          field: 'phone',
          rule: 'phone',
          reason: Reason.INVALID,
        }),
      ],
    },
    avatar: {
      type: String,
      trim: true,
      default: null,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    dogsIds: {
      type: [Types.ObjectId],
      ref: 'Dog', // ref to a Dog document
      default: [],
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

const User = model('User', userSchema);

export default User;
