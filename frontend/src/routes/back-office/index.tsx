import BackOfficeDashboardPage from '../../ui/pages/BackOffice/BackOfficeDashboardPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/back-office/')({
  component: BackOfficeDashboardPage,
});
