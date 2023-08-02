import { useContext } from 'react';
import { AuthContext } from '../routing/AuthProvider';

export function useAuth() {
  return useContext(AuthContext);
}
