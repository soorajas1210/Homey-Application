import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, error: null };

export const chatCreateSlice = createSlice({
  name: "createChat",
  initialState,
  reducers: {
    createChatReq: (state, action) => {
      state.loading = true;
    },
    createChatSuccess: (state, action) => {
      state.loading = false;
      state.chatCreated = action.payload;
    },
    createChatFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default chatCreateSlice.reducer;

export const { createChatFail, createChatReq, createChatSuccess } =
  chatCreateSlice.actions;
