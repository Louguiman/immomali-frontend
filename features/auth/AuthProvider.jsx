"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useRefreshTokenMutation } from "../api/auth.api";
import { loadFromStorage } from "../properties/propertiesSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      // router.push("/login");
      // refreshToken()
      //   .unwrap()
      //   .catch(() => {
      //     router.push("/login");
      //   });
    }
  }, [isAuthenticated, refreshToken, router]);

  return <>{children}</>;
}
