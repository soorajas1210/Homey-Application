import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const userBlockSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    userBlockReq: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    userBlockSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    userBlockFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default userBlockSlice.reducer;
export const { userBlockReq, userBlockSuccess, userBlockFail } =
  userBlockSlice.actions;
