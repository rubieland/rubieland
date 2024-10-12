import BackOfficePostDetailsPage from '../../../../ui/pages/BackOffice/BackOfficeBlog/BackOfficePostDetailsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/back-office/blog/posts/$postId')({
  // TODO: uncomment the following when api call and post page are ready
  // loader: async ({ params }) => {
  //     return getPost(params.postId)
  //   },
  component: BackOfficePostDetailsPage,
});
