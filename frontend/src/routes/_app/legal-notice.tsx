import LegalNoticePage from '@/ui/pages/LegalContent/LegalNoticePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/legal-notice')({
  component: LegalNoticePage,
});
