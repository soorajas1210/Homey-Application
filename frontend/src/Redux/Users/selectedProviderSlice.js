import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false , error: null };

export const selectedProviderSlice = createSlice({
  name: "providerSearch",
  initialState,
  reducers: {
    selectedProviderReq: (state, action) => {
      state.loading = true;
    },
    selectedProviderSuccess: (state, action) => {
      state.loading = false;
      state.successData = action.payload;
    },
    selectedProviderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default selectedProviderSlice.reducer;

export const { selectedProviderFail,selectedProviderReq,selectedProviderSuccess} =
  selectedProviderSlice.actions;
