import {
  PrestationData,
  PrestationField,
} from '../models/types/Prestation.types';
import {
  checkMax,
  checkMaxLength,
  checkMin,
  checkMinLength,
  getValidationErrorMessage,
  hasForbiddenChars,
} from '../utils/validation.utils';
import {
  DataContext,
  StringDataLengths,
  NumberDataMinMax,
  Reason,
} from './types/validation.types';
import validator from 'validator';

export const prestationDataLengths: StringDataLengths = {
  title: {
    minLength: 5,
    maxLength: 100,
  },
  description: {
    minLength: 20,
    maxLength: 10000,
  },
};

export const prestationMixMax: NumberDataMinMax = {
  price: {
    min: 0,
    max: 10000,
  },
};

const checkIsAvailable = (isAvailable: string) => {
  return (
    typeof isAvailable === 'string' &&
    (isAvailable === 'true' || isAvailable === 'false')
  );
};

export const checkPrestationData = async (data: PrestationData) => {
  const errors: string[] = [];
  const context: DataContext = DataContext.PRESTATION;

  for (const [key, value] of Object.entries(data)) {
    if (key in prestationDataLengths) {
      const fieldKey = key as PrestationField;

      // check forbidden characters
      if (typeof value === 'string' && hasForbiddenChars(value)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            reason: Reason.HAS_FORBIDDEN_CHARS,
          }),
        );
      }

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
          reason: Reason.IS_NAN,
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

  if (!checkIsAvailable(data.isAvailable)) {
    errors.push(
      getValidationErrorMessage({
        context,
        field: 'isAvailable',
        rule: 'isAvailable',
        reason: Reason.INVALID,
      }),
    );
  }
  return errors;
};
