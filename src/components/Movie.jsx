import React from 'react';
import { Link } from "react-router-dom";

const Movie = ({movie}) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <li key={movie.id} className="movies-item">
      <Link to={`/movie/${movie.id}`}>
        <img
          className="movies-img"
          src={imageBaseUrl + movie.poster_path}
          alt={movie.title}
        />
        <span className="movies-title">{movie.title}</span>
      </Link>
    </li>
  );
}

export default Movie