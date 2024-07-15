import { Schema, model } from 'mongoose';
import { DogDocument, DogGender } from './types/Dog.types';
import { getValidationErrorMessage } from '../utils/validation.utils';
import { formatName } from '../utils/string.utils';
import i18n from '../config/i18n';
import { DataContext, Reason } from '../validation/types/validation.types';
import { checkDogGender, dogDataLengths } from '../validation/Dog.validators';
import { forbiddenCharsRegex, nameRegex } from '../validation/Common.validator';
import User from './User.model';
import {
  calculateAge,
  isNotInFuture,
  isNotTooOld,
  isValidDate,
} from '../utils/date.utils';

const context: DataContext = DataContext.DOG;

/**
 * TODO:
 * add validate for picture
 * add properties in compliance with information sheet
 *  => will need to separate general information and specific information (medical, behavior, feeding...)
 */

const dogSchema = new Schema<DogDocument>(
  {
    gender: {
      type: String,
      enum: Object.values(DogGender),
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'gender',
          reason: Reason.REQUIRED,
        }),
      ],
      validate: [
        (v: string) => !checkDogGender(v),
        getValidationErrorMessage({
          context,
          field: 'gender',
          rule: 'gender',
          reason: Reason.INVALID,
        }),
      ],
    },
    name: {
      type: String,
      trim: true,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'name',
          reason: Reason.REQUIRED,
        }),
      ],
      minlength: [
        dogDataLengths.name.minLength,
        getValidationErrorMessage({
          context,
          field: 'name',
          minLength: dogDataLengths.name.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      maxlength: [
        dogDataLengths.name.maxLength,
        getValidationErrorMessage({
          context,
          field: 'name',
          maxLength: dogDataLengths.name.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      validate: [
        (v: string) => nameRegex.test(v),
        getValidationErrorMessage({
          context,
          field: 'name',
          rule: 'name',
          reason: Reason.INVALID,
        }),
      ],
    },
    bio: {
      type: String,
      trim: true,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'bio',
          reason: Reason.REQUIRED,
        }),
      ],
      minlength: [
        dogDataLengths.bio.minLength,
        getValidationErrorMessage({
          context,
          field: 'bio',
          minLength: dogDataLengths.bio.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      maxlength: [
        dogDataLengths.bio.maxLength,
        getValidationErrorMessage({
          context,
          field: 'bio',
          maxLength: dogDataLengths.bio.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      validate: [
        (v: string) => !forbiddenCharsRegex.test(v),
        getValidationErrorMessage({
          context,
          field: 'bio',
          reason: Reason.HAS_FORBIDDEN_CHARS,
        }),
      ],
    },
    birthDate: {
      type: Date,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'birthDate',
          reason: Reason.REQUIRED,
        }),
      ],
      validate: [
        {
          // check if birthDate is a valid date
          validator: isValidDate,
          message: getValidationErrorMessage({
            context,
            field: 'birthDate',
            reason: Reason.INVALID_DATE_FORMAT,
          }),
        },
        {
          // check that birthDate is not in the future
          validator: isNotInFuture,
          message: getValidationErrorMessage({
            context,
            field: 'birthDate',
            reason: Reason.FUTURE_DATE,
          }),
        },
        {
          // check that birthDate is not too old (25 years ago)
          validator: (v: Date) => {
            return isNotTooOld(v, 25);
          },
          message: getValidationErrorMessage({
            context,
            field: 'birthDate',
            reason: Reason.TOO_OLD,
          }),
        },
      ],
    },
    breed: {
      type: String,
      trim: true,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'breed',
          reason: Reason.REQUIRED,
        }),
      ],
      minlength: [
        dogDataLengths.breed.minLength,
        getValidationErrorMessage({
          context,
          field: 'breed',
          minLength: dogDataLengths.breed.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      maxlength: [
        dogDataLengths.breed.maxLength,
        getValidationErrorMessage({
          context,
          field: 'breed',
          maxLength: dogDataLengths.breed.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      validate: [
        (v: string) => !forbiddenCharsRegex.test(v),
        getValidationErrorMessage({
          context,
          field: 'breed',
          reason: Reason.HAS_FORBIDDEN_CHARS,
        }),
      ],
    },
    picture: {
      type: String,
      trim: true,
      default: null,
      // TODO: add validate
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // reference to a User Document
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'ownerId',
          reason: Reason.REQUIRED,
        }),
      ],
      validate: [
        async function (v: Schema.Types.ObjectId) {
          const user = await User.findById(v);
          return !!user;
        },
        i18n.t('common.error.userDoesNotExist'),
      ],
    },
  },
  { timestamps: true },
);

dogSchema.pre(
  'save',
  async function (this: DogDocument, next: (err?: Error) => void) {
    try {
      // format dog's name
      if (this.isModified('name')) {
        this.name = formatName(this.name);
      }
      // calculate dog's age
      if (this.isModified('birthDate')) {
        this.age = calculateAge(this.birthDate);
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

const Dog = model('Dog', dogSchema);

export default Dog;
