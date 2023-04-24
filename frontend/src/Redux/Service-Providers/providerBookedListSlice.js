import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, providerBooked: [], error: null };

export const providerbookedListSlice = createSlice({
  name: "providerbookedList",
  initialState,
  reducers: {
    providerbookedListReq: (state, action) => {
      state.loading = true;
    },
    providerbookedListSuccess: (state, action) => {
      state.loading = false;
      state.providerBooked = action.payload;
    },
    providerbookedListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default providerbookedListSlice.reducer;

export const {
  providerbookedListFail,
  providerbookedListReq,
  providerbookedListSuccess,
} = providerbookedListSlice.actions;
