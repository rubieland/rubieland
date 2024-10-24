import { postContactMessage } from '../../controllers/contact/contact.controller';
import { Router } from 'express';

const router = Router();

router.post('/', postContactMessage);

export default router;
