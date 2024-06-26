import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoviesList from 'components/MoviesList';
import FilterGenres from 'components/filters/FilterGenres';
import FilterLanguages from 'components/filters/FilterLanguages';
import Search from 'components/Search';
import Pagination from 'components/Pagination';
import {
  fetchMovies,
  setGenres,
  setLanguages,
  setSearchQuery,
  setCurrentPage,
} from '../store/movieSlice';
import { BASE_URL } from '../constants/api';
import Loader from '../components/Loader';

const MoviesPage = () => {
  const dispatch = useDispatch();
  const {
    genres,
    languages,
    selectedGenre,
    selectedLanguage,
    searchQuery,
    currentPage,
    totalPages,
    loading,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(
      fetchMovies({
        currentPage,
        searchQuery,
        selectedGenre,
        selectedLanguage,
      }),
    );

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,
        );
        const data = await response.json();
        dispatch(setGenres(data.genres));
      } catch (error) {
        console.error('Error while getting list of genres:', error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/configuration/languages?api_key=${process.env.REACT_APP_API_KEY}`,
        );
        const data = await response.json();
        dispatch(setLanguages(data));
      } catch (error) {
        console.error('Error while getting languages:', error);
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <MoviesList />
          <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export { MoviesPage };
