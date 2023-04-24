import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, userBooked: [], error: null };

export const userbookedListSlice = createSlice({
  name: "userbookedList",
  initialState,
  reducers: {
    userbookedListReq: (state, action) => {
      state.loading = true;
    },
    userbookedListSuccess: (state, action) => {
      state.loading = false;
      state.userBooked = action.payload;
    },
    userbookedListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userbookedListSlice.reducer;

export const { userbookedListFail,userbookedListReq,userbookedListSuccess } =
  userbookedListSlice.actions;
