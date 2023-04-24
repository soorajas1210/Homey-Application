import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, getCategory: [], error: null };

export const getCategoryDetailsSlice = createSlice({
  name: " getCategoryList",
  initialState,
  reducers: {
    getCategoryDetailsReq: (state, action) => {
      state.loading = true;
    },
    getCategoryDetailsSuccess: (state, action) => {
      state.loading = false;
      state.getCategory = action.payload;
    },
    getCategoryDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default getCategoryDetailsSlice.reducer;

export const {
 getCategoryDetailsFail,getCategoryDetailsReq,getCategoryDetailsSuccess
} = getCategoryDetailsSlice.actions;
