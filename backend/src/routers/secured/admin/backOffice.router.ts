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
  getAllPrestations,
  getPrestation,
} from '../../../controllers/back-office/prestations.controller';

const router: Express = Router();

// users routes
router.get('/users/:userId', authMiddleware, isAdminMiddleware, getUser);
router.get('/users/all', authMiddleware, isAdminMiddleware, getAllUsers);

// blog routes
router.get(
  '/blog/articles/all',
  authMiddleware,
  isAdminMiddleware,
  getAllBlogArticles,
);
router.get(
  '/blog/articles/:id',
  authMiddleware,
  isAdminMiddleware,
  getBlogArticle,
);
router.post(
  '/blog/articles/create',
  authMiddleware,
  isAdminMiddleware,
  blogArticlePictureUploader,
  createBlogArticle,
);
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

// prestation routes
router.get(
  '/prestations/all',
  authMiddleware,
  isAdminMiddleware,
  getAllPrestations,
);

router.get(
  '/prestations/:id',
  authMiddleware,
  isAdminMiddleware,
  getPrestation,
);
router.post(
  '/prestations/create',
  authMiddleware,
  isAdminMiddleware,
  createPrestation,
);

export default router;
