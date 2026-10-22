import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = sessionStorage.getItem('dcm_admin');
    if (!auth) {
      navigate('/admin/login', { replace: true, state: { from: location } });
    }
  }, [navigate, location]);

  const auth = sessionStorage.getItem('dcm_admin');
  if (!auth) return null;

  return <>{children}</>;
}
