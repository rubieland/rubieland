import path from 'path';
import { env } from '../../loaders/env.loader';
import createUploaderMiddleware from './createUploaderMiddleware';

const { UPLOADS_DIR } = env;

export const dogPictureUploader = createUploaderMiddleware({
  destination: path.resolve(UPLOADS_DIR, 'dog/pictures'),
  fileTypes: /jpg|png|jpeg|gif|webp|svg/,
  maxFileSizeMB: 3,
  maxFileNumber: 1,
  fileFieldName: 'picture',
});
