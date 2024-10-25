import path from 'path';
import { env } from '../../loaders/env.loader';
import createUploaderMiddleware from './createUploaderMiddleware';

const { UPLOADS_DIR } = env;

export const avatarUploader = createUploaderMiddleware({
  destination: path.resolve(UPLOADS_DIR, 'user/avatars'),
  fileTypes: /jpg|png|jpeg|gif|webp|svg/,
  maxFileSizeMB: 3,
  maxFileNumber: 1,
  fileFieldName: 'avatar',
});
