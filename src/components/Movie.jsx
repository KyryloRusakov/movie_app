import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../public/img/placeholder.jpg";

const Movie = ({ movie }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
  const posterPath = movie.poster_path
    ? imageBaseUrl + movie.poster_path
    : placeholder;

  return (
    <li className="movies-item">
      {/* {placeholder} */}
      <Link to={`/movie/${movie.id}`}>
        <img className="movies-img" src={posterPath} alt={movie.title} />
        <span className="movies-title">{movie.title}</span>
      </Link>
    </li>
  );
};

export default Movie;
