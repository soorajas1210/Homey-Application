import { createSlice } from "@reduxjs/toolkit";

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  loading: false,
  adminInfo: adminInfoFromStorage,
  error: null,
};

const adminSigninSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoginReq: (state, action) => {
      state.loading = true;
    },
    adminLoginSuccess: (state, action) => {
      state.loading = false;
      state.adminInfo = action.payload;
    },
    adminLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminLogout: (state, action) => {
      state.adminInfo= null;
      state.error = null;
    },
  },
});

export const { adminLoginFail,adminLoginSuccess,adminLoginReq,adminLogout } =
  adminSigninSlice.actions;

export default adminSigninSlice.reducer;
