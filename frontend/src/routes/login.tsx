import { createFileRoute } from '@tanstack/react-router';
import LoginPage from '../ui/pages/Login/LoginPage';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
