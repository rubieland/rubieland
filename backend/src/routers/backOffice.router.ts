import Router, { Express } from 'express';
import { authMiddleware } from '../middlewares/auth/auth.middleware';
import { isAdminMiddleware } from '../middlewares/admin/isAdmin.middleware';
import {
  getAllUsers,
  getUser,
} from '../controllers/back-office/users.controller';

const router: Express = Router();

router.get('/users/all', authMiddleware, isAdminMiddleware, getAllUsers);
router.get('/users/:userId', authMiddleware, isAdminMiddleware, getUser);

export default router;
