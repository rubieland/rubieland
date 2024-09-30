import PostDetailPage from '../../../ui/pages/Blog/PostDetailPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/posts/$postId')({
  component: PostDetailPage,
});
