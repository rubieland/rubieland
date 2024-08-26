import { createFileRoute } from '@tanstack/react-router';
import RegisterPage from '../ui/pages/Register/RegisterPage';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});
