import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const [isAuth, setIsAuth] = useState(true);

  return isAuth ? (
    <div className="container" style={{ color: 'white', fontSize: '24px' }}>Home</div>
  ) : (
    <Navigate to="/login" />
  );
};
export { HomePage };
