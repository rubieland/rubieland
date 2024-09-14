import { Router } from 'express';
import {
  login,
  logout,
  refreshToken,
  register,
} from '../../controllers/auth/auth.controller';

const router = Router();

router.post('/refresh-token', refreshToken);
router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

export default router;
