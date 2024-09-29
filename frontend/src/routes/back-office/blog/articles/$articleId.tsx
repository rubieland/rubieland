import BackOfficeBlogArticlePage from '../../../../ui/pages/BackOffice/BackOfficeBlog/BackOfficeBlogArticlePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/back-office/blog/articles/$articleId',
)({
  // TODO: uncomment the following when api call and article page are ready
  // loader: async ({ params }) => {
  //     return getBlogArticle(params.articleId)
  //   },
  component: BackOfficeBlogArticlePage,
});
