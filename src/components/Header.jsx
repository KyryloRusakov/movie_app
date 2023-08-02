import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './hook/useAuth';

function Header() {
  const { user } = useAuth();

  return (
    <div className="header">
      <Link to="/movies" className="header-logo">
        <svg
          width="64px"
          height="64px"
          viewBox="0 0 1024 1024"
          className="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          transform="rotate(180)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <path
              d="M960 877.287L406.033 512 960 146.713z"
              fill="#2577FF"
            />
            <path
              d="M617.967 877.287L64 512l553.967-365.287z"
              fill="#FF3B30"
            />
            <path
              d="M617.967 651.749l14.956 9.862 41.132-326.344-56.088 36.984z"
              fill="#070707"
            />
          </g>
        </svg>
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
}

export default Header;
