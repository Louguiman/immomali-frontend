"use client";
import { useState } from "react";
import GlobalFilter from "./GlobalFilter";
import { useTranslations } from "next-intl";

type GlobalHeroFilterProps = {
  className?: string;
};

const GlobalHeroFilter: React.FC<GlobalHeroFilterProps> = ({ className = "" }) => {
  const t = useTranslations("search");
  const [activeTab, setActiveTab] = useState<"rent" | "buy">("rent");

  return (
    <div className={`home_adv_srch_opt ${className}`}>
      <ul className="nav nav-pills" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            id="tab-rent"
            className={`nav-link ${activeTab === "rent" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "rent"}
            aria-controls="tabpanel-rent"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setActiveTab("rent");
            }}
            href="#"
          >
            {t("searchbar.rent")}
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            id="tab-buy"
            className={`nav-link ${activeTab === "buy" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "buy"}
            aria-controls="tabpanel-buy"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
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
          id="tabpanel-rent"
          className={`tab-pane fade ${
            activeTab === "rent" ? "show active" : ""
          }`}
          role="tabpanel"
          aria-labelledby="tab-rent"
        >
          <GlobalFilter type="rent" />
        </div>
        <div
          id="tabpanel-buy"
          className={`tab-pane fade ${
            activeTab === "buy" ? "show active" : ""
          }`}
          role="tabpanel"
          aria-labelledby="tab-buy"
        >
          <GlobalFilter type="sale" />
        </div>
      </div>
    </div>
  );
};

export default GlobalHeroFilter;
