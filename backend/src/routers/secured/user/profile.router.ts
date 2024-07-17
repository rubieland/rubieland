import Router, { Express } from 'express';
import { authMiddleware } from '../../../middlewares/auth/auth.middleware';
import { isMeMiddleware } from '../../../middlewares/user/isMe.middleware';
import {
  deleteAccount,
  getProfile,
  updateProfile,
} from '../../../controllers/profile/profile.controller';
import { avatarUploader } from '../../../middlewares/uploads/uploadAvatar.middleware';
import {
  createDog,
  getMyDog,
  getMyDogs,
} from '../../../controllers/profile/dogs.controller';
import { dogPictureUploader } from '../../../middlewares/uploads/uploadDogPicture.middleware';

const router: Express = Router();

// user profile
router.put(
  '/:userId/update-profile',
  authMiddleware,
  isMeMiddleware,
  avatarUploader,
  updateProfile,
);
router.delete(
  '/:userId/delete-account',
  authMiddleware,
  isMeMiddleware,
  deleteAccount,
);
router.get('/:userId', authMiddleware, isMeMiddleware, getProfile);

// users' dogs
router.post(
  '/:userId/my-dogs/create',
  authMiddleware,
  isMeMiddleware,
  dogPictureUploader,
  createDog,
);
router.get('/:userId/my-dogs/all', authMiddleware, isMeMiddleware, getMyDogs);
router.get('/:userId/my-dogs/:dogId', authMiddleware, isMeMiddleware, getMyDog);

export default router;
