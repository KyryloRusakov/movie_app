import React from "react";
import Movie from "./Movie";
import { useSelector } from "react-redux";

const MovieList = () => {
  const moviesData = useSelector((state) => state.movies.movies);
  console.log(moviesData);
  const movies = moviesData?.movies || [];
  console.log(movies); // Проверяем наличие свойства movies и распаковываем его, иначе используем пустой массив

  const { selectedGenre, selectedLanguage } = useSelector(
    (state) => state.movies
  );

  const filteredMovies = movies.filter((movie) => {
    if (selectedGenre && selectedLanguage) {
      return (
        movie.genre_ids.includes(parseInt(selectedGenre)) &&
        movie.original_language === selectedLanguage
      );
    } else if (selectedGenre) {
      return movie.genre_ids.includes(parseInt(selectedGenre));
    } else if (selectedLanguage) {
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
};

export default MovieList;
