import React, { useEffect, useState } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'fab30af0c86949df3573cee27a305bb0';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("Ошибка при получении списка фильмов:", error);
      }
    };

    fetchMovies();
  }, []);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <div className="container">
      <h1 className="movies">Movies</h1>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movies-item">
            <img
              className="movies-img"
              src={imageBaseUrl + movie.poster_path}
              alt={movie.title}
            />
            <span className="movies-title">{movie.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
