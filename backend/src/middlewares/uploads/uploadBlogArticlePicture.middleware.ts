import createUploaderMiddleware from './createUploaderMiddleware';

export const blogArticlePictureUploader = createUploaderMiddleware({
  destination: 'src/uploads/blog/pictures',
  fileTypes: /jpg|png|jpeg|gif|webp|svg/,
  maxFileSizeMB: 10,
  maxFileNumber: 1,
  fileFieldName: 'picture',
});
