import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
