import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import MoviesFavoriteList from '../components/MoviesFavoriteList';

const Favorites = () => {
  const { favorites } = useSelector((state) => state.movies);

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
