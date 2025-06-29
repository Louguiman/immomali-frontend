import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload } from "./types";

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
      state.isAuthenticated = !!state.accessToken;
    },
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
      console.log("Login successful, user:", state.user);
      console.log("Access token set:", state.accessToken);
      console.log("Local storage updated with user and token.");
      console.log("Auth state updated:", state.isAuthenticated);
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setAuthToken, loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
