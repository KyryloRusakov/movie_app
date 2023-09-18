import { useSelector } from 'react-redux';

export function useAuth() {
  const { email, name } = useSelector((state) => state.user);

  return {
    isAuth: !!email,
    name,
    email,
  };
}
