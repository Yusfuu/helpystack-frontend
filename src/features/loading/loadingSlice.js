import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  progress: 0,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    progressFinished: (state) => {
      state.progress = 0;
    },
  },
});

export const { setProgress, progressFinished } = loadingSlice.actions;

export const selectLoading = (state) => state.progress.progress;

export default loadingSlice.reducer;