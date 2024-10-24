import fs from 'fs';
import path from 'path';
import { env } from '../loaders/env.loader';

const fsPromises = fs.promises;
const { UPLOADS_DIR } = env;

// create destination directory for files to ensure it exists
export const ensureDirectoryExists = async (
  directoryPath: string,
): Promise<void> => {
  try {
    await fsPromises.mkdir(path.resolve(UPLOADS_DIR, directoryPath), {
      recursive: true,
    });
  } catch (error: unknown) {
    throw new Error(`Failed to create directory: ${error}`);
  }
};

// generate a random name for uploaded files
export const generateRandomFilename = (originalFilename: string | null) => {
  if (!originalFilename) {
    throw new Error('Original filename is undefined');
  }
  const fileExtension = originalFilename.split('.').pop();
  const randomString =
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now();
  return `${timestamp}-${randomString}.${fileExtension}`;
};

// save 1 file in destination directory
export const copyFile = async (
  file: Express.Multer.File,
  destinationPath: string,
): Promise<string> => {
  const newFilename = generateRandomFilename(file.originalname);
  const oldPath = file.path;
  const newDirPath = path.resolve(UPLOADS_DIR, destinationPath);
  const newFilePath = path.join(newDirPath, newFilename);

  try {
    await ensureDirectoryExists(destinationPath);
    await fsPromises.copyFile(oldPath, newFilePath);

    return path.join(destinationPath, newFilename);
  } catch (error: unknown) {
    throw new Error(`Failed to copy file: ${error}`);
  }
};

// save several files in destination directory
export const copyFiles = async (
  files: Express.Multer.File[] | undefined,
  destinationPath: string,
): Promise<string[]> => {
  if (!files) {
    throw new Error('No files to copy');
  }

  if (!Array.isArray(files)) {
    files = [files];
  }

  await ensureDirectoryExists(destinationPath);

  const copyPromises = files.map((file) => copyFile(file, destinationPath));

  return Promise.all(copyPromises);
};

export const deleteFile = async (filePath: string) => {
  const fullFilePath = path.resolve(UPLOADS_DIR, filePath);

  fs.unlink(fullFilePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    } else {
      console.log('File deleted successfully');
    }
  });
};
