import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, users: [], error: null };

export const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    usersListReq: (state, action) => {
      state.loading = true;
    },
    usersListSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    userListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default usersListSlice.reducer;

export const { userListFail, usersListReq, usersListSuccess } =
  usersListSlice.actions;
