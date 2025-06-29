"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFromStorage } from "../properties/propertiesSlice";
import { setAuthToken } from "./authSlice";
import { RootState } from "@/store/store";

import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadFromStorage({}));
  }, [dispatch]);

  useEffect(() => {
    if (!auth.isAuthenticated && auth.accessToken) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setAuthToken({ accessToken: token }));
      }
    }
  }, [auth.isAuthenticated, dispatch, auth.accessToken]);

  return <>{children}</>;
}
