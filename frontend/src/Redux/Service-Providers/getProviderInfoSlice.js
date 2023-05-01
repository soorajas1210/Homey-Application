import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const getProviderInfoSlice = createSlice({
  name: "providerInfo",
  initialState,
  reducers: {
    getProviderInfoReq: (state, action) => {
      state.loading = true;
    },
    getProviderInfoSuccess: (state, action) => {
      state.loading = false;
      state.providerInfo = action.payload;
    },
    getProviderInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getProviderInfoFail, getProviderInfoReq, getProviderInfoSuccess } =
  getProviderInfoSlice.actions;

export default getProviderInfoSlice.reducer;
