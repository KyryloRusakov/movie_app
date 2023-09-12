import { Navigate } from 'react-router-dom';
import { useAuth } from 'hook/useAuth';

const HomePage = () => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <div className="container" style={{ color: 'white', fontSize: '24px' }}>Home</div>
  ) : (
    <Navigate to="/login" />
  );
};
export { HomePage };
