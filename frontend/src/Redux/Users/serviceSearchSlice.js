import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, services: [], error: null };

export const serviceSearchSlice = createSlice({
  name: "serviceSearch",
  initialState,
  reducers: {
    serviceSearchReq: (state, action) => {
      state.loading = true;
    },
    serviceSearchSuccess: (state, action) => {
      state.loading = false;
      state.services = action.payload;
    },
    serviceSearchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default serviceSearchSlice.reducer;

export const { serviceSearchFail,serviceSearchReq,serviceSearchSuccess } =
  serviceSearchSlice.actions;
