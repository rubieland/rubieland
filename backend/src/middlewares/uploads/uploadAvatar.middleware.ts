import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import i18n from '../../config/i18n';

// DOCS: https://stackoverflow.com/questions/30838901/error-handling-when-uploading-file-using-multer-with-expressjs

// constants for limits, options, file types allowed...
const maxFileSizeInMB = 3;
const fileSizeLimit = 1024 * 1024 * maxFileSizeInMB;
const fileNumberLimit = 1;
const fileTypes = /jpg|png|jpeg|gif|webp|svg/;
const fileTypeList = String(fileTypes)
  .replace(/^\/|\/$/g, '')
  .split('|')
  .join(', ');

const storage = multer.diskStorage({
  // define file destination
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/avatars');
  },
  // generate a random name for files
  filename: (req, file: Express.Multer.File, cb) => {
    const randomString =
      Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `${randomString}${timestamp}${extension}`);
  },
});

const uploadAvatar = multer({
  storage,
  limits: {
    files: fileNumberLimit, // limit nb of files a user can upload per input
    fileSize: fileSizeLimit, // limit size for a file
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// check that user uploads only allowed file formats
const checkFileType = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    const error = new Error(
      i18n.t('uploads.error.wrongFileType').replace('{{types}}', fileTypeList),
    );
    error.name = 'FileTypeError';
    cb(error);
  }
};

export const uploadAvatarMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  uploadAvatar.single('avatar')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        switch (err.code) {
          case 'LIMIT_FILE_SIZE':
            console.error(err);
            return res.status(400).json({
              error: i18n
                .t('uploads.error.fileTooLarge')
                .replace('{{limit}}', String(maxFileSizeInMB)),
            });
          case 'LIMIT_FILE_COUNT':
            console.error(err);
            return res.status(400).json({
              error: i18n.t('uploads.error.oneFileLimit'),
            });
          case 'LIMIT_FIELD_KEY':
            console.error(err);
            return res.status(400).json({
              error: i18n.t('uploads.error.fieldKey'),
            });
          case 'LIMIT_UNEXPECTED_FILE':
            console.error(err);
            return res.status(400).json({
              error: i18n.t('uploads.error.unexpectedFile'),
            });
          default:
            console.error(err);
            return next(err);
        }
      } else if (err.name === 'FileTypeError') {
        console.error(err);
        return res.status(400).json({
          error: err.message,
        });
      } else {
        console.error(err);
        return next(err);
      }
    }
    return next();
  });
};
