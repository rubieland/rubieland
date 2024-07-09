import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create destination directory for files to ensure it exists
export const ensureDirectoryExists = async (
  directoryPath: string,
): Promise<void> => {
  try {
    await fsPromises.mkdir(path.join(__dirname, '../uploads', directoryPath), {
      recursive: true,
    });
  } catch (error: unknown) {
    // TODO: replace by t()
    throw new Error(`Failed to create directory: ${error}`);
  }
};

// generate a random name for uploaded files
export const generateRandomFilename = (originalFilename: string | null) => {
  if (!originalFilename) {
    // TODO: replace by t()
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
  const oldpath = file.path;
  const newpath = path.join(destinationPath, newFilename);
  try {
    await fsPromises.copyFile(oldpath, `src/uploads/${newpath}`);
    return newpath;
  } catch (error: unknown) {
    // TODO: replace by t()
    throw new Error(`Failed to copy file: ${error}`);
  }
};

// save several files in destination directory
export const copyFiles = async (
  files: Express.Multer.File[] | undefined,
  destinationPath: string,
): Promise<string[]> => {
  if (!files) {
    // TODO: replace by t()
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
  fs.unlink(`${filePath}`, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    } else {
      console.log('File deleted successfully');
    }
  });
};
