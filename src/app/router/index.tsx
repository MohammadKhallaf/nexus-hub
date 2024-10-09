import { createBrowserRouter, type RouterProviderProps } from 'react-router-dom';
import App from '@/app.page';

const router: RouterProviderProps['router'] = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

export default router;
