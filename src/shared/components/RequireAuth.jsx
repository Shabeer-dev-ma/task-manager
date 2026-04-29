import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../features/auth/store/useAuthStore'

// Wrap any route element with this to redirect unauthenticated users to /login
export function RequireAuth({ children }) {
  const token    = useAuthStore(s => s.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}
