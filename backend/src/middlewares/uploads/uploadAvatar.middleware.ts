import createUploaderMiddleware from './createUploaderMiddleware';

export const avatarUploader = createUploaderMiddleware({
  destination: 'src/uploads/user/avatars',
  fileTypes: /jpg|png|jpeg|gif|webp|svg/,
  maxFileSizeMB: 3,
  maxFileNumber: 1,
  fileFieldName: 'avatar',
});
