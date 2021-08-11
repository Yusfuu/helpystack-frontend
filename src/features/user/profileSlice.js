import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id: null,
  isOpen: false
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.user_id = action.payload;
    },
    setVisible: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setUserID, setVisible } = profileSlice.actions;

export const selectProfileUser = (state) => state.profileUser;

export default profileSlice.reducer;
