import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  tokens: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = {};
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
