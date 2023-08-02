import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => (
  <div className="container">
    <div className="error">
      <div className="error-title">Page not found</div>
      <Link to="/movies" className="error-button-link">
        <button className="error-button">Back to Movies page</button>
      </Link>
    </div>
  </div>
);

export default Error;
