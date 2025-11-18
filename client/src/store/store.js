import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import uiReducer from './uiSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    ui: uiReducer,
    user: userReducer,
  },
});

export default store;
export { store };
