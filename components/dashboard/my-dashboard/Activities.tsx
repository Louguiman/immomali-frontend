"use client";
import { useTranslations } from "next-intl";

type Notification = {
  id: number;
  icon: string;
  message: string;
};

const Notifications: React.FC = () => {
  const t = useTranslations("dashboard.notifications");

  const notifications: Notification[] = [
    {
      id: 1,
      icon: "flaticon-home",
      message: t("ListingApproved", { listing: "Luxury Family Home" }),
    },
    {
      id: 2,
      icon: "flaticon-chat",
      message: t("ReviewReceived", {
        user: "Kathy Brown",
        listing: "Renovated Apartment",
      }),
    },
    {
      id: 3,
      icon: "flaticon-heart",
      message: t("FavoritedListing", { listing: "Gorgeous Villa Bay View" }),
    },
    {
      id: 4,
      icon: "flaticon-home",
      message: t("ListingApproved", { listing: "Luxury Family Home" }),
    },
    {
      id: 5,
      icon: "flaticon-chat",
      message: t("ReviewReceived", {
        user: "Kathy Brown",
        listing: "Renovated Apartment",
      }),
    },
    {
      id: 6,
      icon: "flaticon-heart",
      message: t("FavoritedListing", { listing: "Gorgeous Villa Bay View" }),
    },
  ];

  return (
    <>
      {notifications.map((notification) => (
        <div className="grid" key={notification.id}>
          <ul>
            <li className="list-inline-item">
              <div className="icon">
                <span className={notification.icon}></span>
              </div>
            </li>
            <li className="list-inline-item">
              <p>{notification.message}</p>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default Notifications;
