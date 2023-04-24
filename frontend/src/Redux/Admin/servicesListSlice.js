import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, services:[],error: null };

export const servicesSlice = createSlice({
  name: "servicesList",
  initialState,
  reducers: {
    servicesListReq: (state, action) => {
      state.loading = true;
    },
    servicesListSuccess: (state, action) => {
      state.loading = false;
      state.services = action.payload;
    },
    servicesListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default servicesSlice.reducer;

export const {
  servicesListFail,
  servicesListReq,
  servicesListSuccess,
} = servicesSlice.actions;
