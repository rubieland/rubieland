import { DataLengths } from './types/validation.types';

export const blogArticleDataLengths: DataLengths = {
  title: {
    minLength: 2,
    maxLength: 30,
  },
  content: {
    minLength: 2,
    maxLength: 30,
  },
};
