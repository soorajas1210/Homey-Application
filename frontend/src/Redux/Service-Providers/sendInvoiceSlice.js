import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  smessage: null,
  error: null,
};

const sendInvoiceSlice = createSlice({
  name: "sendInvoice",
  initialState,
  reducers: {
    sendInvoiceReq: (state, action) => {
      state.loading = true;
    },
    sendInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.smessage = "Send Successfully";
    },
    afterSendInvoiceSuccess: (state, action) => {
      state.smessage = null;
    },

    sendInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  sendInvoiceFail,
  sendInvoiceSuccess,
  sendInvoiceReq,
  afterSendInvoiceSuccess,
} = sendInvoiceSlice.actions;

export default sendInvoiceSlice.reducer;
