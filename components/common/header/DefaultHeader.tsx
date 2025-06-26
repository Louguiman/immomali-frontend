"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Image from "next/image";
import HeaderMenuContent from "./dashboard/HeaderMenuContent";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      <div className="container-fluid p0">
        {/* <!-- Menu Toggle btn--> */}
        <Link href="/" className="navbar_brand float-start dn-smd">
          <Image
            src="/assets/images/logo/logo-ikasow.svg"
            alt="Ikasow Logo"
            width={220}
            height={0}
            style={{
              height: "auto",
              width: "100%",
              maxWidth: 220,
              display: "block",
            }}
            priority
          />
        </Link>
        {/* site logo brand */}

        <nav>
          <HeaderMenuContent />
        </nav>
        {/* End .navbar */}
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
