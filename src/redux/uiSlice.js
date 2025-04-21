import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  accessibleMode: JSON.parse(localStorage.getItem('accessibleMode')) || false,
  isOffline: !navigator.onLine,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    toggleAccessibleMode: (state) => {
      state.accessibleMode = !state.accessibleMode;
      localStorage.setItem('accessibleMode', state.accessibleMode);
    },
    setNetworkStatus: (state, action) => {
      state.isOffline = action.payload;
    }
  }
});

export const { toggleTheme, toggleAccessibleMode, setNetworkStatus } = uiSlice.actions;
export default uiSlice.reducer;
