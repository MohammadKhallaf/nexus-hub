import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import router from '@app/router';
import './index.css';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
const helmetContext = {};

root.render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
