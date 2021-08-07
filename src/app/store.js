import { configureStore } from '@reduxjs/toolkit';
import feedSlice from '../features/feed/feedSlice';
import loadingSlice from '../features/loading/loadingSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    progress: loadingSlice,
    feed: feedSlice
  },
});
