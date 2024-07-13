import Router, { Express } from 'express';
import { authMiddleware } from '../../../middlewares/auth/auth.middleware';
import { isAdminMiddleware } from '../../../middlewares/admin/isAdmin.middleware';
import {
  getAllUsers,
  getUser,
} from '../../../controllers/back-office/users.controller';
import {
  createBlogArticle,
  deleteBlogArticle,
  getAllBlogArticles,
  getBlogArticle,
  updateBlogArticle,
} from '../../../controllers/back-office/blogBackOffice.controller';
import { blogArticlePictureUploader } from '../../../middlewares/uploads/uploadBlogArticlePicture.middleware';
import {
  createPrestation,
  deletePrestation,
  getAllPrestations,
  getPrestation,
  updatePrestation,
} from '../../../controllers/back-office/prestations.controller';

const router: Express = Router();

// blog routes
router.put(
  '/blog/articles/:id/update',
  authMiddleware,
  isAdminMiddleware,
  blogArticlePictureUploader,
  updateBlogArticle,
);
router.delete(
  '/blog/articles/:id/delete',
  authMiddleware,
  isAdminMiddleware,
  deleteBlogArticle,
);
router.post(
  '/blog/articles/create',
  authMiddleware,
  isAdminMiddleware,
  blogArticlePictureUploader,
  createBlogArticle,
);
router.get(
  '/blog/articles/:id',
  authMiddleware,
  isAdminMiddleware,
  getBlogArticle,
);
router.get(
  '/blog/articles/all',
  authMiddleware,
  isAdminMiddleware,
  getAllBlogArticles,
);

// prestation routes
router.put(
  '/prestations/:id/update',
  authMiddleware,
  isAdminMiddleware,
  updatePrestation,
);
router.delete(
  '/prestations/:id/delete',
  authMiddleware,
  isAdminMiddleware,
  deletePrestation,
);
router.post(
  '/prestations/create',
  authMiddleware,
  isAdminMiddleware,
  createPrestation,
);
router.get(
  '/prestations/:id',
  authMiddleware,
  isAdminMiddleware,
  getPrestation,
);
router.get(
  '/prestations/all',
  authMiddleware,
  isAdminMiddleware,
  getAllPrestations,
);

// users routes
router.get('/users/:userId', authMiddleware, isAdminMiddleware, getUser);
router.get('/users/all', authMiddleware, isAdminMiddleware, getAllUsers);

export default router;
