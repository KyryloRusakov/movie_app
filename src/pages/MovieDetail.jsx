import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setMovieDetail,
  addToFavorites,
  removeFromFavorites,
} from "../store/movieSlice";
import Loader from './../components/Loader';

const MovieDetail = () => {
   const dispatch = useDispatch();
   const { movieDetail, favorites, genres } = useSelector((state) => state.movies);
   const { id } = useParams();
   const [loadingPoster, setLoadingPoster] = useState(true);
   const isFavorite = favorites.some((favMovie) => favMovie.id === +id);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoadingPoster(true);
        const apiKey = "fab30af0c86949df3573cee27a305bb0";
        let apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        dispatch(setMovieDetail(data));
        console.log(data);
        setLoadingPoster(false);
      } catch (error) {
        console.error("Error when fetching details:", error);
      }
    };

    fetchMovie();
  }, [dispatch, id]);

  const addToFavoritesHandler = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movieDetail));
    } else {
      dispatch(addToFavorites(movieDetail));
    }
  };

  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

    if (!movieDetail) {
      return <div>Загрузка...</div>;
    }

  return (
    <div className="container">
        {loadingPoster ? (
          <Loader />
        ) : (
          <div className="movie-detail">
            <img
              className="movies-img"
              src={imageBaseUrl + movieDetail.poster_path}
              alt={movieDetail.title}
            />
            <div className="movie-detail-info">
              <span className="movie-detail-name">{movieDetail.title}</span>
              <div className="movie-detail-facts">
                <div className="movie-detail-genres">
                  {movieDetail.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index === genres.length - 1 ? "" : ","}
                    </span>
                  ))}
                </div>
                <div className="movie-detail-runtime">{movieDetail.runtime}m</div>
              </div>
              <div className="movie-detail-actions">
                <div className="movie-detail-rate">
                  <span className="movie-detail-rate-value">
                    {Number(movieDetail.vote_average).toFixed(1)}
                  </span>
                </div>
                <button
                  className={isFavorite ? "btn-favorite active" : "btn-favorite"}
                  onClick={addToFavoritesHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path
                      fill="white"
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      className="icon-favorite"
                    />
                  </svg>
                </button>
              </div>
              <div className="movie-detail-overview">{movieDetail.overview}</div>
            </div>
          </div>
        )}
    </div>
  );
};

export default MovieDetail;
