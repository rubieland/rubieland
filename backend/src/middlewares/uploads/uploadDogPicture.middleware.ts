import createUploaderMiddleware from './createUploaderMiddleware';

export const dogPictureUploader = createUploaderMiddleware({
  destination: 'src/uploads/dog/pictures',
  fileTypes: /jpg|png|jpeg|gif|webp|svg/,
  maxFileSizeMB: 3,
  maxFileNumber: 1,
  fileFieldName: 'picture',
});
