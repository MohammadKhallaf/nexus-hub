import { createBrowserRouter, type RouterProviderProps } from 'react-router-dom';
import EROUTES from '@app/constants/routes';
import App from '@/pages/app.page';
import LoginPage from '@/pages/login.page';

const router: RouterProviderProps['router'] = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: EROUTES.LOGIN,
    element: <LoginPage />,
  },
]);

export default router;
