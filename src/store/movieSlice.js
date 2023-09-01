import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'constants/api.js';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params) => {
    const {
      currentPage,
      searchQuery,
      selectedGenre,
      selectedLanguage,
    } = params;
    let apiUrl = `${BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`;

    if (searchQuery) {
      apiUrl = `${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}&page=${currentPage}`;
    } else if (selectedGenre && selectedLanguage) {
      apiUrl = `${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${selectedGenre}&with_original_language=${selectedLanguage}&page=${currentPage}`;
    } else if (selectedGenre) {
      apiUrl = `${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${selectedGenre}&page=${currentPage}`;
    } else if (selectedLanguage) {
      apiUrl = `${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=${selectedLanguage}&page=${currentPage}`;
    }

    try {
      const response = await axios.get(apiUrl);
      let totalPages = response.data.total_pages;
      const movies = response.data.results;
      if (totalPages > 100) {
        totalPages = 100;
      }
      return { movies, totalPages };
    } catch (error) {
      console.error('Error while getting movies:', error);
      throw error;
    }
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
    genres: [],
    languages: [],
    selectedGenre: '',
    selectedLanguage: '',
    searchQuery: '',
    currentPage: 1,
    movieDetail: null,
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
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
      const updatedFavorites = [...state.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      state.favorites = updatedFavorites;
    },
    removeFromFavorites: (state, action) => {
      const updatedFavorites = state.favorites.filter(
        (favMovie) => favMovie.id !== action.payload.id,
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      state.favorites = updatedFavorites;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.totalPages = action.payload.totalPages;
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
