import { createRouter, RouterProvider } from '@tanstack/react-router';
import NotFound from './ui/components/NotFound/NotFound.tsx';
import { routeTree } from './routeTree.gen.ts';

const router = createRouter({ routeTree, defaultNotFoundComponent: NotFound });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// DOCS: Tanstack router tutorials => https://www.youtube.com/watch?v=4sslBg8LprE&list=PLOQjd5dsGSxJilh0lBofeY8Qib98kzmF5&index=1

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
