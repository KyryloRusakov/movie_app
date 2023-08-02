import React from 'react';
import { useSelector } from 'react-redux';
import Movie from './Movie';

function MovieList() {
  const moviesData = useSelector((state) => state.movies.movies);
  const movies = moviesData?.movies || [];

  const { selectedGenre, selectedLanguage } = useSelector(
    (state) => state.movies,
  );

  const filteredMovies = movies.filter((movie) => {
    if (selectedGenre && selectedLanguage) {
      return (
        movie.genre_ids.includes(Number(selectedGenre))
        && movie.original_language === selectedLanguage
      );
    } if (selectedGenre) {
      return movie.genre_ids.includes(Number(selectedGenre));
    } if (selectedLanguage) {
      return movie.original_language === selectedLanguage;
    }
    return true;
  });

  return (
    <ul className="movies-list">
      {filteredMovies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
