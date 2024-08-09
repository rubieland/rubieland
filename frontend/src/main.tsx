import 'react-image-crop/src/ReactCrop.scss';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import './assets/styles/fonts.scss';
import React from 'react';
import App from './App';
import './core/i18n'; // init i18next

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
