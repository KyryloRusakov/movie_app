import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from 'assets/logo.svg';
import { useAuth } from 'hook/useAuth';

const Header = () => {
  const { isAuth } = useAuth();
  const { name } = useSelector((state) => state.user);

  return (
    <header className="container header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="logo" />
      </Link>
      <div className="header-links">
        <Link to="/movies" className="header-nav">
          Movies
        </Link>
        <Link to="/series" className="header-nav">
          Series
        </Link>
        <Link to="/favorites" className="header-nav">
          Favorites
        </Link>
        {isAuth ? (
          <Link to="/profile" className="header-nav icon-user">
            <span>{name}</span>
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
