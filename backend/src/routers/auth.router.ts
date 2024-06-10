import Router, { Express } from 'express';
import { login } from '../controllers/auth/auth.controller';
import { verifyToken } from '../middlewares/auth/verifyToken.middleware';

const router: Express = Router();

// TODO: replace get by post
router.get('/register', login);
router.get('/login', verifyToken, login);

export default router;
