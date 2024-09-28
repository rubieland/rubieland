import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth/auth.middleware';
import {
  deleteAccount,
  getProfile,
  updateProfile,
} from '../../../controllers/profile/profile.controller';
import { avatarUploader } from '../../../middlewares/uploads/uploadAvatar.middleware';
import {
  createDog,
  deleteDog,
  getMyDog,
  getMyDogs,
  updateDog,
} from '../../../controllers/profile/dogs.controller';
import { dogPictureUploader } from '../../../middlewares/uploads/uploadDogPicture.middleware';

const router = Router();

// user profile
router.put('/update-profile', authMiddleware, avatarUploader, updateProfile);
router.delete('/delete-account', authMiddleware, deleteAccount);
router.get('/', authMiddleware, getProfile);

// users' dogs
router.post('/my-dogs/create', authMiddleware, dogPictureUploader, createDog);
router.put(
  '/my-dogs/:dogId/update',
  authMiddleware,
  dogPictureUploader,
  updateDog,
);
router.delete('/my-dogs/:dogId/delete', authMiddleware, deleteDog);
router.get('/my-dogs/all', authMiddleware, getMyDogs);
router.get('/my-dogs/:dogId', authMiddleware, getMyDog);

export default router;
