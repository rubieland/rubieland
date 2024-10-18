import { Router } from 'express';
import { getAllPosts, getPost } from '../../controllers/public/blog.controller';

const router = Router();

router.get('/posts/all', getAllPosts);
router.get('/posts/:id', getPost);

export default router;
