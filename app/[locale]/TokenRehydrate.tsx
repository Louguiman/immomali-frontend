"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "@/features/auth/authSlice";

export default function TokenRehydrate() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      dispatch(setAuthToken(token));
    }
  }, [dispatch]);
  return null;
}
