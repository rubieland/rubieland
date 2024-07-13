import Router, { Express } from 'express';
import {
  getAllPrestations,
  getPrestation,
} from '../../controllers/public/prestations.controller';

const router: Express = Router();

router.get('/prestations/all', getAllPrestations);
router.get('/prestations/:id', getPrestation);

export default router;
