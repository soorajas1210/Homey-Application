import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  smessage: null,
  error: null,


};

const addServiceTypeSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addServiceTypeReq: (state, action) => {
      state.loading = true;
    },
    addServiceTypeSuccess: (state, action) => {
      state.loading = false;
      state.smessage = "added Successfully";
    },
    afterServiceTypeSuccess:(state,action) => {
state.smessage = null;

    },

    addServiceTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { afterServiceTypeSuccess,addServiceTypeSuccess,addServiceTypeReq,addServiceTypeFail} =
  addServiceTypeSlice.actions;

export default addServiceTypeSlice.reducer;
