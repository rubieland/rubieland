import { createFileRoute } from '@tanstack/react-router';
import HomePage from '../../ui/pages/Home/HomePage';

export const Route = createFileRoute('/_app/')({
  component: HomePage,
});
