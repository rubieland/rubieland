import PostDetailsPage from '../../../ui/pages/Blog/PostDetailsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/posts/$postId')({
  component: PostDetailsPage,
});
