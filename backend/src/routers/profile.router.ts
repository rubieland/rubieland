import Router, { Express } from 'express';
import { getUser } from '../controllers/profile/profile.controller';
import { authMiddleware } from '../middlewares/auth/auth.middleware';
import { isMeMiddleware } from '../middlewares/user/isMe.middleware';

const router: Express = Router();

router.get('/:userId', authMiddleware, isMeMiddleware, getUser);

export default router;
