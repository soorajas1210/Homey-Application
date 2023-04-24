import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, providers: [], error: null };

export const searchProviderSlice = createSlice({
  name: "providerSearch",
  initialState,
  reducers: {
    searchProviderReq: (state, action) => {
      state.loading = true;
    },
    searchProviderSuccess: (state, action) => {
      state.loading = false;
      state.providers = action.payload;
    },
    searchProviderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default searchProviderSlice.reducer;

export const { searchProviderFail,searchProviderReq,searchProviderSuccess} =
  searchProviderSlice.actions;
