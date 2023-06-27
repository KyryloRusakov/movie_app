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
  setSearchQuery,
  setCurrentPage,
} from "./../store/movieSlice";
import { API_KEY, BASE_URL } from "../constants/constants";

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
    dispatch(
      fetchMovies({
        API_KEY,
        currentPage,
        searchQuery,
        selectedGenre,
        selectedLanguage,
      })
    );

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
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
          `${BASE_URL}/configuration/languages?api_key=${API_KEY}`
        );
        const data = await response.json();
        dispatch(setLanguages(data));
      } catch (error) {
        console.error("Ошибка при получении языков:", error);
      }
    };

    fetchGenres();
    fetchLanguages();
  }, [dispatch, currentPage, searchQuery, selectedGenre, selectedLanguage]);

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
        <FilterGenres genres={genres} selectedGenre={selectedGenre} />
        <FilterLanguages
          languages={languages}
          selectedLanguage={selectedLanguage}
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
