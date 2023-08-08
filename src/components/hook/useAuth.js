import { useContext } from 'react';
import { AuthContext } from 'components/routing/AuthProvider';

export function useAuth() {
  return useContext(AuthContext);
}
