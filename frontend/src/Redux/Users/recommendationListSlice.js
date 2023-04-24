import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, provider: [], error: null };

export const recommendationListSlice = createSlice({
  name: " providerList",
  initialState,
  reducers: {
    recommendationListReq: (state, action) => {
      state.loading = true;
    },
    recommendationListSuccess: (state, action) => {
      state.loading = false;
      state.provider = action.payload;
    },
    recommendationListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default recommendationListSlice.reducer;

export const {recommendationListFail,recommendationListReq,recommendationListSuccess } =
  recommendationListSlice.actions;
