"use client";

import Link from "next/link";

import MyAccount from "./MyAccount";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const navItems = {
  buy: {
    name: "Buy",
    subMenu: [
      { name: "Homes for Sale", routerPath: "/buy/homes" },
      { name: "Foreclosures", routerPath: "/buy/foreclosures" },
      { name: "New Construction", routerPath: "/buy/new-construction" },
      { name: "Luxury Homes", routerPath: "/buy/luxury" },
      { name: "Investment Properties", routerPath: "/buy/investment" },
      { name: "Find an Agent", routerPath: "/agents" },
    ],
  },

  rent: {
    name: "Rent",
    subMenu: [
      { name: "Apartments for Rent", routerPath: "/rent/apartments" },
      { name: "Houses for Rent", routerPath: "/rent/houses" },
      { name: "Short-Term Rentals", routerPath: "/rent/short-term" },
      { name: "Pet-Friendly Rentals", routerPath: "/rent/pet-friendly" },
      { name: "Luxury Rentals", routerPath: "/rent/luxury" },
      { name: "Find a Property Manager", routerPath: "/property-managers" },
    ],
  },

  sell: {
    name: "Sell",
    subMenu: [
      { name: "Sell Your Home", routerPath: "/sell" },
      { name: "Home Valuation", routerPath: "/valuation" },
      { name: "List Your Property", routerPath: "/create-listing" },
      { name: "Marketing Strategies", routerPath: "/marketing" },
      { name: "Request an Agent", routerPath: "/request-agent" },
    ],
  },

  mortgage: {
    name: "Mortgage",
    subMenu: [
      { name: "Mortgage Calculator", routerPath: "/mortgage-calculator" },
      { name: "Refinance Rates", routerPath: "/mortgage/refinance" },
      { name: "Mortgage Pre-Approval", routerPath: "/mortgage/pre-approval" },
      { name: "Home Loans", routerPath: "/mortgage/home-loans" },
      { name: "First-Time Buyer Guide", routerPath: "/mortgage/first-time" },
    ],
  },

  professionals: {
    name: "Professionals",
    subMenu: [
      { name: "Find an Agent", routerPath: "/professionals/agents" },
      {
        name: "Find a Property Manager / an Agency",
        routerPath: "/professionals/agencies",
      },
      { name: "Real Estate Attorneys", routerPath: "/professionals/attorneys" },
      { name: "Home Inspectors", routerPath: "/professionals/inspectors" },
      { name: "Mortgage Lenders", routerPath: "/professionals/lenders" },
    ],
  },

  insights: {
    name: "Insights",
    subMenu: [
      { name: "Market Trends", routerPath: "/market-trends" },
      { name: "Real Estate Advice", routerPath: "/advice" },
      { name: "News & Updates", routerPath: "/news" },
      { name: "Guides & Resources", routerPath: "/guides" },
    ],
  },

  contact: { name: "Contact", routerPath: "/contact" },
};

const HeaderMenuContentV3 = ({ float = "" }) => {
  const user = useSelector((state: import("@/store/store").RootState) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const pathname = usePathname();

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      {/* Buy */}
      <li className="dropitem">
        <a href="#" className="title">
          Buy
        </a>
        <ul className="sub-menu">
          {navItems.buy.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Rent */}
      <li className="dropitem">
        <a href="#" className="title">
          Rent
        </a>
        <ul className="sub-menu">
          {navItems.rent.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Sell */}
      <li className="dropitem">
        <a href="#" className="title">
          Sell
        </a>
        <ul className="sub-menu">
          {navItems.sell.subMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.routerPath}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Mortgage */}
      <li className="dropitem">
        <a href="#" className="title">
          Mortgage
        </a>
        <ul className="sub-menu">
          {navItems.mortgage.subMenu.map((item, index) => (
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

      {/* Insights */}
      <li className="dropitem">
        <a href="#" className="title">
          Insights
        </a>
        <ul className="sub-menu">
          {navItems.insights.subMenu.map((item, index) => (
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

export default HeaderMenuContentV3;
