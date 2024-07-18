import { Schema, model } from 'mongoose';
import { DogDocument, DogGender } from './types/Dog.types';
import { getValidationErrorMessage } from '../utils/validation.utils';
import { formatName } from '../utils/string.utils';
import i18n from '../config/i18n';
import { DataContext, Reason } from '../validation/types/validation.types';
import {
  checkDogGender,
  dogAgeLimit,
  dogDataLengths,
  dogDateDataMinMax,
  dogNumberDataMinMax,
} from '../validation/Dog.validators';
import { forbiddenCharsRegex, nameRegex } from '../validation/Common.validator';
import User from './User.model';
import {
  calculateAge,
  isInFuture,
  isTooOld,
  checkDateFormat,
} from '../utils/date.utils';
import validator from 'validator';

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
        (v: string) => checkDogGender(v),
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
      min: [
        dogDateDataMinMax.birthDate.min,
        getValidationErrorMessage({
          context,
          field: 'birthDate',
          min: dogAgeLimit,
          reason: Reason.TOO_OLD,
        }),
      ],
      max: [
        dogDateDataMinMax.birthDate.max,
        getValidationErrorMessage({
          context,
          field: 'birthDate',
          reason: Reason.FUTURE_DATE,
        }),
      ],
      validate: [
        {
          validator: (v: Date) =>
            checkDateFormat(v.toISOString().split('T')[0]),
          message: getValidationErrorMessage({
            context,
            field: 'birthDate',
            rule: 'birthDateInvalidFormat',
            reason: Reason.INVALID_DATE_FORMAT,
          }),
        },
        {
          validator: (v: Date) =>
            validator.isDate(v.toISOString().split('T')[0]),
          message: getValidationErrorMessage({
            context,
            field: 'birthDate',
            rule: 'birthDateInvalidFormat',
            reason: Reason.INVALID_DATE_FORMAT,
          }),
        },
        {
          validator: (v: Date) =>
            !isInFuture(new Date(v.toISOString().split('T')[0])),
          message: getValidationErrorMessage({
            context,
            field: 'birthDate',
            reason: Reason.FUTURE_DATE,
          }),
        },
        {
          validator: (v: Date) =>
            !isTooOld(new Date(v.toISOString().split('T')[0]), dogAgeLimit),
          message: getValidationErrorMessage({
            context,
            field: 'birthDate',
            min: dogAgeLimit,
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
    age: {
      type: Number,
      min: [
        dogNumberDataMinMax.age.min,
        getValidationErrorMessage({
          context,
          field: 'age',
          min: dogNumberDataMinMax.age.min,
          reason: Reason.MIN,
        }),
      ],
      max: [
        dogNumberDataMinMax.age.max,
        getValidationErrorMessage({
          context,
          field: 'age',
          max: dogNumberDataMinMax.age.max,
          reason: Reason.MAX,
        }),
      ],
      validate: [
        (v: number) => isNaN(v),
        getValidationErrorMessage({
          context,
          field: 'age',
          reason: Reason.IS_NAN,
        }),
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
