import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const providerBlockSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    providerBlockReq: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    providerBlockSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    providerBlockFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default providerBlockSlice.reducer;
export const {providerBlockFail,providerBlockReq,providerBlockSuccess} =
  providerBlockSlice.actions;
