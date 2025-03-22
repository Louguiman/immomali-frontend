"use client";

import Link from "next/link";

import MyAccount from "./MyAccount";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import NotificationDropdown from "@/features/notifications/NotificationDropdown";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { getAccountMenu } from "@/utils/lib";

const navItems = {
  home: { name: "home", routerPath: "/" },

  properties: {
    name: "Properties",
    subMenu: [
      { name: "allProperties", routerPath: "/properties" },
      { name: "forSale", routerPath: "/properties?type=sale" },
      { name: "forRent", routerPath: "/properties?type=rent" },
      { name: "luxuryHomes", routerPath: "/properties?category=luxury" },
      { name: "newListings", routerPath: "/properties?new" },
      { name: "compareProperties", routerPath: "/compare" },
    ],
  },

  agents: {
    name: "Agents",
    subMenu: [
      { name: "findAgent", routerPath: "/professionals/agents" },
      { name: "agencies", routerPath: "/professionals/agencies" },
      { name: "becomeAgent", routerPath: "/register" },
    ],
  },

  tenantServices: {
    name: "Tenant Services",
    subMenu: [
      { name: "tenancies", routerPath: "/dashboard/my-tenancies" },
      { name: "favorites", routerPath: "/dashboard/my-favourites" },
      { name: "recentlyViewed", routerPath: "/dashboard/recently-viewed" },
      { name: "savedSearches", routerPath: "/dashboard/my-saved-search" },
    ],
  },

  account: {
    name: "Account",
    subMenu: [
      { name: "dashboard", routerPath: "/dashboard" },
      { name: "myProfile", routerPath: "/dashboard/my-profile" },
      { name: "myProperties", routerPath: "/dashboard/my-properties" },
      { name: "myInquiries", routerPath: "/dashboard/my-inquiries" },
      { name: "myRequests", routerPath: "/dashboard/maintenance-request" },
      { name: "rentPayments", routerPath: "/dashboard/my-invoices" },
    ],
  },
  blog: { name: "blog", routerPath: "/blog-list-1" },
  contact: { name: "contact", routerPath: "/contact" },
};

const HeaderMenuContentV4 = ({ float = "" }) => {
  const t = useTranslations("navbar");
  const user = useSelector((state) => state.auth?.user);
  const userRoles = useMemo(
    () => user?.roles?.map((role) => role.name) || [],
    [user]
  );

  navItems.account = useMemo(() => getAccountMenu(userRoles), [user]);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const pathname = usePathname();

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      {/* Home */}
      <li className={pathname === navItems.home.routerPath ? "ui-active" : ""}>
        <Link href={navItems.home.routerPath}>{t(navItems.home.name)}</Link>
      </li>
      {/* Properties */}
      <li className="dropitem">
        <a href="#" className="title">
          {t("properties.name")}
        </a>
        <ul className="sub-menu">
          {navItems.properties.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>
                {t(`properties.subMenu.${item.name}`)}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* Agents */}
      <li className="dropitem">
        <a href="#" className="title">
          {t("agents.name")}
        </a>
        <ul className="sub-menu">
          {navItems.agents.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>
                {t(`agents.subMenu.${item.name}`)}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* Tenant Services */}
      {/* <li className="dropitem">
        <a href="#" className="title">
          {t("tenantServices.name")}
        </a>
        <ul className="sub-menu">
          {navItems.tenantServices.subMenu.map((item, index) => (
            <li key={index}>
              {t(`tenantServices.subMenu.${item.name}`)}
            </li>
          ))}
        </ul>
      </li> */}
      {/* Blog, Resources, Contact */}
      <li className={pathname === navItems.blog.routerPath ? "ui-active" : ""}>
        <Link href={navItems.blog.routerPath}>{t(navItems.blog.name)}</Link>
      </li>
      1
      <li
        className={pathname === navItems.contact.routerPath ? "ui-active" : ""}
      >
        <Link href={navItems.contact.routerPath}>
          {t(navItems.contact.name)}
        </Link>
      </li>
      <NotificationDropdown />
      {/* Authentication Links */}
      {isAuthenticated ? (
        <li className="dropitem ">
          <div className="user_set_header">
            <Image
              width={40}
              height={40}
              className="float-start"
              src={user?.img | "/assets/images/team/e1.png"}
              alt="1.png"
            />
            <p>
              <span className="dn-1199 ms-1">{user?.name || "User"}!</span>
              {/* <span className="address">{user?.email || "User"}</span> */}
              <br />
              <span className="address">{user?.agency?.name || "N/A"}</span>
            </p>
          </div>

          <ul className="sub-menu">
            <div className="user_set_header row">
              <div className="col-lg-4">
                <Image
                  className="rounded-circle"
                  width={90}
                  height={90}
                  src="/assets/images/team/lc1.png"
                  alt="e1.png"
                />
              </div>
              <div className="col-lg-8">
                <p>
                  Hello, {user?.name || "User"}!<br />
                </p>
                <small className="address">{user?.email || "User"}</small>
                <br />
                <small className="address">
                  agence: {user?.agency?.name || "N/A"}
                </small>
              </div>
            </div>

            {navItems.account.subMenu.map((item, index) => (
              <li key={index}>
                <Link href={item.routerPath}>
                  {t(`account.subMenu.${item.name}`)}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ) : (
        <li className="list-inline-item list_s">
          <Link href="/login">
            <span className="flaticon-user"></span>
            {t("login")}
          </Link>
        </li>
      )}
      {/* Add Property */}
      <li className={`list-inline-item add_listing ${float}`}>
        <Link href="/create-listing">
          <span className="flaticon-plus"></span>
          <span className="dn-lg"> Add Property</span>
        </Link>
      </li>
    </ul>
  );
};

export default HeaderMenuContentV4;
