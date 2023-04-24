import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  smessage: null,
  error: null,
};

const bookServiceSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookServiceReq: (state, action) => {
      state.loading = true;
    },
    bookServiceSuccess: (state, action) => {
      state.loading = false;
      state.smessage = "Booked Successfully";
    },
    bookServiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  bookServiceFail,bookServiceSuccess,bookServiceReq
} = bookServiceSlice.actions;

export default bookServiceSlice.reducer;
