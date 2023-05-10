import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  
  error: null,
 
};

const userEditSlice = createSlice({
  name: "userEdit",
  initialState,
  reducers: {
    userEditSuccess: (state, action) => {
      state.loading = false;
      state.smessage = action.payload;
    },

    userEditFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {userEditFail,userEditSuccess} =
  userEditSlice.actions;

export default userEditSlice.reducer;
