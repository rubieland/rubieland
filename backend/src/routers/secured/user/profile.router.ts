import Router, { Express } from 'express';
import { authMiddleware } from '../../../middlewares/auth/auth.middleware';
import { isMeMiddleware } from '../../../middlewares/user/isMe.middleware';
import {
  deleteAccount,
  getProfile,
  updateProfile,
} from '../../../controllers/profile/profile.controller';
import { avatarUploader } from '../../../middlewares/uploads/uploadAvatar.middleware';

const router: Express = Router();

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

export default router;
