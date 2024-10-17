import BackOfficeUsersPage from '@/ui/pages/BackOffice/BackOfficeUsers/BackOfficeUsersPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/back-office/users/')({
  component: BackOfficeUsersPage,
});
