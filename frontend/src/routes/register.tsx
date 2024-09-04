import RegisterPage from '../ui/pages/AuthPages/Register/RegisterPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});
