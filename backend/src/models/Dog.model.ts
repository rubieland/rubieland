import { Schema, model } from 'mongoose';
import { DogDocument, DogGender, DogSize } from './types/Dog.types';
import validator from 'validator';
import { getValidationErrorMessage } from '../utils/validation.utils';
import { formatName } from '../utils/string.utils';
import i18n from '../config/i18n';
import { DataContext, Reason } from '../validation/types/validation.types';
import { checkDogGender, checkDogSize } from '../validation/Dog.validators';
import { forbiddenCharsRegex, nameRegex } from '../validation/Common.validator';

const context: DataContext = DataContext.DOG;

/**
 * TODO:
 * add validate for all properties
 * add min, max, minLength, maxLength validations
 * add calculateAge method and age virtual property
 */

const DogSchema = new Schema<DogDocument>(
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
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'name',
          reason: Reason.REQUIRED,
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
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'bio',
          reason: Reason.REQUIRED,
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
      // TODO: check isDate() from validator
    },
    breed: {
      type: String,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'breed',
          reason: Reason.REQUIRED,
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
    size: {
      type: String,
      enum: Object.values(DogSize),
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'size',
          reason: Reason.REQUIRED,
        }),
      ],
      validate: [
        (v: string) => !checkDogSize(v),
        getValidationErrorMessage({
          context,
          field: 'size',
          rule: 'size',
          reason: Reason.INVALID,
        }),
      ],
    },
    weight: {
      type: Number,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'weight',
          reason: Reason.REQUIRED,
        }),
      ],
    },
    picture: {
      type: String,
      default: null,
    },
    ownerId: {
      type: Schema.Types.ObjectId, // reference to a User Document
      ref: 'User',
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'ownerId',
          reason: Reason.REQUIRED,
        }),
      ],
    },
    isVaccinated: {
      type: Boolean,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'isVaccinated',
          reason: Reason.REQUIRED,
        }),
      ],
    },
    isNeutered: {
      type: Boolean,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'isNeutered',
          reason: Reason.REQUIRED,
        }),
      ],
    },
  },
  { timestamps: true },
);
