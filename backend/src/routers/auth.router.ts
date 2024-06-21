import Router, { Express } from 'express';
import { login, register } from '../controllers/auth/auth.controller';

const router: Express = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/');

export default router;
