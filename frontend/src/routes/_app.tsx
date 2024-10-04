import { createFileRoute } from '@tanstack/react-router';
import Layout from '../ui/components/Layout/Layout';

export const Route = createFileRoute('/_app')({
  component: Layout,
});
