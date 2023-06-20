import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import MoviesFavoriteList from "../components/MoviesFavoriteList";
import { useSelector } from "react-redux";

const Favorites = () => {
  // const [storedFavorites, setFavorites] = useState([]);  
  const { favorites } = useSelector((state) => state.movies);

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

  // useEffect(() => {
  //   // Получение данных из localStorage
  //   const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  //   setFavorites(storedFavorites);
  // }, []);

  // const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <div className="container">
      <Header />
      <h2 className="favorites-title">My Favorites</h2>
      {favorites.length === 0 ? (
        <span>No favorite movies yet.</span>
      ) : (
        <MoviesFavoriteList movies={favorites} />
      )}
    </div>
  );
};

export default Favorites;
