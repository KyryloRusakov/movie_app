import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from 'assets/logo.svg';
import { useAuth } from 'hook/useAuth';

const Header = () => {
  const { isAuth } = useAuth();
  const { name } = useSelector((state) => state.user);

  return (
    <header className="container header">
      <NavLink to="/movie_app" className="header-logo">
        <img src={logo} alt="logo" />
      </NavLink>
      <div className="header-links">
        <NavLink to="/movie_app/movies" className="header-nav">
          Movies
        </NavLink>
        <NavLink to="/movie_app/series" className="header-nav">
          Series
        </NavLink>
        <NavLink to="/movie_app/favorites" className="header-nav">
          Favorites
        </NavLink>
        {isAuth ? (
          <NavLink to="/movie_app/profile" className="header-nav icon-user">
            <span>{name}</span>
          </NavLink>
        ) : (
          <NavLink to="/movie_app/login" className="header-nav icon-user">
            <span>Log In</span>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export { Header };
