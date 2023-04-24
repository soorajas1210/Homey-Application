import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, toVerify: [], error: null };

export const toVerifyListSlice = createSlice({
  name: "toVerifyList",
  initialState,
  reducers: {
    toVerifyListReq: (state, action) => {
      state.loading = true;
    },
    toVerifyListSuccess: (state, action) => {
      state.loading = false;
      state.toVerify = action.payload;
    },
    toVerifyListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default toVerifyListSlice.reducer;

export const { toVerifyListFail,toVerifyListReq,toVerifyListSuccess } =
  toVerifyListSlice.actions;
