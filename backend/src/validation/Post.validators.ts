import { PostData, PostField } from '../models/types/Post.types';
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
} from './types/validation.types';

export const postDataLengths: StringDataLengths = {
  title: {
    minLength: 5,
    maxLength: 100,
  },
  content: {
    minLength: 100,
    maxLength: 10000,
  },
};

const checkIsPublished = (isPublished: string) => {
  return (
    typeof isPublished === 'string' &&
    (isPublished === 'true' || isPublished === 'false')
  );
};

export const checkPostData = async (data: Omit<PostData, 'picture'>) => {
  const errors: string[] = [];
  const context: DataContext = DataContext.POST;

  for (const [key, value] of Object.entries(data)) {
    if (key in postDataLengths) {
      const fieldKey = key as PostField;

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
      if (!checkMaxLength(value, postDataLengths[fieldKey].maxLength)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            maxLength: postDataLengths[fieldKey].maxLength,
            reason: Reason.MAXLENGTH,
          }),
        );
      }

      // check minLengths
      if (!checkMinLength(value, postDataLengths[fieldKey].minLength)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            minLength: postDataLengths[fieldKey].minLength,
            reason: Reason.MINLENGTH,
          }),
        );
      }
    }
  }

  if (!checkIsPublished(data.isPublished)) {
    errors.push(
      getValidationErrorMessage({
        context,
        field: 'isPublished',
        rule: 'isPublished',
        reason: Reason.INVALID,
      }),
    );
  }
  return errors;
};
