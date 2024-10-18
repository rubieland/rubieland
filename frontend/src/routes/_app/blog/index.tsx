import { createFileRoute } from '@tanstack/react-router';
import BlogPage from '../../../ui/pages/Blog/BlogPage';

export const Route = createFileRoute('/_app/blog/')({
  component: BlogPage,
});
