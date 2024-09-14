import { Router } from 'express';
import {
  getAllPrestations,
  getPrestation,
} from '../../controllers/public/prestations.controller';

const router = Router();

router.get('/prestations/all', getAllPrestations);
router.get('/prestations/:id', getPrestation);

export default router;
