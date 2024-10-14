import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

function ProtectedLayout() {
  const { isAuthenticated } = useLoaderData() as { isAuthenticated: boolean };

  if (!isAuthenticated) {
    // This shouldn't happen due to the loader, but just in case
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <nav>{/* Add navigation for protected routes */}</nav>
      <Outlet />
    </div>
  );
}

export default ProtectedLayout;
