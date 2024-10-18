import { createFileRoute } from '@tanstack/react-router';
import AboutPage from '@/ui/pages/About/AboutPage';

export const Route = createFileRoute('/_app/about')({
  component: AboutPage,
});
