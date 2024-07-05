import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import i18n from '../../config/i18n';

// DOCS: https://stackoverflow.com/questions/30838901/error-handling-when-uploading-file-using-multer-with-expressjs

interface UploadOptions {
  destination: string;
  fileTypes: RegExp;
  maxFileSizeMB: number;
  maxFileNumber: number;
  fileFieldName: string;
}

// generic function to create middlewares to handle different file uploading
const createUploaderMiddleware = (options: UploadOptions) => {
  const {
    destination,
    fileTypes,
    maxFileSizeMB,
    maxFileNumber,
    fileFieldName,
  } = options;

  // transform regex into a string, listing the file types allowed
  const fileTypeList = String(fileTypes)
    .replace(/^\/|\/$/g, '')
    .split('|')
    .join(', ');

  const storage = multer.diskStorage({
    // define files' destination directory
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    // generate random file name
    filename: (req, file, cb) => {
      const randomString =
        Math.random().toString(36).substring(2, 10) +
        Math.random().toString(36).substring(2, 10);
      const timestamp = Date.now();
      const extension = path.extname(file.originalname);
      cb(null, `${randomString}${timestamp}${extension}`);
    },
  });

  const upload = multer({
    storage,
    limits: {
      files: maxFileNumber, // nb of files a user can upload in an input
      fileSize: maxFileSizeMB * 1024 * 1024, // max size for a file
    },
    // check that the file types sent are allowed
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  });

  const checkFileType = (
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      const error = new Error(
        i18n
          .t('uploads.error.wrongFileType')
          .replace('{{types}}', fileTypeList),
      );
      error.name = 'FileTypeError';
      cb(error);
    }
  };

  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fileFieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          switch (err.code) {
            case 'LIMIT_FILE_SIZE':
              console.error(err);
              return res.status(400).json({
                error: i18n
                  .t('uploads.error.fileTooLarge')
                  .replace('{{limit}}', String(maxFileSizeMB)),
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
};

export default createUploaderMiddleware;
