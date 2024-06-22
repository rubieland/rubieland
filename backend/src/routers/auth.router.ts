import Router, { Express } from 'express';
import {
  getTest,
  login,
  register,
  testVerifyToken,
} from '../controllers/auth/auth.controller';
import { verifyToken } from '../middlewares/auth/verifyToken.middleware';

const router: Express = Router();

router.get('/testVerifyToken', verifyToken, testVerifyToken);
router.post('/login', login);
router.post('/register', register);
router.get('/', getTest);

export default router;
