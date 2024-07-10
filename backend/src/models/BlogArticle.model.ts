import { Schema, model } from 'mongoose';
import { BlogArticleDocument } from './types/BlogArticle.types';
import { getValidationErrorMessage } from '../utils/validation.utils';
import { Reason } from '../validation/types/validation.types';
import { blogArticleDataLengths } from '../validation/BlogArticle.validators';

const blogArticleSchema = new Schema<BlogArticleDocument>(
  {
    title: {
      type: String,
      trim: true,
      required: [
        true,
        getValidationErrorMessage({
          field: 'blogArticleTitle',
          reason: Reason.REQUIRED,
        }),
      ],
      maxlength: [
        blogArticleDataLengths.title.maxLength,
        getValidationErrorMessage({
          field: 'blogArticleTitle',
          maxLength: blogArticleDataLengths.title.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        blogArticleDataLengths.title.minLength,
        getValidationErrorMessage({
          field: 'blogArticleTitle',
          minLength: blogArticleDataLengths.title.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
    },
    content: {
      type: String,
      trim: true,
      required: [
        true,
        getValidationErrorMessage({
          field: 'blogArticleContent',
          reason: Reason.REQUIRED,
        }),
      ],
      maxlength: [
        blogArticleDataLengths.content.maxLength,
        getValidationErrorMessage({
          field: 'blogArticleContent',
          maxLength: blogArticleDataLengths.content.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        blogArticleDataLengths.content.minLength,
        getValidationErrorMessage({
          field: 'blogArticleContent',
          minLength: blogArticleDataLengths.content.minLength,
          reason: Reason.MINLENGTH,
        }),
      ],
    },
    isPublished: {
      type: Boolean,
      required: [
        true,
        getValidationErrorMessage({
          field: 'isPublished',
          reason: Reason.REQUIRED,
        }),
      ],
      default: true,
    },
    picture: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true },
);

const BlogArticle = model('BlogArticle', blogArticleSchema);

export default BlogArticle;
