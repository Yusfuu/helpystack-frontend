import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from '../features/loading/loadingSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    progress: loadingSlice
  },
});
