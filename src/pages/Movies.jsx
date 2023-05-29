import React, { useEffect, useState } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "fab30af0c86949df3573cee27a305bb0";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        setMovies(data.results);
        console.log(data);
      } catch (error) {
        console.error("Ошибка при получении списка фильмов:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const apiKey = "fab30af0c86949df3573cee27a305bb0";  
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        const data = await response.json();
        setGenres(data.genres);
        console.log(data);
      } catch (error) {
        console.error("Ошибка при получении списка жанров:", error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      )
    : movies;

  return (
    <div className="container">
      <h1 className="movies">Movies</h1>
      <div>
        <label htmlFor="genre">Genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <ul className="movies-list">
        {filteredMovies.map((movie) => (
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
