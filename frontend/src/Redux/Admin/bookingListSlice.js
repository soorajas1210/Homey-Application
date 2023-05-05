import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, bookings: [], error: null };

export const bookingListSlice = createSlice({
  name: "bookingList",
  initialState,
  reducers: {
    bookingListReq: (state, action) => {
      state.loading = true;
    },
    bookingListSuccess: (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
    },
    bookingListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default bookingListSlice.reducer;

export const { bookingListFail, bookingListReq, bookingListSuccess } =
  bookingListSlice.actions;
