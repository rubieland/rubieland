import Router, { Express } from 'express';
import { login, register } from '../controllers/auth/auth.controller';
import { verifyToken } from '../middlewares/auth/verifyToken.middleware';

const router: Express = Router();

// TODO: replace get by post
router.get('/login', login);
router.post('/register', verifyToken, register);

export default router;