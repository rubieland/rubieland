import PostDetailsPage from '../../../../ui/pages/Blog/PostDetailsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/blog/posts/$postId')({
  component: PostDetailsPage,
});
