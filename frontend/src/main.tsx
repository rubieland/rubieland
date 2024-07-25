import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import './assets/styles/fonts.scss';
import './core/i18n'; // init i18next
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);