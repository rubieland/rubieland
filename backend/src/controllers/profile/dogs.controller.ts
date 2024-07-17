import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import { trimData } from '../../utils/string.utils';
import { deleteFile as deletePicture } from '../../utils/file.utils';
import { fileURLToPath } from 'url';
import path from 'path';
import Dog from '../../models/Dog.model';
import { DogData, DogDocument } from '../../models/types/Dog.types';
import {
  extractValidationErrorMessagesFromError,
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
import { DataContext } from '../../validation/types/validation.types';
import { Types } from 'mongoose';
import { checkDogData } from '../../validation/Dog.validators';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const picturesDir = path.join(__dirname, '../../uploads/dog/pictures');

const context: DataContext = DataContext.DOG;

export const getMyDogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.session?.authUser?.id;
    const dogs: DogDocument[] | null = await Dog.find({ ownerId: userId });

    if (!dogs || dogs.length === 0) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.dogsFound_zero', { count: 0 }) });
    }

    const message =
      dogs.length === 1
        ? i18n.t('common.success.dogsFound_one', { count: 1 })
        : i18n.t('common.success.dogsFound_other', {
            count: dogs.length,
          });

    res.status(200).json({ message, dogs });
  } catch (error: unknown) {
    next(error);
  }
};

export const getMyDog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.session?.authUser?.id;
    const dogId = req.params?.dogId;
    const dog: DogDocument | null = await Dog.findOne({
      _id: dogId,
      ownerId: userId,
    });

    if (!dog) {
      return res.status(404).json({
        error: i18n.t('common.error.dogDoesNotExist'),
      });
    }
    res.status(200).json({
      message: i18n.t('common.success.dogFound_one', { count: 1 }),
      dog,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const createDog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.session.authUser!.id!;
    const ownerId = new Types.ObjectId(userId);

    const { gender, name, bio, birthDate, breed } = trimData(req.body);
    const pictureFile = req.file;

    const dogData: DogData = {
      gender,
      name,
      bio,
      birthDate,
      breed,
    };

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields(dogData);

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      if (pictureFile)
        await deletePicture(`${picturesDir}/${pictureFile?.filename}`);
      const errors = getMissingOrEmptyFieldsErrorMessage(
        context,
        missingOrEmptyFields,
      );

      return res.status(400).json({
        message: i18n.t('dog.error.dogCreationFailed'),
        errors,
      });
    }

    // data validation
    const dogDataErrors = await checkDogData(dogData);

    if (dogDataErrors && dogDataErrors.length > 0) {
      if (pictureFile)
        await deletePicture(`${picturesDir}/${pictureFile?.filename}`);
      return res.status(400).json({
        message: i18n.t('dog.error.dogCreationFailed'),
        errors: dogDataErrors,
      });
    }

    // create new instance of Dog with data from req.body
    const newDog = new Dog({
      ...dogData,
      ownerId,
      picture: pictureFile?.filename,
    });

    // save new dog in database
    await newDog.save();
    res.status(201).json({
      message: i18n.t('dog.success.dogCreationSuccess'),
      newDog,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const messages = extractValidationErrorMessagesFromError(error);
      res.status(400).json({ errors: messages });
    } else {
      next(error);
    }
  }
};
