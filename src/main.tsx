import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import router from '@app/router';
import { TooltipProvider } from '@/components/ui/tooltip';
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
          <TooltipProvider>
            <RouterProvider router={router} />
            <Toaster richColors />
          </TooltipProvider>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
