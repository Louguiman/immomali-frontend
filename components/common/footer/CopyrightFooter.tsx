"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import Link from "next/link";

const CopyrightFooter = () => {
  const t = useTranslations();

  const menuItems = [
    { id: 1, name: t("navbar.home"), routeLink: "/" },
    { id: 2, name: t("navbar.properties.name"), routeLink: "/properties" },
    {
      id: 3,
      name: t("navbar.properties.subMenu.allProperties"),
      routeLink: "/properties",
    },
    { id: 4, name: t("navbar.about"), routeLink: "/about-us" },
    { id: 5, name: t("navbar.blog"), routeLink: "/blog-list-3" },
    { id: 6, name: t("navbar.contact"), routeLink: "/contact" },
  ];

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="footer_menu_widget">
          <ul>
            {menuItems.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <Link href={item.routeLink}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="copyright-widget text-end">
          <p>
            &copy; {new Date().getFullYear()} {t("navbar.by")}{" "}
            <a href="#" target="_blank" rel="noreferrer">
              SankareTech
            </a>
            . {t("navbar.allRightsReserved")}
          </p>
        </div>
      </div>
      <div className="col-lg-2 col-xl-2">
        <LanguageSwitcher />
      </div>
      {/* End .col */}
    </div>
  );
};

export default CopyrightFooter;
