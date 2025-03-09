"use client";

import Link from "next/link";

import MyAccount from "./MyAccount";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import LogoutButton from "../../user-credentials/LogoutButton";

const navItems = {
  home: { name: "Home", routerPath: "/" },

  properties: {
    name: "Properties",
    subMenu: [
      { name: "All Properties", routerPath: "/properties" },
      { name: "For Sale", routerPath: "/properties?listingType=sale" },
      { name: "For Rent", routerPath: "/properties?listingType=rent" },
      { name: "Luxury Homes", routerPath: "/properties?propertyType=luxury" },
      { name: "New Listings", routerPath: "/properties?new" },
      { name: "Compare Properties", routerPath: "/compare" },
    ],
  },

  agents: {
    name: "Agents",
    subMenu: [
      { name: "Find an Agent", routerPath: "/professionals/agents" },
      { name: "Agencies", routerPath: "/professionals/agencies" },
      { name: "Become an Agent", routerPath: "/register" },
    ],
  },

  tenantServices: {
    name: "Tenant Services",
    subMenu: [
      { name: "Tenancies", routerPath: "/dashboard/my-tenancies" },
      { name: "Favorites", routerPath: "/dashboard/my-favourites" },
      { name: "Recently Viewed", routerPath: "/dashboard/recently-viewed" },
      { name: "Saved Searches", routerPath: "/dashboard/my-saved-search" },
    ],
  },

  account: {
    name: "Account",
    subMenu: [
      { name: "Dashboard", routerPath: "/dashboard" },
      { name: "My Profile", routerPath: "/dashboard/my-profile" },
      { name: "My Properties", routerPath: "/dashboard/my-properties" },
      { name: "My Inquiries", routerPath: "/dashboard/my-inquiries" },
      { name: "My Requests", routerPath: "/dashboard/maintenance-request" },
      { name: "Rent Payments", routerPath: "/dashboard/my-invoices" },
    ],
  },

  blog: { name: "Blog", routerPath: "/blog-list-1" },
  resources: { name: "Resources", routerPath: "/blog-list-2" },
  contact: { name: "Contact", routerPath: "/contact" },
};

const HeaderMenuContentV4 = ({ float = "" }) => {
  const user = useSelector((state) => state.auth?.user);
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
        <Link href={navItems.home.routerPath}>{navItems.home.name}</Link>
      </li>

      {/* Properties */}
      <li className="dropitem">
        <a href="#" className="title">
          Properties
        </a>
        <ul className="sub-menu">
          {navItems.properties.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Agents */}
      <li className="dropitem">
        <a href="#" className="title">
          Agents
        </a>
        <ul className="sub-menu">
          {navItems.agents.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Tenant Services */}
      <li className="dropitem">
        <a href="#" className="title">
          Tenant Services
        </a>
        <ul className="sub-menu">
          {navItems.tenantServices.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Blog, Resources, Contact */}
      <li className={pathname === navItems.blog.routerPath ? "ui-active" : ""}>
        <Link href={navItems.blog.routerPath}>{navItems.blog.name}</Link>
      </li>
      <li
        className={
          pathname === navItems.resources.routerPath ? "ui-active" : ""
        }
      >
        <Link href={navItems.resources.routerPath}>
          {navItems.resources.name}
        </Link>
      </li>
      <li
        className={pathname === navItems.contact.routerPath ? "ui-active" : ""}
      >
        <Link href={navItems.contact.routerPath}>{navItems.contact.name}</Link>
      </li>

      {/* Authentication Links */}
      {isAuthenticated ? (
        <>
          <li className="user_setting">
            <div className="dropdown">
              <a
                className="btn dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                <Image
                  width={45}
                  height={45}
                  className="rounded-circle"
                  src={user?.img || "/assets/images/team/e1.png"}
                  alt="User"
                />
                <span className="dn-1199 ms-1">{user?.name || "User"}!</span>
              </a>
              <div className="dropdown-menu">
                <MyAccount />
              </div>
            </div>
          </li>
          <LogoutButton />
        </>
      ) : (
        <li className="list-inline-item list_s">
          <Link href="/login">
            <span className="flaticon-user"></span>
            Login
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
