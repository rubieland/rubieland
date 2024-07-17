import { DogData, DogField, DogGender } from '../models/types/Dog.types';
import { calculatePastDate } from '../utils/date.utils';
import {
  checkMaxLength,
  checkMinLength,
  getValidationErrorMessage,
  hasForbiddenChars,
} from '../utils/validation.utils';
import {
  DataContext,
  StringDataLengths,
  Reason,
  DateDataMinMax,
} from './types/validation.types';

export const dogAgeLimit = 25;
export const currentDate = new Date();

export const dogDataLengths: StringDataLengths = {
  name: {
    minLength: 2,
    maxLength: 30,
  },
  bio: {
    minLength: 20,
    maxLength: 5000,
  },
  breed: {
    minLength: 2,
    maxLength: 50,
  },
};

export const dogDateDataMinMax: DateDataMinMax = {
  birthDate: {
    min: calculatePastDate(dogAgeLimit),
    max: new Date(),
  },
};

export const checkDogGender = (gender: string) => {
  return Object.values(DogGender).includes(gender as DogGender);
};

export const checkDogData = async (data: DogData) => {
  const errors: string[] = [];
  const context: DataContext = DataContext.DOG;

  for (const [key, value] of Object.entries(data)) {
    // check forbidden characters
    if (hasForbiddenChars(value)) {
      errors.push(
        getValidationErrorMessage({
          context,
          field: key,
          reason: Reason.HAS_FORBIDDEN_CHARS,
        }),
      );
    }

    if (key in dogDataLengths) {
      const fieldKey = key as DogField;

      if (typeof value === 'string') {
        if (fieldKey === 'bio' || fieldKey === 'name') {
          // check maxLengths
          if (!checkMaxLength(value, dogDataLengths[fieldKey].maxLength)) {
            errors.push(
              getValidationErrorMessage({
                context,
                field: fieldKey,
                maxLength: dogDataLengths[fieldKey].maxLength,
                reason: Reason.MAXLENGTH,
              }),
            );
          }

          // check minLengths
          if (!checkMinLength(value, dogDataLengths[fieldKey].minLength)) {
            errors.push(
              getValidationErrorMessage({
                context,
                field: fieldKey,
                minLength: dogDataLengths[fieldKey].minLength,
                reason: Reason.MINLENGTH,
              }),
            );
          }
        }
      }
    }
  }

  // check dog gender
  if (!checkDogGender(data.gender)) {
    errors.push(
      getValidationErrorMessage({
        context,
        field: 'gender',
        rule: 'gender',
        reason: Reason.INVALID,
      }),
    );
  }

  // TODO: check birthDate

  return errors;
};
