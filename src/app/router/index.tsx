import { createBrowserRouter, type RouterProviderProps } from 'react-router-dom';
import EROUTES from '@app/constants/routes';
import App from '@/pages/app.page';
import LoginPage from '@/features/auth/_pages/login.page';
import RegisterPage from '@/features/auth/_pages/register.page';

const router: RouterProviderProps['router'] = createBrowserRouter([
  {
    path: '/',
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
]);

export default router;
