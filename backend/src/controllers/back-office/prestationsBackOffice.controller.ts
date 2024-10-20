import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import {
  IPrestation,
  PrestationData,
  PrestationDocument,
} from '../../models/types/Prestation.types';
import Prestation from '../../models/Prestation.model';
import { convertStringToBoolean, trimData } from '../../utils/string.utils';
import {
  extractValidationErrorMessagesFromError,
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
import { DataContext } from '../../validation/types/validation.types';
import { checkPrestationData } from '../../validation/Prestation.validators';

const context: DataContext = DataContext.PRESTATION;

export const getAllPrestations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // retrieve all prestations
    const prestations: PrestationDocument[] = await Prestation.find({});

    if (!prestations || prestations.length === 0) {
      return res.status(200).json({
        message: i18n.t('common.success.prestationsFound_zero', {
          count: 0,
        }),
        prestations: [],
      });
    }

    const message =
      prestations.length === 1
        ? i18n.t('common.success.prestationsFound_one', { count: 1 })
        : i18n.t('common.success.prestationsFound_other', {
            count: prestations.length,
          });
    res.status(200).json({
      message,
      prestations,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getPrestation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    const prestation: PrestationDocument | null = await Prestation.findById(id);

    if (!prestation) {
      return res.status(404).json({
        error: i18n.t('common.error.prestationDoesNotExist'),
      });
    }

    res.status(200).json({
      message: i18n.t('common.success.prestationsFound_one', { count: 1 }),
      prestation,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const createPrestation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, price, isAvailable } = trimData(req.body);

    const prestationData: PrestationData = {
      title,
      description,
      price,
      isAvailable,
    };

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields(prestationData);

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      const errors = getMissingOrEmptyFieldsErrorMessage(
        context,
        missingOrEmptyFields,
      );

      return res.status(400).json({
        message: i18n.t('prestation.error.prestationCreationFailed'),
        errors,
      });
    }

    // data validation
    const prestationDataErrors = await checkPrestationData(prestationData);

    if (prestationDataErrors && prestationDataErrors.length > 0) {
      return res.status(400).json({
        message: i18n.t('prestation.error.prestationCreationFailed'),
        errors: prestationDataErrors,
      });
    }

    // create new instance of Prestation with data from req.body
    const newPrestation = new Prestation({
      ...prestationData,
      price: Number(prestationData.price),
      isAvailable: convertStringToBoolean(prestationData.isAvailable),
    });

    // save new prestation in database
    await newPrestation.save();

    res.status(201).json({
      message: i18n.t('prestation.success.prestationCreationSuccess'),
      newPrestation,
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

export const updatePrestation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    const prestation: PrestationDocument | null = await Prestation.findById(id);
    const { title, description, price, isAvailable } = trimData(req.body);

    if (!prestation) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.prestationDoesNotExist') });
    }

    const prestationData: PrestationData = {
      title,
      description,
      price,
      isAvailable,
    };

    // data validation
    const prestationDataErrors = await checkPrestationData(prestationData);

    if (prestationDataErrors && prestationDataErrors.length > 0) {
      return res.status(400).json({
        message: i18n.t('prestation.error.prestationUpdateFailed'),
        errors: prestationDataErrors,
      });
    }

    (Object.keys(prestationData) as (keyof IPrestation)[]).forEach((key) => {
      if (prestationData[key] !== undefined) {
        (prestation[key] as keyof IPrestation) = prestationData[
          key
        ] as keyof IPrestation;
        prestation.price = Number(prestationData.price);
        prestation.isAvailable = convertStringToBoolean(
          prestationData.isAvailable,
        );
      }
    });

    // save new prestation in database
    await prestation.save();

    res.status(201).json({
      message: i18n.t('prestation.success.prestationUpdateSuccess'),
      prestation,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const deletePrestation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    const prestation = await Prestation.findById(id);

    if (!prestation) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.prestationDoesNotExist') });
    }

    await prestation.deleteOne();

    res.status(200).json({
      message: i18n.t('prestation.success.prestationDeleteSuccess'),
    });
  } catch (error: unknown) {
    next(error);
  }
};
