import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  smessage: null,
  error: null,
};

const addServiceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addServiceReq: (state, action) => {
      state.loading = true;
    },
    addServiceSuccess: (state, action) => {
      state.loading = false;
      state.smessage = "added Successfully";
    },

afterServiceSuccess: (state, action) => { 

  state.smessage = null;
},
    addServiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addServiceSuccess,
  addServiceReq,
  addServiceFail,
  afterServiceSuccess,
} = addServiceSlice.actions;

export default addServiceSlice.reducer;
