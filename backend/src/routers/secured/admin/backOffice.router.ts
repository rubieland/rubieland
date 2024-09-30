import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth/auth.middleware';
import { isAdminMiddleware } from '../../../middlewares/admin/isAdmin.middleware';
import {
  getAllUsers,
  getUser,
} from '../../../controllers/back-office/users.controller';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from '../../../controllers/back-office/blogBackOffice.controller';
import { postPictureUploader } from '../../../middlewares/uploads/uploadPostPicture.middleware';
import {
  createPrestation,
  deletePrestation,
  getAllPrestations,
  getPrestation,
  updatePrestation,
} from '../../../controllers/back-office/prestationsBackOffice.controller';
import {
  getAllDogs,
  getDog,
} from '../../../controllers/back-office/dogsBackOffice.controller';

const router = Router();

// blog routes
router.put(
  '/blog/posts/:id/update',
  authMiddleware,
  isAdminMiddleware,
  postPictureUploader,
  updatePost,
);
router.delete(
  '/blog/posts/:id/delete',
  authMiddleware,
  isAdminMiddleware,
  deletePost,
);
router.post(
  '/blog/posts/create',
  authMiddleware,
  isAdminMiddleware,
  postPictureUploader,
  createPost,
);
router.get('/blog/posts/all', authMiddleware, isAdminMiddleware, getAllPosts);
router.get('/blog/posts/:id', authMiddleware, isAdminMiddleware, getPost);

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

// users routes
router.get('/users/all', authMiddleware, isAdminMiddleware, getAllUsers);
router.get('/users/:userId', authMiddleware, isAdminMiddleware, getUser);

// dog routes
router.get('/dogs/all', authMiddleware, isAdminMiddleware, getAllDogs);
router.get('/dogs/:dogId', authMiddleware, isAdminMiddleware, getDog);

export default router;
