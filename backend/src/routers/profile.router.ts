import Router, { Express } from 'express';
import { getUser, updateUser } from '../controllers/profile/profile.controller';
import { authMiddleware } from '../middlewares/auth/auth.middleware';
import { isMeMiddleware } from '../middlewares/user/isMe.middleware';
import { avatarUploader } from '../middlewares/uploads/uploadAvatar.middleware';

const router: Express = Router();

router.get('/:userId', authMiddleware, isMeMiddleware, getUser);
router.put(
  '/:userId/update-user',
  authMiddleware,
  isMeMiddleware,
  avatarUploader,
  updateUser,
);

export default router;
