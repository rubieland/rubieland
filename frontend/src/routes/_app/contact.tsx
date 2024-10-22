import { createFileRoute } from '@tanstack/react-router';
import ContactPage from '@/ui/pages/Contact/ContactPage';

export const Route = createFileRoute('/_app/contact')({
  component: ContactPage,
});
