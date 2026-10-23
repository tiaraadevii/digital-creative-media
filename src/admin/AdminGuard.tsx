import { Navigate } from 'react-router-dom';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const isAuth =
    sessionStorage.getItem('dcm_admin') === 'authenticated' ||
    localStorage.getItem('dcm_admin') === 'authenticated';

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
