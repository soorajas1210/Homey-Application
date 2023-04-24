import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, provider: [], error: null };

export const providerListSlice = createSlice({
  name: " providerList",
  initialState,
  reducers: {
    providerListReq: (state, action) => {
      state.loading = true;
    },
    providerListSuccess: (state, action) => {
      state.loading = false;
      state.provider = action.payload;
    },
    providerListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default providerListSlice.reducer;

export const { providerListFail,providerListReq,providerListSuccess } =
  providerListSlice.actions;
