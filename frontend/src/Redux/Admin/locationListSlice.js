import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, locations: [], error: null };

export const locationListSlice = createSlice({
  name: "locationList",
  initialState,
  reducers: {
    locationListReq: (state, action) => {
      state.loading = true;
    },
    locationListSuccess: (state, action) => {
      state.loading = false;
      state.locations = action.payload;
    },
    locationListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default locationListSlice.reducer;

export const { locationListFail,locationListReq,locationListSuccess } =
  locationListSlice.actions;
