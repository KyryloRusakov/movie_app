import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from "../constants/constants.js";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (params) => {
    const { API_KEY, currentPage, searchQuery } = params;
    let apiUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`;

    if (searchQuery) {
      apiUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${currentPage}`;
    }

     try {
       const response = await axios.get(apiUrl);
       return response.data.results;
     } catch (error) {
       console.error("Ошибка при получении фильмов:", error);
       throw error;
     }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
    genres: [],
    languages: [],
    selectedGenre: "",
    selectedLanguage: "",
    searchQuery: "",
    currentPage: 1,
    totalPages: 500,
    movieDetail: null,
    favorites: [],
  },
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
    addToFavorites: (state, action) => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = [...storedFavorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = storedFavorites.filter(
        (favMovie) => favMovie.id !== action.payload.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      state.favorites = updatedFavorites;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const {
  setGenres,
  setLanguages,
  setSelectedGenre,
  setSelectedLanguage,
  setSearchQuery,
  setCurrentPage,
  setMovieDetail,
  addToFavorites,
  removeFromFavorites,
} = moviesSlice.actions;

export default moviesSlice.reducer;
