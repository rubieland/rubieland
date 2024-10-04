import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/about')({
  // TODO: replace component by About page when it's ready
  component: () => <div>Hello /about!</div>,
});
