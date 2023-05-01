import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, message: [], error: null };

export const fetchMessagesSlice = createSlice({
  name: "fetchMessages",
  initialState,
  reducers: {
    fetchMessagesReq: (state, action) => {
      state.loading = true;
    },
    fetchMessagesSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    fetchMessagesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default fetchMessagesSlice.reducer;

export const { fetchMessagesFail, fetchMessagesReq, fetchMessagesSuccess } =
  fetchMessagesSlice.actions;
