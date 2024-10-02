import BackOfficeLayout from '../ui/components/Layout/BackOfficeLayout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/back-office')({
  beforeLoad: async ({ context }) => {
    if (!context.isConnected || !context.isAdmin) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: BackOfficeLayout,
});
