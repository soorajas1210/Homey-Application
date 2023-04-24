import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, serviceType: [], error: null };

export const serviceTypeListSlice = createSlice({
  name: "serviceTypeList",
  initialState,
  reducers: {
  serviceTypeListReq: (state, action) => {
      state.loading = true;
    },
   serviceTypeListSuccess: (state, action) => {
      state.loading = false;
      state.serviceType = action.payload;
    
    },
   serviceTypeListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default serviceTypeListSlice.reducer;

export const { serviceTypeListFail, serviceTypeListReq, serviceTypeListSuccess } =
  serviceTypeListSlice.actions;
