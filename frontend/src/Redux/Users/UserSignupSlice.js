import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  smessage: null,
  error: null,
  registered: false,
};

const UserSignupSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignupReq: (state, action) => {
      state.loading = true;
    },
    userSignupSuccess: (state, action) => {
      state.loading = false;
      state.smessage = "Registered Successfully";
      state.registered = true;
    },
    userRegistered: (state, action) => {
      state.registered = false;
    },
    userSignupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userSignupReq, userSignupSuccess,userRegistered, userSignupFail } =
  UserSignupSlice.actions;

export default UserSignupSlice.reducer;
