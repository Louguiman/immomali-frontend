import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, RefreshTokenPayload } from "./types";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (
      state,
      action: PayloadAction<string | { accessToken: string }>
    ) => {
      state.accessToken =
        typeof action.payload === "string"
          ? action.payload
          : action.payload.accessToken;
    },
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    refreshTokenSuccess(state, action: PayloadAction<RefreshTokenPayload>) {
      state.accessToken = action.payload.accessToken;
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
