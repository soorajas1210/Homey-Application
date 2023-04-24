import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  smessage: null,
  error: null,
};

const providerRegistrationSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    providerRegReq: (state, action) => {
      state.loading = true;
    },
    providerRegSuccess: (state, action) => {
      state.loading = false;
      state.smessage = "Registered Successfully";
    },
    afterProviderRegSuccess: (state, action) => {
      state.smessage = null;
    },

    providerRegFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  providerRegFail,
  providerRegSuccess,
  providerRegReq,
  afterProviderRegSuccess,
} = providerRegistrationSlice.actions;

export default providerRegistrationSlice.reducer;
