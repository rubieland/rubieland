import Router, { Express } from 'express';
import { login, logout, register } from '../controllers/auth/auth.controller';

const router: Express = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

export default router;
