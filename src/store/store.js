import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movieSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});
