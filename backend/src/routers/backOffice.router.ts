import Router, { Express } from 'express';
import { authMiddleware } from '../middlewares/auth/auth.middleware';
import { isAdminMiddleware } from '../middlewares/admin/isAdmin.middleware';
import {
  getAllUsers,
  getUser,
} from '../controllers/back-office/users.controller';
import {
  createBlogArticle,
  getAllBlogArticles,
  getBlogArticle,
} from '../controllers/back-office/blogArticles.controller';

const router: Express = Router();

// users routes
router.get('/users/:userId', authMiddleware, isAdminMiddleware, getUser);
router.get('/users/all', authMiddleware, isAdminMiddleware, getAllUsers);

// blog routes
router.get(
  '/blog-articles/all',
  authMiddleware,
  isAdminMiddleware,
  getAllBlogArticles,
);
router.get(
  '/blog-articles/:id',
  authMiddleware,
  isAdminMiddleware,
  getBlogArticle,
);
router.post(
  '/blog-articles/create',
  authMiddleware,
  isAdminMiddleware,
  createBlogArticle,
);

export default router;
