import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (params) => {
    const { apiKey, currentPage, searchQuery } = params;
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`;

    if (searchQuery) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
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
      state.favorites.push(action.payload);
    },

    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (favMovie) => favMovie.id !== action.payload.id
      );
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