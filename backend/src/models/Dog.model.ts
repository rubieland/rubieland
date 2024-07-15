import { Schema, model } from 'mongoose';
import { DogDocument, DogGender, DogSize } from './types/Dog.types';
import validator from 'validator';
import { getValidationErrorMessage } from '../utils/validation.utils';
import { formatName } from '../utils/string.utils';
import i18n from '../config/i18n';
import { DataContext, Reason } from '../validation/types/validation.types';
import {
  checkDogGender,
  checkDogSize,
  dogDataLengths,
  dogMixMax,
} from '../validation/Dog.validators';
import { forbiddenCharsRegex, nameRegex } from '../validation/Common.validator';
import User from './User.model';

const context: DataContext = DataContext.DOG;

/**
 * TODO:
 * add validate for birthDate, picture
 * add calculateAge method and age virtual property
 * add pre save and call formatName utils
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
      // TODO: check isDate() from validator
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
    size: {
      type: String,
      trim: true,
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
      min: [
        dogMixMax.weight.min,
        getValidationErrorMessage({
          context,
          field: 'weight',
          min: dogMixMax.weight.min,
          reason: Reason.MIN,
        }),
      ],
      max: [
        dogMixMax.weight.max,
        getValidationErrorMessage({
          context,
          field: 'weight',
          max: dogMixMax.weight.max,
          reason: Reason.MAX,
        }),
      ],
      validate: [
        (v: number) => !isNaN(v),
        getValidationErrorMessage({
          context,
          field: 'weight',
          reason: Reason.IS_NAN,
        }),
      ],
    },
    picture: {
      type: String,
      trim: true,
      default: null,
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

const Dog = model('Dog', dogSchema);

export default Dog;
