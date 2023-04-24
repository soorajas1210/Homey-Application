import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: null,
};

const getUserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserInfoReq: (state, action) => {
      state.loading = true;
    },
    getUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.getUserInfo = action.payload;
    },
    getUserInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserInfoFail,getUserInfoReq,getUserInfoSuccess } =
  getUserInfoSlice.actions;

export default getUserInfoSlice.reducer;
