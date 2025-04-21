import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/mockData.json');
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      return data.messages;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: JSON.parse(localStorage.getItem('chatMessages')) || [],
    loading: false,
    error: null,
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));
    },
    clearChat: (state) => {
      state.messages = [];
      localStorage.removeItem('chatMessages');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
        localStorage.setItem('chatMessages', JSON.stringify(state.messages));
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { sendMessage, receiveMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
