import { createBrowserRouter, type RouterProviderProps } from 'react-router-dom';
import EROUTES from '@app/constants/routes';
import App from '@/pages/app.page';
import LoginPage from '@/features/auth/_pages/login.page';
import RegisterPage from '@/features/auth/_pages/register.page';
import RootLayout from '@/layouts/root.layout';
import ErrorBoundary from '@/layouts/error-boundary';
import authLoader from './auth.loader';

const router: RouterProviderProps['router'] = createBrowserRouter([
  {
    path: '/',
    loader: authLoader,
    errorElement: <ErrorBoundary isRoot />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: EROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: EROUTES.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
