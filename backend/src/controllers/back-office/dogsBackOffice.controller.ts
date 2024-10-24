import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import Dog from '../../models/Dog.model';
import { DogDocument } from '../../models/types/Dog.types';

export const getAllDogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dogs: DogDocument[] | null = await Dog.find({});

    if (!dogs || dogs.length === 0) {
      return res.status(200).json({
        message: i18n.t('common.success.dogsFound_zero', {
          count: 0,
        }),
        dogs: [],
      });
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

export const getDog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dogId = req.params?.dogId;
    const dog: DogDocument | null = await Dog.findOne({
      _id: dogId,
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
