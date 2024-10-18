import BackOfficeDashboardPage from '../../ui/pages/BackOffice/Dashboard/BackOfficeDashboardPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/back-office/')({
  component: BackOfficeDashboardPage,
});
