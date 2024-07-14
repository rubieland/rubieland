import {
  BlogArticleData,
  BlogArticleField,
} from '../models/types/BlogArticle.types';
import {
  checkMaxLength,
  checkMinLength,
  getValidationErrorMessage,
  hasForbiddenChars,
} from '../utils/validation.utils';
import { DataContext, DataLengths, Reason } from './types/validation.types';

export const blogArticleDataLengths: DataLengths = {
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

export const checkBlogArticleData = async (
  data: Omit<BlogArticleData, 'picture'>,
) => {
  const errors: string[] = [];
  const context: DataContext = DataContext.BLOG_ARTICLE;

  for (const [key, value] of Object.entries(data)) {
    if (key in blogArticleDataLengths) {
      const fieldKey = key as BlogArticleField;

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
      if (!checkMaxLength(value, blogArticleDataLengths[fieldKey].maxLength)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            maxLength: blogArticleDataLengths[fieldKey].maxLength,
            reason: Reason.MAXLENGTH,
          }),
        );
      }

      // check minLengths
      if (!checkMinLength(value, blogArticleDataLengths[fieldKey].minLength)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            minLength: blogArticleDataLengths[fieldKey].minLength,
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
