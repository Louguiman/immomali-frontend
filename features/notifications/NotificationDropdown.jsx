import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNotification, markAsRead } from "./notificationsSlice";

export default function NotificationDropdown() {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const unreadCount = notifications.filter((n) => !n.read).length;
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const userId = useSelector((state) => state?.auth?.user?.id);

  useEffect(() => {
    console.log("notifcaiton dropdown");

    if (!userId) return;

    console.log("notifcaiton fectch");
    // Fetch notifications non lues
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/unread`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => dispatch(addNotification(data)));

    // WebSocket
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}?userId=${userId}`
    );
    ws.onopen = () => console.log("WebSocket connecté !");
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      dispatch(addNotification(notification)); // Ajout
    };
    ws.onclose = () => console.log("WebSocket déconnecté !");
    setSocket(ws);

    return () => ws.close();
  }, [dispatch, userId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li className="relative" ref={dropdownRef}>
      {/* 🔔 Icône avec badge */}
      <button
        className="relative p-2 bg-gray-200 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 🏷️ Dropdown des notifications */}
      {isOpen && (
        <div className="absolute right-0 w-64 mt-2 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-2 text-sm font-semibold bg-gray-100">
            Notifications
          </div>
          {notifications.length === 0 ? (
            <p className="p-2 text-gray-500">Aucune notification</p>
          ) : (
            notifications.map((notif, i) => (
              <div
                key={`notif.id-${i} `}
                className={`p-2 border-b cursor-pointer ${
                  notif.read ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => dispatch(markAsRead(notif.id))}
              >
                <p className="text-sm font-semibold">{notif.type}</p>
                <p className="text-xs text-gray-500">{notif.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </li>
  );
}
