import NotFound from './ui/components/NotFound/NotFound';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    isConnected: false,
    isAdmin: false,
  },
  defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
