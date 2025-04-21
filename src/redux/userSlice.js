import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  username: localStorage.getItem('username') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload;
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('username', action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = '';
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
