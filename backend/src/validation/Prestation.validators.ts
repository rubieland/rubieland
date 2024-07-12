import { IPrestation, PrestationField } from '../models/types/Prestation.types';
import {
  checkMax,
  checkMaxLength,
  checkMin,
  checkMinLength,
  getValidationErrorMessage,
} from '../utils/validation.utils';
import {
  DataContext,
  DataLengths,
  DataMinMax,
  Reason,
} from './types/validation.types';
import validator from 'validator';

export const prestationDataLengths: DataLengths = {
  title: {
    minLength: 5,
    maxLength: 100,
  },
  description: {
    minLength: 20,
    maxLength: 10000,
  },
};

export const prestationMixMax: DataMinMax = {
  price: {
    min: 0,
    max: 10000,
  },
};

export const checkPrestationData = async (data: IPrestation) => {
  const errors: string[] = [];
  const context: DataContext = DataContext.PRESTATION;

  for (const [key, value] of Object.entries(data)) {
    if (key in prestationDataLengths) {
      const fieldKey = key as PrestationField;

      // check maxLengths
      if (!checkMaxLength(value, prestationDataLengths[fieldKey].maxLength)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            maxLength: prestationDataLengths[fieldKey].maxLength,
            reason: Reason.MAXLENGTH,
          }),
        );
      }

      // check minLengths
      if (!checkMinLength(value, prestationDataLengths[fieldKey].minLength)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            minLength: prestationDataLengths[fieldKey].minLength,
            reason: Reason.MINLENGTH,
          }),
        );
      }
    }
  }
  // check price
  if ('price' in data && data.price != null) {
    if (!validator.isNumeric(String(data.price))) {
      errors.push(
        getValidationErrorMessage({
          context,
          field: 'price',
          rule: 'priceNotNumeric',
          reason: Reason.INVALID,
        }),
      );
    } else {
      // check max price
      if (!checkMax(data.price, prestationMixMax.price.max)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: 'price',
            max: prestationMixMax.price.max,
            reason: Reason.MAX,
          }),
        );
      }
      // check min price
      if (!checkMin(data.price, prestationMixMax.price.min)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: 'price',
            min: prestationMixMax.price.min,
            reason: Reason.MIN,
          }),
        );
      }
    }
  }
  return errors;
};
