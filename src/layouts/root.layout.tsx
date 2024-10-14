import EROUTES from '@app/constants/routes';
import { Navigate, Outlet, useLoaderData, useLocation } from 'react-router-dom';

function RootLayout() {
  const { isAuthenticated } = useLoaderData() as { isAuthenticated: boolean };
  const { pathname } = useLocation();
  const isInPublicRoute = [EROUTES.LOGIN, EROUTES.REGISTER].includes(pathname as EROUTES);

  if (isAuthenticated) {
    if (isInPublicRoute) return <Navigate to={EROUTES.HOME} replace />;

    return <Outlet />;
  } else {
    if (!isInPublicRoute) return <Navigate to={EROUTES.LOGIN} replace />;

    return <Outlet />;
  }
}

export default RootLayout;
