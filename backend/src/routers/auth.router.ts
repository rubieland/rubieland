import Router, { Express } from 'express';
import {
  getTest,
  login,
  logout,
  register,
  testAuthMiddleware,
} from '../controllers/auth/auth.controller';
import { authMiddleware } from '../middlewares/auth/auth.middleware';
import { isAdminMiddleware } from '../middlewares/admin/isAdmin.middleware';

const router: Express = Router();

router.get(
  '/testAuthMiddleware',
  authMiddleware,
  isAdminMiddleware,
  testAuthMiddleware,
);
router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.get('/', getTest);

export default router;
