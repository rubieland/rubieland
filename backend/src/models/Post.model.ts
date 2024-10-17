import { Schema, model } from 'mongoose';
import { PostDocument } from './types/Post.types';
import { getValidationErrorMessage } from '../utils/validation.utils';
import { DataContext, Reason } from '../validation/types/validation.types';
import { postDataLengths } from '../validation/Post.validators';
import { forbiddenCharsRegex } from '../validation/Common.validator';

const context: DataContext = DataContext.POST;

const postSchema = new Schema<PostDocument>(
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
        postDataLengths.title.maxLength,
        getValidationErrorMessage({
          context,
          field: 'title',
          maxLength: postDataLengths.title.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        postDataLengths.title.minLength,
        getValidationErrorMessage({
          context,
          field: 'title',
          minLength: postDataLengths.title.minLength,
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
        postDataLengths.content.maxLength,
        getValidationErrorMessage({
          context,
          field: 'content',
          maxLength: postDataLengths.content.maxLength,
          reason: Reason.MAXLENGTH,
        }),
      ],
      minlength: [
        postDataLengths.content.minLength,
        getValidationErrorMessage({
          context,
          field: 'content',
          minLength: postDataLengths.content.minLength,
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

const Post = model('Post', postSchema);

export default Post;
