import { Link } from 'react-router-dom';
import logo from 'assets/logo.svg';
import { useAuth } from 'hook/useAuth';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="container header">
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
    </header>
  );
};

export { Header };
