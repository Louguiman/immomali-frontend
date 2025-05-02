"use client";
import { useState } from "react";
import GlobalFilter from "./GlobalFilter";
import { useTranslations } from "next-intl";

const GlobalHeroFilter = ({ className = "" }) => {
  const t = useTranslations("search");
  const [activeTab, setActiveTab] = useState("rent");

  return (
    <div className={`home_adv_srch_opt ${className}`}>
      <ul className="nav nav-pills" role="tablist">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "rent" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "rent"}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("rent");
            }}
            href="#"
          >
            {t("searchbar.rent")}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "buy" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "buy"}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("buy");
            }}
            href="#"
          >
            {t("searchbar.buy")}
          </a>
        </li>
      </ul>
      {/* End nav-pills */}

      <div className="tab-content home1_adsrchfrm">
        <div
          className={`tab-pane fade ${
            activeTab === "rent" ? "show active" : ""
          }`}
          role="tabpanel"
        >
          <GlobalFilter type="rent" />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "buy" ? "show active" : ""
          }`}
          role="tabpanel"
        >
          <GlobalFilter type="sale" />
        </div>
      </div>
    </div>
  );
};

export default GlobalHeroFilter;
