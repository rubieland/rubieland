import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  // TODO: replace component by Home page when it's ready
  component: () => <div>Hello /!</div>,
});
