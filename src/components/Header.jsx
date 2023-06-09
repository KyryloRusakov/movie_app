import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <Link to="/movies" className="header-logo">
        Movies
      </Link>
      <Link to="/favorites" className="header-nav">
        Favorites
      </Link>
    </div>
  );
}

export default Header