import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import MovieList from './../components/Movies';
import FilterGenres from "../components/Filters/FilterGenres";
import FilterLanguages from "../components/Filters/FilterLanguages";
import Search from './../components/Search';
import Pagination from './../components/Pagination';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "fab30af0c86949df3573cee27a305bb0";
        let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`;

        if (searchQuery) {
          apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovies(data.results);
        //setTotalPages(data.total_pages) max 500 pages, but total_pages = 38545;
        setTotalPages(500);
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
      } catch (error) {
        console.error("Ошибка при получении списка жанров:", error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const apiKey = "fab30af0c86949df3573cee27a305bb0";
        const response = await fetch(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`
        );
        const data = await response.json();
        setLanguages(data);
        console.log(data);
      } catch (error) {
        console.error("Ошибка при получении языков:", error);
      }
    };

    fetchMovies();
    fetchGenres();
    fetchLanguages();
  }, [searchQuery, currentPage]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredMovies = movies.filter((movie) => {
    if (selectedGenre && selectedLanguage) {
      return (
        movie.genre_ids.includes(parseInt(selectedGenre)) &&
        movie.original_language === selectedLanguage
      );
    } else if (selectedGenre) {
      return movie.genre_ids.includes(parseInt(selectedGenre));
    } else if (selectedLanguage) {
      return movie.original_language === selectedLanguage;
    }
    return true;
  });

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
      <MovieList movies={filteredMovies} />
      <Pagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Movies;
