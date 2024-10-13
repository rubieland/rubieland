import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { queryClient } from './api/reactQuery';
import ReactDOM from 'react-dom/client';
import './core/i18n'; // init i18next
import './assets/styles/index.scss';
import './assets/styles/fonts.scss';
import { Toaster } from 'sonner';
import React from 'react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" richColors duration={3000} closeButton />
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
