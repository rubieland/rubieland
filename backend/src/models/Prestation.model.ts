import { Schema, model } from 'mongoose';
import { PrestationDocument } from './types/Prestation.types';
import { getValidationErrorMessage } from '../utils/validation.utils';
import { DataContext, Reason } from '../validation/types/validation.types';
import {
  prestationDataLengths,
  prestationMixMax,
} from '../validation/Prestation.validators';
import { forbiddenCharsRegex } from '../validation/Common.validator';

const context: DataContext = DataContext.PRESTATION;
const prestationSchema = new Schema<PrestationDocument>(
  {
    title: {
      type: String,
      trim: true,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'title',
          reason: Reason.REQUIRED,
        }),
      ],
      maxlength: [
        prestationDataLengths.title.maxLength,
        getValidationErrorMessage({
          context,
          field: 'title',
          maxLength: prestationDataLengths.title.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        prestationDataLengths.title.minLength,
        getValidationErrorMessage({
          context,
          field: 'title',
          minLength: prestationDataLengths.title.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        (v: string) => !forbiddenCharsRegex.test(v),
        getValidationErrorMessage({
          context,
          field: 'title',
          reason: Reason.HAS_FORBIDDEN_CHARS,
        }),
      ],
    },
    description: {
      type: String,
      trim: true,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'description',
          reason: Reason.REQUIRED,
        }),
      ],
      maxlength: [
        prestationDataLengths.description.maxLength,
        getValidationErrorMessage({
          context,
          field: 'description',
          maxLength: prestationDataLengths.description.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        prestationDataLengths.description.minLength,
        getValidationErrorMessage({
          context,
          field: 'description',
          minLength: prestationDataLengths.description.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
      validate: [
        (v: string) => !forbiddenCharsRegex.test(v),
        getValidationErrorMessage({
          context,
          field: 'description',
          reason: Reason.HAS_FORBIDDEN_CHARS,
        }),
      ],
    },
    price: {
      type: Number,
      trim: true,
      required: [
        true,
        getValidationErrorMessage({
          context,
          field: 'price',
          reason: Reason.REQUIRED,
        }),
      ],
      max: [
        prestationMixMax.price.max,
        getValidationErrorMessage({
          context,
          field: 'price',
          max: prestationMixMax.price.max,
          reason: Reason.MAX,
        }),
      ],
      min: [
        prestationMixMax.price.min,
        getValidationErrorMessage({
          context,
          field: 'price',
          min: prestationMixMax.price.min,
          reason: Reason.MIN,
        }),
      ],
    },
  },
  { timestamps: true },
);

const Prestation = model('Prestation', prestationSchema);

export default Prestation;
