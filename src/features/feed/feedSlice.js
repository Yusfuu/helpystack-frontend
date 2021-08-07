// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   postID: null
// };

// export const feedSlice = createSlice({
//   name: 'feed',
//   initialState,
//   reducers: {
//     setCommentVisible: (state, action) => {
//       state.feed = action.payload;
//     },
//     setPostID: (state, action) => {
//       state.feed = action.payload;
//     },
//   },
// });

// export const { setCommentVisible, setPostID } = feedSlice.actions;

// export const selectFeed = (state) => state.feed;

// export default feedSlice.reducer;

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