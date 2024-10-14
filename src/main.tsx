import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import router from '@app/router';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
const helmetContext = {};

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster richColors />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
