"use client";
import { useAppSelector } from "@/store/hooks";
import React from "react";

function UserBanner() {
  const user = useAppSelector((state) => state.auth?.user);
  const isAuthenticated = useAppSelector(
    (state) => state.auth?.isAuthenticated
  );

  return (
    <div className="col-lg-12 mb10">
      <div className="breadcrumb_content style2">
        <h2 className="breadcrumb_title">
          Howdy, {isAuthenticated ? user?.name : "User"}
        </h2>
        <p>We are glad to see you again!</p>
      </div>
    </div>
  );
}

export default UserBanner;
