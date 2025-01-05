import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Setup MSW mock server in development
if (import.meta.env.VITE_ENABLE_MSW === 'true') {
  // Certify MSW's Service Worker is available before start React app.
  import('../mocks/browser')
    .then(async ({ worker }) => {
      return worker.start();
    }) // Run <App /> when Service Worker is ready to intercept requests.
    .then(() => {
      root.render(<App />);
    });
  // Never setup MSW mock server in production
} else {
  root.render(<App />);
}
