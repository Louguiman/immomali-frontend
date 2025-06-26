"use client";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import React from "react";

type User = {
  name?: string;
  // Add other fields as needed
};

const UserBanner: React.FC = () => {
  const t = useTranslations("dashboard.userBanner");
  const user: User | null = useAppSelector((state) => state.auth?.user);
  const isAuthenticated: boolean = useAppSelector(
    (state) => state.auth?.isAuthenticated
  );

  return (
    <div className="col-lg-12 mb10">
      <div className="breadcrumb_content style2">
        <h2 className="breadcrumb_title">
          {t("HowdyUser", { name: isAuthenticated ? user?.name : "User" })}
        </h2>
        <p>{t("WelcomeBack")}</p>
      </div>
    </div>
  );
}

export default UserBanner;
