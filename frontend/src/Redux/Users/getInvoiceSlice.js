import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false ,invoice:null, error: null };

export const getInvoiceSlice = createSlice({
  name: " getCategoryList",
  initialState,
  reducers: {
    getInvoiceReq: (state, action) => {
      state.loading = true;
    },
    getInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.invoice = action.payload;
    },
    getInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default getInvoiceSlice.reducer;

export const { getInvoiceFail, getInvoiceReq, getInvoiceSuccess } =
  getInvoiceSlice.actions;
