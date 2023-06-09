import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  // const [active, setActive] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiKey = "fab30af0c86949df3573cee27a305bb0";
        let apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovieDetail(data);
        setMovieGenres(data.genres);
        console.log(data);
      } catch (error) {
        console.error("Error when fetching details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  // const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Проверка наличия фильма в списке выбранных при загрузке страницы
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isMovieInFavorites = favorites.some(
      (favMovie) =>       {
        console.log(favMovie.id) 
        return favMovie.id === +id}
      );
      setIsFavorite(isMovieInFavorites);
      console.log(isMovieInFavorites);
      console.log(favorites);
      console.log(id);

  }, [id]);

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log(favorites);

    if (isFavorite) {
      // Удаление фильма из списка выбранных
      const updatedFavorites = favorites.filter(
        (favMovie) => favMovie.id !== movieDetail.id
      );
      setIsFavorite(false);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Добавление фильма в список выбранных
      favorites.push(movieDetail);
      setIsFavorite(true);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  // if (!movie) {
  //   return <p>Loading...</p>;
  // }

  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <div className="container">
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
              {movieGenres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index === movieGenres.length - 1 ? "" : ","}
                </span>
              ))}
            </div>
            <div className="movie-detail-runtime">{movieDetail.runtime}m</div>
          </div>
          <div className="movie-detail-rate">
            <span className="movie-detail-rate-value">
              {Number(movieDetail.vote_average).toFixed(1)}
            </span>
          </div>
          {/* <button
            className={active ? "btn-favorite active" : "btn-favorite"}
            onClick={addToFavorites}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              class="bi bi-heart"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                fill="white"
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                className="icon-favorite"
              />
            </svg>
          </button> */}
          <button onClick={addToFavorites}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          <div className="movie-detail-overview">{movieDetail.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
