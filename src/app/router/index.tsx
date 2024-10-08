import App from '@/app.page';
import { createBrowserRouter, type RouterProviderProps } from 'react-router-dom';

const router: RouterProviderProps['router'] = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

export default router;
