"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useRefreshTokenMutation } from "../api/auth.api";
import { loadFromStorage } from "../properties/propertiesSlice";
import { setAuthToken } from "./authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.isAuthenticated && auth.accessToken) {
      // router.push("/login");
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setAuthToken({ accessToken: token }));
        refreshToken()
          .unwrap()
          .catch(() => {
            router.push("/login");
          });
      }
      // dispatch(setAuthToken({ accessToken: token }));
    }
  }, [auth.isAuthenticated, refreshToken, router]);

  return <>{children}</>;
}
