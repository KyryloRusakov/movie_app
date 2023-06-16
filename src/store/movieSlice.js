// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchMovies = createAsyncThunk(
//   "movies/fetchMovies",
//   async function () {
//     const apiKey = "fab30af0c86949df3573cee27a305bb0";
//     let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

//     // if (searchQuery) {
//     //   apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`;
//     // }

//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     console.log(data);
//     return data;
//   }
// );

// const movieSlice = createSlice({
//   name: "movies",
//   initialState: {
//     movies: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // fetchMovies(state, action) {
//     //   console.log(state);
//     //   console.log(action);
//     // },
//     // fetchGenres() {},
//     // fetchLanguages() {},
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMovies.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMovies.fulfilled, (state, action) => {
//         state.movies = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchMovies.rejected, (state, action) => {
//         state.error = action.error.message;
//         state.loading = false;
//       });
//   },
// });

// //fetchMovies
// // export const {  fetchGenres, fetchLanguages } = movieSlice.actions;

// export default movieSlice.reducer;
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
} = moviesSlice.actions;

export default moviesSlice.reducer;