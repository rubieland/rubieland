import Router, { Express } from 'express';
import {
  getAllBlogArticles,
  getBlogArticle,
} from '../../controllers/public/blog.controller';

const router: Express = Router();

router.get('/articles/all', getAllBlogArticles);
router.get('/articles/:id', getBlogArticle);

export default router;
