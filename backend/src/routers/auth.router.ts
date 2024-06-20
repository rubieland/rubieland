import Router, { Express } from 'express';
import {
  login,
  protectedRoute,
  register,
} from '../controllers/auth/auth.controller';
import { verifyToken } from '../middlewares/auth/verifyToken.middleware';

const router: Express = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/protected', verifyToken, protectedRoute);
router.get('/');

export default router;
