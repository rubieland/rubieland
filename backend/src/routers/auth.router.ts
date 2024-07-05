import Router, { Express } from 'express';
import {
  login,
  logout,
  register,
  uploadFilesTest,
} from '../controllers/auth/auth.controller';
import { uploadAvatarMiddleware } from '../middlewares/uploads/uploadAvatar.middleware';

const router: Express = Router();
router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.post('/uploadFilesTest', uploadAvatarMiddleware, uploadFilesTest);

export default router;
