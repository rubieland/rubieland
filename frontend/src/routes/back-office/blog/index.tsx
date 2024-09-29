import BackOfficeBlogPage from '../../../ui/pages/BackOffice/BackOfficeBlog/BackOfficeBlogPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/back-office/blog/')({
  component: BackOfficeBlogPage,
});
