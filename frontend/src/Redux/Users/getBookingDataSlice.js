import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, error: null };

export const getBookingDataSlice = createSlice({
  name: " getBookingData",
  initialState,
  reducers: {
    getBookingDataSuccess: (state, action) => {
      state.BookingData = action.payload;
    },
    getBookingDataFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default getBookingDataSlice.reducer;

export const { getBookingDataFail, getBookingDataSuccess } =
  getBookingDataSlice.actions;
