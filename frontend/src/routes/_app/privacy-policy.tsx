import PrivacyPolicyPage from '@/ui/pages/LegalContent/PrivacyPolicyPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/privacy-policy')({
  component: PrivacyPolicyPage,
});
