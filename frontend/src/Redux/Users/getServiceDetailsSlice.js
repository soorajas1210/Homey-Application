import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, getService: [], error: null };

export const getServiceDetailsSlice = createSlice({
  name: " getServiceList",
  initialState,
  reducers: {
    getServiceDetailsReq: (state, action) => {
      state.loading = true;
    },
    getServiceDetailsSuccess: (state, action) => {
      state.loading = false;
      state.getService = action.payload;
    },
    getServiceDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default getServiceDetailsSlice.reducer;

export const {
  getServiceDetailsFail,
  getServiceDetailsReq,
  getServiceDetailsSuccess,
} = getServiceDetailsSlice.actions;
