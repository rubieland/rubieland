import UpdatePostPage from '@/ui/pages/BackOffice/BackOfficeBlog/UpdatePostPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/back-office/blog/update-post/$postId')({
  component: UpdatePostPage,
});
