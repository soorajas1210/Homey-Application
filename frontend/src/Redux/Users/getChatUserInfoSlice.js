import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const getChatUserInfoSlice = createSlice({
  name: "chatUserInfo",
  initialState,
  reducers: {
    getChatUserInfoReq: (state, action) => {
      state.loading = true;
    },
    getChatUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.chatUserInfo = action.payload;
    },
    getChatUserInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getChatUserInfoFail, getChatUserInfoReq, getChatUserInfoSuccess } =
  getChatUserInfoSlice.actions;

export default getChatUserInfoSlice.reducer;
