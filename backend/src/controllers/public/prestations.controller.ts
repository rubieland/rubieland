import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import { PrestationDocument } from '../../models/types/Prestation.types';
import Prestation from '../../models/Prestation.model';

export const getAllPrestations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // retrieve all prestations
    const prestations: PrestationDocument[] = await Prestation.find({});
    if (!prestations || prestations.length === 0) {
      return res.status(404).json({
        error: i18n.t('common.error.prestationsFound_zero', {
          count: 0,
        }),
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
