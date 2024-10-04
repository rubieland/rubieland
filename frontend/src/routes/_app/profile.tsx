import { createFileRoute, redirect } from '@tanstack/react-router';
import ProfilePage from '../../ui/pages/Profile/ProfilePage';

export const Route = createFileRoute('/_app/profile')({
  beforeLoad: async ({ context }) => {
    if (!context.isConnected) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: ProfilePage,
});
