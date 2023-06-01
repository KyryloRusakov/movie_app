import React, { useEffect, useState } from "react";

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

  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

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

 const renderPageNumbers = () => {
   const pageNumbers = [];

   // Добавляем первую страницу
   pageNumbers.push(
     <button
       key={1}
       onClick={() => handlePageChange(1)}
       disabled={currentPage === 1}
     >
       1
     </button>
   );

   // Добавляем страницы между первой и последней
   let startPage = currentPage - 2;
   let endPage = currentPage + 2;

   if (startPage <= 1) {
     startPage = 2;
     endPage = Math.min(startPage + 4, totalPages - 1);
   }

   if (endPage >= totalPages) {
     endPage = totalPages - 1;
     startPage = Math.max(endPage - 4, 2);
   }

   if (startPage > 2) {
     pageNumbers.push(<span key="ellipsis-start">...</span>);
   }

   for (let page = startPage; page <= endPage; page++) {
     pageNumbers.push(
       <button
         key={page}
         onClick={() => handlePageChange(page)}
         disabled={currentPage === page}
       >
         {page}
       </button>
     );
   }

   if (endPage < totalPages - 1) {
     pageNumbers.push(<span key="ellipsis-end">...</span>);
   }

   // Добавляем последнюю страницу
   if (totalPages > 1) {
     pageNumbers.push(
       <button
         key={totalPages}
         onClick={() => handlePageChange(totalPages)}
         disabled={currentPage === totalPages}
       >
         {totalPages}
       </button>
     );
   }

   return pageNumbers;
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
      <h1 className="movies">Movies</h1>
      <div className="movies-filter">
        <div>
          <label htmlFor="genre" className="movies-label">
            Genre:
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="movies-select"
          >
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="language" className="movies-label">
            Languages:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="movies-select"
          >
            <option value="">All</option>
            {languages.map((language) => (
              <option key={language.iso_639_1} value={language.iso_639_1}>
                {language.english_name}
              </option>
            ))}
          </select>
        </div>
        <div className="movies-search-wrapper">
          <label htmlFor="search" className="movies-label">
            Search:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Enter movie title"
            className="movies-search"
          />
        </div>
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

      <div>
        <button
          onClick={handlePageChange.bind(null, currentPage - 1)}
          disabled={currentPage === 1}
        >
          Назад
        </button>
        {renderPageNumbers()}
        <button
          onClick={handlePageChange.bind(null, currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default Movies;
