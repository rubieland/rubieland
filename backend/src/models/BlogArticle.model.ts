import { Schema, model } from 'mongoose';
import { BlogArticleDocument } from './types/BlogArticle.types';
import { getValidationErrorMessage } from '../utils/validation.utils';
import { DataContext, Reason } from '../validation/types/validation.types';
import { blogArticleDataLengths } from '../validation/BlogArticle.validators';

const context: DataContext = DataContext.BLOG_ARTICLE;

const blogArticleSchema = new Schema<BlogArticleDocument>(
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
        blogArticleDataLengths.title.maxLength,
        getValidationErrorMessage({
          context,
          field: 'title',
          maxLength: blogArticleDataLengths.title.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        blogArticleDataLengths.title.minLength,
        getValidationErrorMessage({
          context,
          field: 'title',
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
          context,
          field: 'content',
          reason: Reason.REQUIRED,
        }),
      ],
      maxlength: [
        blogArticleDataLengths.content.maxLength,
        getValidationErrorMessage({
          context,
          field: 'content',
          maxLength: blogArticleDataLengths.content.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        blogArticleDataLengths.content.minLength,
        getValidationErrorMessage({
          context,
          field: 'content',
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
          context,
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
