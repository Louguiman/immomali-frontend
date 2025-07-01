"use client";

import Link from "next/link";

import MyAccount from "./MyAccount";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const navItems = {
  discover: {
    name: "Discover",
    subMenu: [
      { name: "Latest Listings", routerPath: "/properties?latest" },
      { name: "Trending Homes", routerPath: "/properties?trending" },
      { name: "Most Viewed", routerPath: "/properties?most-viewed" },
      { name: "Best Deals", routerPath: "/properties?best-deals" },
      { name: "Recently Sold", routerPath: "/properties?recently-sold" },
    ],
  },

  market: {
    name: "Market Trends",
    subMenu: [
      { name: "Real Estate Insights", routerPath: "/blog-list-1" }, //routerPath: "/market-trends"
      { name: "Price Changes", routerPath: "/blog-list-2" }, //routerPath: "/market/price-changes"
      { name: "Top Locations", routerPath: "/blog-list-1" }, ///market/top-locations
      { name: "Mortgage Rates", routerPath: "/blog-list-2" }, ///market/mortgage-rates
    ],
  },

  featured: {
    name: "Featured",
    subMenu: [
      { name: "Luxury Homes", routerPath: "/properties?luxury" },
      { name: "Foreclosures", routerPath: "/properties?foreclosures" },
      { name: "New Construction", routerPath: "/properties?new-construction" },
      { name: "Investment Properties", routerPath: "/properties?investments" },
    ],
  },

  guides: {
    name: "Guides & Resources",
    subMenu: [
      { name: "Home Buying Guide", routerPath: "/guides/buying" },
      { name: "Selling Guide", routerPath: "/guides/selling" },
      { name: "Renting Guide", routerPath: "/guides/renting" },
      { name: "Mortgage Guide", routerPath: "/guides/mortgage" },
    ],
  },

  professionals: {
    name: "Professionals",
    subMenu: [
      { name: "Find an Agent", routerPath: "/professionals/agents" },
      {
        name: "Find a Property Manager / Agency",
        routerPath: "/professionals/agencies",
      },
      {
        name: "Mortgage Advisors",
        routerPath: "/professionals/mortgage-advisors",
      },
      { name: "Real Estate Attorneys", routerPath: "/professionals/attorneys" },
    ],
  },

  contact: { name: "Contact", routerPath: "/contact" },
};

const HeaderMenuContentv2 = ({ float = "" }) => {
  const user = useSelector((state: import("@/store/store").RootState) => state.auth?.user);
  const isAuthenticated = useSelector((state: import("@/store/store").RootState) => state.auth?.isAuthenticated);
  const pathname = usePathname();

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      {/* Discover */}
      <li className="dropitem">
        <a href="#" className="title">
          Discover
        </a>
        <ul className="sub-menu">
          {navItems.discover.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Market Trends */}
      <li className="dropitem">
        <a href="#" className="title">
          Market Trends
        </a>
        <ul className="sub-menu">
          {navItems.market.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Featured */}
      <li className="dropitem">
        <a href="#" className="title">
          Featured
        </a>
        <ul className="sub-menu">
          {navItems.featured.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Guides & Resources */}
      <li className="dropitem">
        <a href="#" className="title">
          Guides & Resources
        </a>
        <ul className="sub-menu">
          {navItems.guides.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Professionals */}
      <li className="dropitem">
        <a href="#" className="title">
          Professionals
        </a>
        <ul className="sub-menu">
          {navItems.professionals.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Contact */}
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
        </>
      ) : (
        <li>
          <Link href="/login" className="btn btn-success">
            Login
          </Link>
        </li>
      )}

      {/* Add Property */}
      <li className={`list-inline-item add_listing ${float}`}>
        <Link href="/create-listing">
          <span className="flaticon-plus"></span>
          <span className="dn-lg"> List Your Home</span>
        </Link>
      </li>
    </ul>
  );
};

export default HeaderMenuContentv2;
