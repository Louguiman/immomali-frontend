import React from "react";
import { useTranslations } from "next-intl";

function Layout({ children }) {
  const t = useTranslations("dashboard.myTenancies"); // Hook to fetch translation

  return (
    <section className="our-dashbord dashbord bgc-f7 pb50 mt-4">
      <h2>{t("tenanciestitle")}</h2> {/* Translated title */}
      <p>{t("description")}</p> {/* Translated description */}
      {children}
    </section>
  );
}

export default Layout;
