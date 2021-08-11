import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentVisible: false,
  postID: null,
  page: 1,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPostID: (state, { payload }) => {
      state.postID = payload;
    },
    setCommentVisible: (state, { payload }) => {
      state.commentVisible = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
  },
});

export const { setPostID, setCommentVisible, setPage } = feedSlice.actions;

export const selectFeed = (state) => state.feed;

export default feedSlice.reducer;