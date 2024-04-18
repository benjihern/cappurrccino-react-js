import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../Hooks/useAuth.js';

export default function AuthRoute({ children }) {
  const location = useLocation();
  const { user } = useAuth();
  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}