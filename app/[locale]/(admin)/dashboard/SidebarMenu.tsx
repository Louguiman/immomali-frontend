"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { RootState } from "@/store/store";
import { log } from "console";

const SidebarMenu = () => {
  const t = useTranslations("sidebar"); // Chargement des traductions
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth); // Récupérer l'utilisateur connecté

  // Définition des types pour les rôles et les routes
  type RouteItem = { name: string; route: string; icon: string };
  type RoutesType = {
    admin: RouteItem[];
    agency: RouteItem[];
    agent: RouteItem[];
    user: RouteItem[];
    common: RouteItem[];
  };

  // Définition des routes avec des clés de traduction
  const routes: RoutesType = {
    admin: [
      { name: t("Dashboard"), route: "/dashboard", icon: "flaticon-layers" },
      { name: t("Users"), route: "/dashboard/users", icon: "flaticon-user" },
      {
        name: t("Agencies"),
        route: "/dashboard/agencies",
        icon: "flaticon-building",
      },
      {
        name: t("Agents"),
        route: "/dashboard/agents",
        icon: "flaticon-user-1",
      },
      {
        name: t("Invoices"),
        route: "/dashboard/invoices",
        icon: "flaticon-invoice",
      },
      {
        name: t("Payments"),
        route: "/dashboard/payments",
        icon: "flaticon-dollar",
      },
      {
        name: t("MaintenanceRequests"),
        route: "/dashboard/agency/maintenance-request",
        icon: "flaticon-tools",
      },
      {
        name: t("Notifications"),
        route: "/dashboard/notifications",
        icon: "flaticon-bell",
      },
      {
        name: t("Settings"),
        route: "/dashboard/settings",
        icon: "flaticon-settings",
      },
    ],
    agency: [
      { name: t("Dashboard"), route: "/dashboard", icon: "flaticon-layers" },
      {
        name: t("AgencyProfile"),
        route: "/dashboard/agency/profile",
        icon: "flaticon-user",
      },
      {
        name: t("MyAgents"),
        route: "/dashboard/agency/agents",
        icon: "flaticon-user-1",
      },
      {
        name: t("MyProperties"),
        route: "/dashboard/agency/properties",
        icon: "flaticon-home",
      },
      {
        name: t("MyTenants"),
        route: "/dashboard/agency/tenants",
        icon: "flaticon-user-2",
      },
      {
        name: t("Inquiries"),
        route: "/dashboard/agency/inquiries",
        icon: "flaticon-envelope",
      },
      {
        name: t("Reviews"),
        route: "/dashboard/agency/reviews",
        icon: "flaticon-chat",
      },
      {
        name: t("Invoices"),
        route: "/dashboard/agency/invoices",
        icon: "flaticon-invoice",
      },
      {
        name: t("MaintenanceRequests"),
        route: "/dashboard/agency/maintenance-request",
        icon: "flaticon-tools",
      },
    ],
    agent: [
      { name: t("Dashboard"), route: "/dashboard", icon: "flaticon-layers" },
      // {
      //   name: t("Profile"),
      //   route: "/dashboard/agent/profile",
      //   icon: "flaticon-user",
      // },
      {
        name: t("MyProperties"),
        route: "/dashboard/agent/properties",
        icon: "flaticon-home",
      },
      {
        name: t("MyTenants"),
        route: "/dashboard/agent/tenants",
        icon: "flaticon-user-2",
      },
      {
        name: t("Inquiries"),
        route: "/dashboard/agent/inquiries",
        icon: "flaticon-envelope",
      },
      {
        name: t("Invoices"),
        route: "/dashboard/agent/invoices",
        icon: "flaticon-invoice",
      },
      {
        name: t("Reviews"),
        route: "/dashboard/agent/reviews",
        icon: "flaticon-chat",
      },
      {
        name: t("Requests"),
        route: "/dashboard/agent/maintenance-request",
        icon: "flaticon-tools",
      },
    ],
    user: [
      { name: t("Dashboard"), route: "/dashboard", icon: "flaticon-layers" },
      {
        name: t("MyTenancies"),
        route: "/dashboard/my-tenancies",
        icon: "flaticon-user-2",
      },
      {
        name: t("MyInvoices"),
        route: "/dashboard/my-invoices",
        icon: "flaticon-invoice",
      },
      {
        name: t("MyInquiries"),
        route: "/dashboard/my-inquiries",
        icon: "flaticon-envelope",
      },
      {
        name: t("MyReviews"),
        route: "/dashboard/my-reviews",
        icon: "flaticon-chat",
      },
      {
        name: t("MyRequests"),
        route: "/dashboard/maintenance-request",
        icon: "flaticon-tools",
      },
      {
        name: t("MyFavourites"),
        route: "/dashboard/my-favourites",
        icon: "flaticon-magnifying-glass",
      },
    ],
    common: [
      {
        name: t("Profile"),
        route: "/dashboard/my-profile",
        icon: "flaticon-user",
      },
      { name: t("Logout"), route: "/logout", icon: "flaticon-logout" },
    ],
  };

  // Extraire les rôles depuis l'utilisateur connecté
  const userRoles =
    user?.roles?.map((role: { name: string }) => role.name) || [];

  // Helper to determine if a route is active (React way)
  const isActivePage = (route: string) => {
    // Handles exact and partial matches for nested routes
    // Remove locale prefix (e.g., /fr, /en) from pathname for comparison
    const normalizedPath = pathname.replace(/^\/[a-zA-Z-]+(\/|$)/, "/");
    console.log("Checking active page for route:", route);
    console.log("Current pathname:", pathname);
    console.log("Normalized pathname:", normalizedPath);
    return normalizedPath === route || normalizedPath.startsWith(route + "/");
  };

  // Always use 'active' class for active menu items
  const getLiClass = (route: string) => (isActivePage(route) ? "active" : "");

  return (
    <ul className="sidebar-menu">
      {/* Logo */}
      <li className="sidebar_header header">
        <Link href="/">
          <Image
            src="/assets/images/logo/logo-ikasow.svg"
            alt="Ikasow Logo"
            width={250}
            height={0}
            style={{ height: "auto" }}
          />
        </Link>
      </li>
      {userRoles.map(
        (role: string) =>
          (routes as any)[role] && (
            <li className="title" key={role}>
              <span>{role === "admin" ? t("AdminPanel") : t("Dashboard")}</span>
              <ul>
                {(routes as any)[role]?.map((item: RouteItem) => (
                  <li key={item.route} className={getLiClass(item.route)}>
                    <Link href={item.route}>
                      <i className={item.icon}></i> <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )
      )}

      {/* Section commune à tous les utilisateurs */}
      <li className="title">
        <span>{t("ManageAccount")}</span>
        <ul>
          {routes.common.map((item) => (
            <li
              key={item.route}
              className={isActivePage(item.route) ? "active" : ""}
            >
              <Link href={item.route}>
                <i className={item.icon}></i> <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default SidebarMenu;
