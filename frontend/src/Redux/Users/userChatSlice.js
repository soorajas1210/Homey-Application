import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, chats: [], error: null };

export const userChatSlice = createSlice({
  name: "userChat",
  initialState,
  reducers: {
    userChatReq: (state, action) => {
      state.loading = true;
    },
    userChatSuccess: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    },
    userChatFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userChatSlice.reducer;

export const { userChatFail, userChathReq, userChatSuccess } = userChatSlice.actions;
