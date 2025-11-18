import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    id: 'demo_user',
    name: 'Demo User',
    email: 'demo@example.com',
    avatarUrl: 'https://i.pravatar.cc/40?u=demo_user',
  },
  isAuthenticated: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
