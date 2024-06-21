import Router, { Express } from 'express';
import {
  login,
  register,
  testVerifyToken,
} from '../controllers/auth/auth.controller';
import { verifyToken } from '../middlewares/auth/verifyToken.middleware';

const router: Express = Router();

router.post('/login', login);
router.get('/testVerifyToken', verifyToken, testVerifyToken);
router.post('/register', register);
router.get('/');

export default router;
