import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { queryClient } from './api/reactQuery';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import './core/i18n'; // init i18next
import './assets/styles/index.scss';
import './assets/styles/fonts.scss';
import React from 'react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer position="top-center" />
    </QueryClientProvider>
  </React.StrictMode>,
);
