import Router, { Express } from 'express';
import {
  getTest,
  login,
  logout,
  register,
  testAuthMiddleware,
} from '../controllers/auth/auth.controller';
import { authMiddleware } from '../middlewares/auth/authMiddleware';

const router: Express = Router();

router.get('/testAuthMiddleware', authMiddleware, testAuthMiddleware);
router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.get('/', getTest);

export default router;
