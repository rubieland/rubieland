import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import { trimData } from '../../utils/string.utils';
import { deleteFile as deletePicture } from '../../utils/file.utils';
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
import User from '../../models/User.model';
import { env } from '../../loaders/env.loader';

const { UPLOADS_DIR } = env;
const picturesDir = path.resolve(UPLOADS_DIR, 'dog/pictures');
const context: DataContext = DataContext.DOG;

export const getMyDogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.authUser?.id;
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
    const userId = req?.authUser?.id;
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
      message: i18n.t('common.success.dogsFound_one', { count: 1 }),
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
  const pictureFile = req.file;

  try {
    const userId = req.authUser!.id!;
    const ownerId = new Types.ObjectId(userId);
    const owner = await User.findById(userId);

    if (!owner) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.userDoesNotExist') });
    }

    const { gender, name, bio, birthDate, breed } = trimData(req.body);

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
      birthDate: new Date(birthDate),
      ownerId,
      picture: pictureFile?.filename,
    });

    // save new dog in database and add new dog id in ownwer's dogsIds array
    await newDog
      .save()
      .then(() => owner.dogsIds.push(newDog._id as Types.ObjectId));

    await owner.save();

    res.status(201).json({
      message: i18n.t('dog.success.dogCreationSuccess'),
      newDog,
    });
  } catch (error: unknown) {
    if (pictureFile)
      await deletePicture(`${picturesDir}/${pictureFile?.filename}`);
    if (error instanceof Error) {
      const messages = extractValidationErrorMessagesFromError(error);
      res.status(400).json({ errors: messages });
    } else {
      next(error);
    }
  }
};

export const updateDog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const pictureFile = req.file;

  try {
    const userId = req.authUser!.id!;
    const dogId = req.params?.dogId;

    const { gender, name, bio, birthDate, breed } = trimData(req.body);

    const dogData: DogData = {
      gender,
      name,
      bio,
      birthDate,
      breed,
    };

    const dogInBase: DogDocument | null = await Dog.findById(dogId);

    if (!dogInBase) {
      if (pictureFile)
        await deletePicture(`${picturesDir}/${pictureFile?.filename}`);

      return res
        .status(404)
        .json({ error: i18n.t('common.error.dogsFound_zero', { count: 0 }) });
    }

    if (String(dogInBase.ownerId) !== userId) {
      return res.status(403).json({
        error: i18n.t('common.error.permissionDenied'),
      });
    }

    // data validation
    const dogDataErrors = await checkDogData(dogData);

    if (dogDataErrors && dogDataErrors.length > 0) {
      if (pictureFile)
        await deletePicture(`${picturesDir}/${pictureFile?.filename}`);
      return res.status(400).json({
        message: i18n.t('dog.error.dogUpdateFailed'),
        errors: dogDataErrors,
      });
    }

    // if user uploads a new picture for the dog, delete the old one and replace it by the new one
    if (pictureFile) {
      if (dogInBase.picture) {
        await deletePicture(`${picturesDir}/${dogInBase.picture}`).then(
          async () => {
            dogInBase.picture = pictureFile?.filename;
          },
        );
      } else {
        dogInBase.picture = pictureFile?.filename;
      }
    }

    // update dog data
    (Object.keys(dogData) as (keyof Omit<DogData, 'birthDate'>)[]).forEach(
      (key) => {
        if (dogData[key] !== undefined) {
          (dogInBase[key] as keyof DogData) = dogData[key] as keyof DogData;
          dogInBase.birthDate = new Date(birthDate);
        }
      },
    );

    // save dog with updated data
    await dogInBase.save();

    return res.status(200).json({
      message: i18n.t('dog.success.dogUpdateSuccess'),
      dogInBase,
    });
  } catch (error: unknown) {
    if (pictureFile)
      await deletePicture(`${picturesDir}/${pictureFile?.filename}`);

    next(error);
  }
};

export const deleteDog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.authUser!.id!;
    const owner = await User.findById(userId);
    const dogId = req.params?.dogId;
    const dog: DogDocument | null = await Dog.findById(dogId);

    if (!owner) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.userDoesNotExist') });
    }

    if (!dog) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.dogDoesNotExist') });
    }

    if (String(dog.ownerId) !== userId) {
      return res.status(403).json({
        error: i18n.t('common.error.permissionDenied'),
      });
    }

    // delete dog and if had a picture, delete picture + remove dog id from user dogsIds array
    await dog.deleteOne().then(async () => {
      if (dog.picture) await deletePicture(`${picturesDir}/${dog.picture}`);
      const newOwnerDogsIds = owner?.dogsIds.filter(
        (id) => String(id) !== dogId,
      );
      owner.dogsIds = newOwnerDogsIds;
    });

    // save user to update dogsIds array
    await owner.save();
    res.status(200).json({
      message: i18n.t('dog.success.dogDeleteSuccess'),
    });
  } catch (error: unknown) {
    next(error);
  }
};
