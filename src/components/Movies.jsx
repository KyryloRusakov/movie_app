import React from "react";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <ul className="movies-list">
      {props.movies.map((movie) => (
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
      ))}
    </ul>
  );
};

export default MovieList;