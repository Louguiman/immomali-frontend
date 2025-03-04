"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { isSinglePageActive } from "@/utils/daynamicNavigation";

// Define all routes
const routes = {
  admin: [
    { name: "Dashboard", route: "/dashboard", icon: "flaticon-layers" },
    { name: "Users", route: "/dashboard/users", icon: "flaticon-user" },
    {
      name: "Agencies",
      route: "/dashboard/agencies",
      icon: "flaticon-building",
    },
    { name: "Agents", route: "/dashboard/agents", icon: "flaticon-user-1" },
    {
      name: "Invoices",
      route: "/dashboard/invoices",
      icon: "flaticon-invoice",
    },
    { name: "Payments", route: "/dashboard/payments", icon: "flaticon-dollar" },
    {
      name: "Maintenance Requests",
      route: "/dashboard/agency/maintenance-request",
      icon: "flaticon-tools",
    },
    {
      name: "Notifications",
      route: "/dashboard/notifications",
      icon: "flaticon-bell",
    },
    {
      name: "Settings",
      route: "/dashboard/settings",
      icon: "flaticon-settings",
    },
  ],
  agency: [
    { name: "Dashboard", route: "/dashboard", icon: "flaticon-layers" },
    {
      name: "Profile",
      route: "/dashboard/agency/profile",
      icon: "flaticon-user",
    },
    {
      name: "My Agents",
      route: "/dashboard/agency/agents",
      icon: "flaticon-user-1",
    },
    {
      name: "My Tenants",
      route: "/dashboard/agency/tenants",
      icon: "flaticon-user-2",
    },
    {
      name: "My Properties",
      route: "/dashboard/agency/properties",
      icon: "flaticon-home",
    },
    {
      name: "Inquiries",
      route: "/dashboard/agency/inquiries",
      icon: "flaticon-envelope",
    },
    {
      name: "Reviews",
      route: "/dashboard/agency/reviews",
      icon: "flaticon-chat",
    },
    {
      name: "Invoices",
      route: "/dashboard/agency/invoices",
      icon: "flaticon-invoice",
    },
    // {
    //   name: "Payments",
    //   route: "/dashboard/agency/payments",
    //   icon: "flaticon-dollar",
    // },
    {
      name: "Maintenance Requests",
      route: "/dashboard/agency/maintenance-request",
      icon: "flaticon-tools",
    },
  ],
  agent: [
    { name: "Dashboard", route: "/dashboard", icon: "flaticon-layers" },
    {
      name: "Profile",
      route: "/dashboard/agent/profile",
      icon: "flaticon-user",
    },
    {
      name: "My Tenants",
      route: "/dashboard/agent/tenants",
      icon: "flaticon-user-2",
    },
    {
      name: "My Properties",
      route: "/dashboard/agent/properties",
      icon: "flaticon-home",
    },
    {
      name: "Inquiries",
      route: "/dashboard/agent/inquiries",
      icon: "flaticon-envelope",
    },
    {
      name: "Invoices",
      route: "/dashboard/agent/invoices",
      icon: "flaticon-invoice",
    },
    {
      name: "Reviews",
      route: "/dashboard/agent/reviews",
      icon: "flaticon-chat",
    },
    // {
    //   name: "Payments",
    //   route: "/dashboard/agent/payments",
    //   icon: "flaticon-dollar",
    // },
    {
      name: "Requests",
      route: "/dashboard/agent/maintenance-request",
      icon: "flaticon-tools",
    },
  ],
  user: [
    { name: "Dashboard", route: "/dashboard", icon: "flaticon-layers" },
    {
      name: "My Tenancies",
      route: "/dashboard/my-tenancies",
      icon: "flaticon-user-2",
    },
    {
      name: "My Invoices",
      route: "/dashboard/my-invoices",
      icon: "flaticon-invoice",
    },
    {
      name: "My Inquiries",
      route: "/dashboard/my-inquiries",
      icon: "flaticon-envelope",
    },
    {
      name: "My Reviews",
      route: "/dashboard/my-reviews",
      icon: "flaticon-chat",
    },
    // {
    //   name: "Payments",
    //   route: "/dashboard/agent/payments",
    //   icon: "flaticon-dollar",
    // },
    {
      name: "My Requests",
      route: "/dashboard/maintenance-request",
      icon: "flaticon-tools",
    },
    {
      name: "My Favourites",
      route: "/dashboard/my-favourites",
      icon: "flaticon-magnifying-glass",
    },
    // {
    //   name: "Saved Search",
    //   route: "/dashboard/my-saved-search",
    //   icon: "flaticon-magnifying-glass",
    // },
  ],
  common: [
    // { name: "My Profile", route: "/dashboard/profile", icon: "flaticon-user" },
    { name: "Logout", route: "/logout", icon: "flaticon-logout" },
  ],
};

const SidebarMenu = () => {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth); // Get logged-in user

  // Extract roles from user object
  const userRoles = user?.roles?.map((role) => role.name) || [];

  return (
    <>
      <ul className="sidebar-menu">
        {/* Logo */}
        <li className="sidebar_header header">
          <Link href="/">
            <Image
              width={40}
              height={45}
              src="/assets/images/header-logo2.png"
              alt="Logo"
            />
            <span>ImmoMali</span>
          </Link>
        </li>

        {/* Role-Based Sections */}
        {userRoles.map(
          (role) =>
            routes[role] && (
              <li className="title" key={role}>
                <span>{role === "admin" ? "Admin Panel" : "Dashboard"}</span>
                <ul>
                  {routes[role].map((item) => (
                    <li
                      key={item.route}
                      className={
                        isSinglePageActive(item.route, pathname) ? "active" : ""
                      }
                    >
                      <Link href={item.route}>
                        <i className={item.icon}></i> <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )
        )}

        {/* Common for All Users */}
        <li className="title">
          <span>Manage Account</span>
          <ul>
            {routes.common.map((item) => (
              <li
                key={item.route}
                className={
                  isSinglePageActive(item.route, pathname) ? "active" : ""
                }
              >
                <Link href={item.route}>
                  <i className={item.icon}></i> <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
};

export default SidebarMenu;
