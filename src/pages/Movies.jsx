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

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      Movies
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={imageBaseUrl + movie.poster_path} alt={movie.title} />
            {movie.title}
            {movie.release_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
