import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, payments: [], error: null };

export const paymentInfoSlice = createSlice({
  name: "paymentInfo",
  initialState,
  reducers: {
    paymentInfoReq: (state, action) => {
      state.loading = true;
    },
    paymentInfoSuccess: (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    },
    paymentInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default paymentInfoSlice.reducer;

export const { paymentInfoFail, paymentInfoReq, paymentInfoSuccess } =
  paymentInfoSlice.actions;
