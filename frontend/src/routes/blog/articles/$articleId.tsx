import BlogArticleDetailPage from '../../../ui/pages/Blog/BlogArticleDetailPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/articles/$articleId')({
  component: BlogArticleDetailPage,
});
