"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import HeaderMenuContent from "../common/header/dashboard/HeaderMenuContent";

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
      className={`header-nav menu_style_home_one  navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      <div className="container-fluid p0">
        {/* <!-- Ace Responsive Menu --> */}

        <Link href="/" className="navbar_brand float-start dn-smd">
          <Image
            src="/assets/images/logo/logo-ikasow.svg"
            alt="Ikasow Logo"
            width={220}
            style={{ height: "auto", maxWidth: 220, display: "block" }}
            0c4836ff
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
