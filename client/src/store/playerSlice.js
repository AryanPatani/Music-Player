import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,
  volume: 0.7,
  progress: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.progress = 0;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    nextSong: (state) => {
      if (state.queue.length > 0 && state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1;
        state.currentSong = state.queue[state.currentIndex];
        state.isPlaying = true;
        state.progress = 0;
      }
    },
    previousSong: (state) => {
      if (state.queue.length > 0 && state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentSong = state.queue[state.currentIndex];
        state.isPlaying = true;
        state.progress = 0;
      }
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
      state.currentIndex = 0;
      if (action.payload.length > 0) {
        state.currentSong = action.payload[0];
      }
      state.isPlaying = false;
      state.progress = 0;
    },
    startQueue: (state, action) => {
      const { queue, index = 0 } = action.payload;
      state.queue = queue || [];
      state.currentIndex = index;
      state.currentSong = state.queue[state.currentIndex] || null;
      state.isPlaying = !!state.currentSong;
      state.progress = 0;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const {
  playSong,
  pauseSong,
  togglePlayPause,
  nextSong,
  previousSong,
  setQueue,
  startQueue,
  setVolume,
  setProgress,
} = playerSlice.actions;

export default playerSlice.reducer;
