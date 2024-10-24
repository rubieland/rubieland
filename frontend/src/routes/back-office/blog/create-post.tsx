import CreatePostPage from '@/ui/pages/BackOffice/BackOfficeBlog/CreatePostPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/back-office/blog/create-post')({
  component: CreatePostPage,
});
