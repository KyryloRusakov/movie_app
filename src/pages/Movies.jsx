import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./../components/Header";
import MoviesList from "../components/MoviesList";
import FilterGenres from "../components/Filters/FilterGenres";
import FilterLanguages from "../components/Filters/FilterLanguages";
import Search from "./../components/Search";
import Pagination from "./../components/Pagination";
import {
  fetchMovies,
  setGenres,
  setLanguages,
  setSelectedGenre,
  setSelectedLanguage,
  setSearchQuery,
  setCurrentPage,
} from "./../store/movieSlice";

const Movies = () => {
  const dispatch = useDispatch();
  const {
    genres,
    languages,
    selectedGenre,
    selectedLanguage,
    searchQuery,
    currentPage,
    totalPages,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    const apiKey = "fab30af0c86949df3573cee27a305bb0";

    dispatch(fetchMovies({ apiKey, currentPage, searchQuery }));

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        const data = await response.json();
        dispatch(setGenres(data.genres));
      } catch (error) {
        console.error("Ошибка при получении списка жанров:", error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`
        );
        const data = await response.json();
        dispatch(setLanguages(data));
      } catch (error) {
        console.error("Ошибка при получении языков:", error);
      }
    };

    fetchGenres();
    fetchLanguages();
  }, [dispatch, currentPage, searchQuery]);

  const handleGenreChange = (event) => {
    dispatch(setSelectedGenre(event.target.value));
  };

  const handleLanguageChange = (event) => {
    dispatch(setSelectedLanguage(event.target.value));
  };

  const handleSearchInputChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  

  return (
    <div className="container">
      <Header />
      <div className="movies-filter">
        <FilterGenres
          genres={genres}
          selectedGenre={selectedGenre}
          handleGenreChange={handleGenreChange}
        />
        <FilterLanguages
          languages={languages}
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
        />
        <Search
          searchQuery={searchQuery}
          handleSearchInputChange={handleSearchInputChange}
        />
      </div>
      <MoviesList />
      <Pagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Movies;
