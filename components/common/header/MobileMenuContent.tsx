"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { getAccountMenu } from "@/utils/lib";
import { useMemo } from "react";

const navItems = {
  home: { name: "home", routerPath: "/" },

  properties: {
    name: "properties",
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
    name: "agents",
    subMenu: [
      { name: "findAgent", routerPath: "/professionals/agents" },
      { name: "agencies", routerPath: "/professionals/agencies" },
      { name: "becomeAgent", routerPath: "/register" },
    ],
  },

  tenantServices: {
    name: "tenantServices",
    subMenu: [
      { name: "tenancies", routerPath: "/dashboard/my-tenancies" },
      { name: "favorites", routerPath: "/dashboard/my-favourites" },
      { name: "recentlyViewed", routerPath: "/dashboard/recently-viewed" },
      { name: "savedSearches", routerPath: "/dashboard/my-saved-search" },
    ],
  },

  account: {
    name: "account",
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

const MobileMenuContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("navbar");

  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const userRoles = useMemo(
    () => user?.roles?.map((role) => role.name) || [],
    [user]
  );
  const accountNav = useMemo(() => getAccountMenu(userRoles), [user]);

  return (
    <>
      <div className="sidebar-header">
        <Link href="/" className="sidebar-header-inner">
          <Image
            width={40}
            height={45}
            className="nav_logo_img img-fluid mt20"
            src="/assets/images/header-logo2.png"
            alt="header-logo.png"
          />
          <span className="brand-text">IKASOWI</span>
        </Link>
        <div
          role="button"
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <span className="flaticon-close"></span>
        </div>
      </div>

      <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
        <Menu>
          {/* Home */}
          <MenuItem
            active={pathname === navItems.home.routerPath}
            onClick={() => router.push(navItems.home.routerPath)}
          >
            {t(navItems.home.name)}
          </MenuItem>

          {/* Properties */}
          <SubMenu label={t("properties.name")}>
            {navItems.properties.subMenu.map((item, i) => (
              <MenuItem key={i} onClick={() => router.push(item.routerPath)}>
                {t(`properties.subMenu.${item.name}`)}
              </MenuItem>
            ))}
          </SubMenu>

          {/* Agents */}
          <SubMenu label={t("agents.name")}>
            {navItems.agents.subMenu.map((item, i) => (
              <MenuItem key={i} onClick={() => router.push(item.routerPath)}>
                {t(`agents.subMenu.${item.name}`)}
              </MenuItem>
            ))}
          </SubMenu>

          {/* Tenant Services */}
          {isAuthenticated && (
            <SubMenu label={t("tenantServices.name")}>
              {navItems.tenantServices.subMenu.map((item, i) => (
                <MenuItem key={i} onClick={() => router.push(item.routerPath)}>
                  {t(`tenantServices.subMenu.${item.name}`)}
                </MenuItem>
              ))}
            </SubMenu>
          )}

          {/* Account (authenticated only) */}
          {isAuthenticated && (
            <SubMenu label={t("account.name")}>
              {accountNav.subMenu.map((item, i) => (
                <MenuItem key={i} onClick={() => router.push(item.routerPath)}>
                  {t(`account.subMenu.${item.name}`)}
                </MenuItem>
              ))}
              <MenuItem onClick={() => router.push("/logout")}>
                {t("logout")}
              </MenuItem>
            </SubMenu>
          )}

          {/* Blog */}
          <MenuItem
            active={pathname === navItems.blog.routerPath}
            onClick={() => router.push(navItems.blog.routerPath)}
          >
            {t(navItems.blog.name)}
          </MenuItem>

          {/* Contact */}
          <MenuItem
            active={pathname === navItems.contact.routerPath}
            onClick={() => router.push(navItems.contact.routerPath)}
          >
            {t(navItems.contact.name)}
          </MenuItem>

          {/* Auth Links */}
          {!isAuthenticated && (
            <>
              <MenuItem onClick={() => router.push("/login")}>
                <span className="flaticon-user"></span> {t("login")}
              </MenuItem>
              <MenuItem onClick={() => router.push("/register")}>
                <span className="flaticon-edit"></span> {t("register")}
              </MenuItem>
            </>
          )}
        </Menu>
      </div>

      <Link
        href="/create-listing"
        className="btn btn-block btn-lg btn-thm circle"
        style={{ width: "90%", margin: "0px auto" }}
      >
        <span className="flaticon-plus"></span> {t("addProperty")}
      </Link>
    </>
  );
};

export default MobileMenuContent;
