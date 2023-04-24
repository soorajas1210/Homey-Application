import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};

const providerRejectSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    providerRejectSuccess: (state, action) => {
      state.provider = action.payload;
      state.success = true;
    },

    providerRejectFail: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default providerRejectSlice.reducer;
export const { providerRejectFail,providerRejectSuccess} =
  providerRejectSlice.actions;
