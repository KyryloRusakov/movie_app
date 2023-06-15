import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "todos/fetchMovies",
  async function (currentPage, searchQuery) {
    const apiKey = "fab30af0c86949df3573cee27a305bb0";
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`;

    if (searchQuery) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
  },
  reducers: {
    // fetchMovies(state, action) {
    //   console.log(state);
    //   console.log(action);
    // },
    fetchGenres() {},
    fetchLanguages() {},
  },
});

//fetchMovies
export const {  fetchGenres, fetchLanguages } = movieSlice.actions;

export default movieSlice.reducer;