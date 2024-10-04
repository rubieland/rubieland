import RegisterPage from '../../ui/pages/AuthPages/Register/RegisterPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/register')({
  beforeLoad: async ({ context }) => {
    if (context.isConnected) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RegisterPage,
});
