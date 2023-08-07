import { Link } from 'react-router-dom';
import { useAuth } from './hook/useAuth';
import logo from '../assets/logo.svg';

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="header">
      <Link to="/movies" className="header-logo">
        <img src={logo} alt="logo" />
      </Link>
      <div className="header-links">
        <Link to="/favorites" className="header-nav">
          Favorites
        </Link>
        {user ? (
          <Link to="/profile" className="header-nav icon-user">
            <span>{user.name}</span>
          </Link>
        ) : (
          <Link to="/" className="header-nav icon-user">
            <span>Log In</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
