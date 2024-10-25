import path from 'path';
import createUploaderMiddleware from './createUploaderMiddleware';
import { env } from '../../loaders/env.loader';

const { UPLOADS_DIR } = env;

export const postPictureUploader = createUploaderMiddleware({
  destination: path.resolve(UPLOADS_DIR, 'blog/pictures'),
  fileTypes: /jpg|png|jpeg|gif|webp|svg/,
  maxFileSizeMB: 10,
  maxFileNumber: 1,
  fileFieldName: 'picture',
});
