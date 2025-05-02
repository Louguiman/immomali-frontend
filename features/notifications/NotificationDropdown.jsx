"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

import { useRouter } from "next/navigation";
import {
  useGetUnreadNotificationsQuery,
  useMarkNotificationReadMutation,
} from "../api/notification.api";

export default function NotificationDropdown() {
  const t = useTranslations("notifications");
  const { data: notifications = [], isLoading } =
    useGetUnreadNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // click outside to close
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <li className="dropitem" ref={ref}>
      <div
        className="user_set_header p-2 cursor-pointer"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={t("toggle")}
      >
        🔔
        {unreadCount > 0 && (
          <span className="badge bg-danger">{unreadCount}</span>
        )}
      </div>

      {isOpen && (
        <ul className="sub-menu">
          <li className="p-2 fw-bold">{t("title")}</li>

          {isLoading && <li className="p-2 text-center">{t("loading")}</li>}

          {!isLoading && notifications.length === 0 && (
            <li className="p-2 text-center">{t("none")}</li>
          )}

          {!isLoading &&
            notifications.map((n) => (
              <li
                key={n.id}
                className={`p-2 border-top cursor-pointer ${
                  n.read ? "bg-light" : ""
                }`}
                onClick={() => markRead(n.id)}
              >
                <p className="mb-1">
                  {t(`types.${n.type}`, { default: n.type })}
                </p>
                <small className="text-muted">{n.message}</small>
              </li>
            ))}
        </ul>
      )}
    </li>
  );
}
