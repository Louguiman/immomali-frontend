import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "billa",
    roles: [
      {
        id: 4,
        name: "user",
        permissions: [
          {
            id: 8,
            name: "view_property",
          },
        ],
      },
    ],
  },
  accessToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
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

export const {
  setAuthToken,
  loginSuccess,
  logoutSuccess,
  refreshTokenSuccess,
} = authSlice.actions;
export default authSlice.reducer;
