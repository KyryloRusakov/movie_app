import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Функция для добавления фильма в список выбранных
  // const addToFavorites = (movie) => {
  //   setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
  // };

  // // Функция для удаления фильма из списка выбранных
  // const removeFromFavorites = (movie) => {
  //   setFavoriteMovies((prevFavorites) =>
  //     prevFavorites.filter((favMovie) => favMovie.id !== movie.id)
  //   );
  // };

  useEffect(() => {
    // Получение данных из localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  // const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // favorites.push(favoriteMovies)
  // console.log(favorites);

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <span>No favorite movies yet.</span>
      ) : (
        <ul>
        {favorites.map((movie) => (
          <li key={movie.id}>
            <img src={imageBaseUrl + movie.poster_path} alt={movie.title} />
            <h3>{movie.title}</h3>
          </li>
        ))}
      </ul>
      )
      }
    </div>
  );
};

export default Favorites;
