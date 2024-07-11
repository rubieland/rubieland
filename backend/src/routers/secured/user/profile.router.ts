import Router, { Express } from 'express';
import { authMiddleware } from '../../../middlewares/auth/auth.middleware';
import { isMeMiddleware } from '../../../middlewares/user/isMe.middleware';
import {
  deleteAccount,
  getUserProfile,
  updateUser,
} from '../../../controllers/profile/profile.controller';
import { avatarUploader } from '../../../middlewares/uploads/uploadAvatar.middleware';

const router: Express = Router();

router.get('/:userId', authMiddleware, isMeMiddleware, getUserProfile);
router.put(
  '/:userId/update-user',
  authMiddleware,
  isMeMiddleware,
  avatarUploader,
  updateUser,
);
router.delete(
  '/:userId/delete-account',
  authMiddleware,
  isMeMiddleware,
  deleteAccount,
);

export default router;
