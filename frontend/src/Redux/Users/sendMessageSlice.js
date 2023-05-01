import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, error: null };

export const sendMessageSlice = createSlice({
  name: "sendMessage",
  initialState,
  reducers: {
    sendMessageReq: (state, action) => {
      state.loading = true;
    },
    sendMessageSuccess: (state, action) => {
      state.loading = false;
      state.sendMessage = action.payload;
    },
    sendMessageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default sendMessageSlice.reducer;

export const { sendMessageFail, sendMessageReq, sendMessageSuccess } =
  sendMessageSlice.actions;
