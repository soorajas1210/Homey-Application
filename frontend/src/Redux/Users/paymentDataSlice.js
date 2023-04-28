import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  paymentData: null,
  smessage: null,
  error: null,
};

export const paymentDataSlice = createSlice({
  name: " paymentData",
  initialState,
  reducers: {
    paymentDataReq: (state, action) => {
      state.loading = true;
    },
    paymentDataSuccess: (state, action) => {
      state.loading = false;
      state.paymentData = action.payload;
      
    },
    paymentDataFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default paymentDataSlice.reducer;

export const { paymentDataFail, paymentDataReq, paymentDataSuccess } =
  paymentDataSlice.actions;
