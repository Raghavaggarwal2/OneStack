import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // TODO: Implement actual auth check
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 