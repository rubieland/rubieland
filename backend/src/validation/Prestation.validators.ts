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

export const prestationDataLengths: DataLengths = {
  title: {
    minLength: 5,
    maxLength: 100,
  },
  description: {
    minLength: 100,
    maxLength: Infinity,
  },
};

export const prestationMixMax: DataMinMax = {
  price: {
    min: 0,
    max: Infinity,
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
            rule: fieldKey,
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
            rule: fieldKey,
            minLength: prestationDataLengths[fieldKey].minLength,
            reason: Reason.MINLENGTH,
          }),
        );
      }
    }

    if (key in prestationMixMax) {
      const fieldKey = key as PrestationField;

      // check max
      if (!checkMax(value, prestationMixMax[fieldKey].max)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            rule: fieldKey,
            max: prestationMixMax[fieldKey].max,
            reason: Reason.MAX,
          }),
        );
      }

      // check min
      if (!checkMin(value, prestationMixMax[fieldKey].min)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            rule: fieldKey,
            min: prestationMixMax[fieldKey].min,
            reason: Reason.MIN,
          }),
        );
      }
    }
  }
  return errors;
};
