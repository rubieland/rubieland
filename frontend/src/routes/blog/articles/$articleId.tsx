import BlogArticlePage from '../../../ui/pages/Blog/BlogArticlePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/articles/$articleId')({
  // TODO: uncomment the following when api call and article page are ready
  // loader: async ({ params }) => {
  //     return getBlogArticle(params.articleId)
  //   },
  component: BlogArticlePage,
});
