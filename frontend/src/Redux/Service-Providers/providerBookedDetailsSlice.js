import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false , error: null };

export const providerBookedDetailsSlice = createSlice({
  name: "providerBookedDetails",
  initialState,
  reducers: {
    providerBookedDetailsReq: (state, action) => {
      state.loading = true;
    },
    providerBookedDetailsSuccess: (state, action) => {
      state.loading = false;
      state.providerBookedDetails = action.payload;
    },
    providerBookedDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default providerBookedDetailsSlice.reducer;

export const {
  providerBookedDetailsFail,
  providerBookedDetailsReq,
  providerBookedDetailsSuccess,
} = providerBookedDetailsSlice.actions;
