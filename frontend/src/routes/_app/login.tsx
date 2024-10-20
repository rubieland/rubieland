import { createFileRoute, redirect } from '@tanstack/react-router';
import LoginPage from '../../ui/pages/AuthPages/Login/LoginPage';

export const Route = createFileRoute('/_app/login')({
  beforeLoad: async ({ context }) => {
    if (context.isConnected) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: LoginPage,
});
