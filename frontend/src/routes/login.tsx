import LoginPage from '../ui/pages/AuthPages/Login/LoginPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
