import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};

const providerVerifySlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    providerVerifySuccess: (state, action) => {
      state.provider = action.payload;
      state.success = true;
    },

    providerVerifyFail: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default providerVerifySlice.reducer;
export const { providerVerifyFail,providerVerifySuccess} =
  providerVerifySlice.actions;
