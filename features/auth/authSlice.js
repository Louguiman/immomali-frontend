import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  accessToken: "",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, refreshTokenSuccess } =
  authSlice.actions;
export default authSlice.reducer;
