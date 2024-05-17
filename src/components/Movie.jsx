import { Link } from 'react-router-dom';
import placeholder from 'assets/placeholder.jpg';
import { IMAGE_BASE_URL } from 'constants/api';

const Movie = ({ movie }) => {
  const posterPath = movie.poster_path
    ? IMAGE_BASE_URL + movie.poster_path
    : placeholder;

  return (
    <li className="movies-item">
      <Link to={`/movie_app/movie/${movie.id}`}>
        <img className="movies-img" src={posterPath} alt={movie.title} />
        <span className="movies-title">{movie.title}</span>
      </Link>
    </li>
  );
};

export default Movie;
