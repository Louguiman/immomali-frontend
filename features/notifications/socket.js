"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "./notificationsSlice";
import { useSelector } from "react-redux";

export default function useWebSocketNotifications() {
  const dispatch = useDispatch();
}
