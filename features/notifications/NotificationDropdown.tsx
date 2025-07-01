"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  useGetUnreadNotificationsQuery,
  useMarkNotificationReadMutation,
} from "../api/notification.api";

// Define notification types as a union of possible notification types
export type NotificationType =
  | "new_message"
  | "property_update"
  | "system_alert"
  | "payment_received"
  | "booking_confirmed"
  | string; // Fallback for any other types

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
  // Add other notification properties as needed
  metadata?: Record<string, unknown>;
}

// Define the shape of the notifications query response
interface NotificationsResponse {
  data: Notification[];
  isLoading: boolean;
  isError: boolean;
  error?: Error;
}

// Define props for the component
interface NotificationDropdownProps {
  maxNotifications?: number;
  className?: string;
}

export default function NotificationDropdown({
  maxNotifications = 10,
  className = "",
}: NotificationDropdownProps) {
  const t = useTranslations("notifications");
  // Destructure the query result
  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useGetUnreadNotificationsQuery(undefined) as NotificationsResponse;

  const [markRead] = useMarkNotificationReadMutation();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLLIElement>(null);

  // Memoize the filtered notifications to prevent unnecessary re-renders
  const unreadNotifications = (notifications as Notification[]).filter(
    (notification) => !notification.read
  );

  const unreadCount = unreadNotifications.length;

  // Handle click outside to close dropdown
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  // Set up event listener for clicks outside the dropdown
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  // Handle marking a notification as read
  const handleMarkAsRead = useCallback(
    (notificationId: string) => {
      try {
        markRead(notificationId);
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    },
    [markRead]
  );

  // Toggle dropdown visibility
  const toggleDropdown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <li
      className={`dropitem relative ${className}`}
      ref={ref}
      data-testid="notification-dropdown"
    >
      <button
        type="button"
        className="user_set_header p-2 cursor-pointer relative focus:outline-none"
        onClick={toggleDropdown}
        aria-label={t("toggle")}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span role="img" aria-hidden="true">
          🔔
        </span>
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            aria-label={`${unreadCount} unread notifications`}
            aria-live="polite"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="notifications-title"
        >
          <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
            <h2
              id="notifications-title"
              className="text-lg font-medium text-gray-900 m-0"
            >
              {t("title")}
            </h2>
          </div>

          <div
            className="max-h-96 overflow-y-auto"
            role="region"
            aria-live="polite"
            aria-atomic="false"
          >
            {isLoading ? (
              <div
                className="p-4 text-center text-gray-500"
                role="status"
                aria-label={t("loading")}
              >
                {t("loading")}
              </div>
            ) : isError ? (
              <div
                className="p-4 text-center text-red-500"
                role="alert"
                aria-live="assertive"
              >
                {t("error_loading")}
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500" aria-live="polite">
                {t("none")}
              </div>
            ) : (
              <ul
                className="divide-y divide-gray-200"
                role="listbox"
                aria-label={t("notifications_list")}
              >
                {(notifications as Notification[])
                  .slice(0, maxNotifications)
                  .map((notification) => (
                    <li
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        notification.read ? "bg-gray-50" : "bg-white"
                      }`}
                      role="option"
                      aria-selected="false"
                      onClick={() => handleMarkAsRead(notification.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleMarkAsRead(notification.id);
                        }
                      }}
                      tabIndex={0}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <div
                            className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <span className="text-blue-500">
                              {getNotificationIcon(notification.type)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {t(`types.${notification.type}`, {
                              default: formatNotificationType(
                                notification.type
                              ),
                            })}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.message}
                          </p>
                          <time
                            dateTime={notification.createdAt}
                            className="text-xs text-gray-400 mt-1 block"
                          >
                            {formatDate(notification.createdAt)}
                          </time>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0 ml-2">
                            <span
                              className="h-2 w-2 bg-blue-500 rounded-full inline-block"
                              aria-label={t("unread_notification")}
                            ></span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {notifications.length > maxNotifications && (
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-center">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  // Navigate to notifications page
                  router.push("/notifications");
                  setIsOpen(false);
                }}
                aria-label={t("view_all_notifications")}
              >
                {t("view_all")} ({notifications.length})
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

// Helper function to get appropriate icon for notification type
function getNotificationIcon(type: NotificationType): string {
  switch (type) {
    case "new_message":
      return "💬";
    case "property_update":
      return "🏠";
    case "system_alert":
      return "⚠️";
    case "payment_received":
      return "💰";
    case "booking_confirmed":
      return "✅";
    default:
      return "🔔";
  }
}

// Helper function to format notification type for display
function formatNotificationType(type: NotificationType): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
