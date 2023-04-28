import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, error: null };

export const clientSecreteSlice = createSlice({
  name: " clientSecrete",
  initialState,
  reducers: {
    clientSecreteSuccess: (state, action) => {
      state.secreteKey = action.payload;
    },
    clientSecreteFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default clientSecreteSlice.reducer;

export const { clientSecreteFail, clientSecreteSuccess } = clientSecreteSlice.actions;
