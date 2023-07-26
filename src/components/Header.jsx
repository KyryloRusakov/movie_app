import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../components/hook/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="header">
      <Link to="/movies" className="header-logo">
        Movies
      </Link>
      <div className="header-links">
        <Link to="/favorites" className="header-nav">
          Favorites
        </Link>
        {user ? (
          <Link to="/profile" className="header-nav">
            <span>{user.name}</span>
          </Link>
        ) : (
          <Link to="/" className="header-nav">
            <span>Log In</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
