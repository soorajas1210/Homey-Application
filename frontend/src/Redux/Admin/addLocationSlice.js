import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  smessage: null,
  error: null,
};

const addLocationSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addLocationReq: (state, action) => {
      state.loading = true;
    },
    addLocationSuccess: (state, action) => {
      state.loading = false;
      state.smessage = "added Successfully";
    },

    afterLocationSuccess: (state, action) => {
      state.smessage = null;
    },
    addLocationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
 addLocationFail,addLocationReq,addLocationSuccess,afterLocationSuccess
} = addLocationSlice.actions;

export default addLocationSlice.reducer;
