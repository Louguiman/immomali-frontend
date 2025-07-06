"use client";
import { useTranslations } from "next-intl";
import Categorie from "../listing/Categorie";
import FeaturedListings from "../listing/FeaturedListings";
import FeaturedProperties from "@/components/home-4/FeaturedProperties";
import { useAppSelector } from "@/store/store";

const SidebarListings = () => {
  const t = useTranslations("property.sidebar");
  const recentlyViewedProperties = useAppSelector(
    (state) => state.properties.recentlyViewed
  );
  return (
    <div className="sidebar_listing_grid1">
      <div className="terms_condition_widget">
        <h4 className="title">{t("categoriesProperty")}</h4>

        <div className="widget_list">
          <ul className="list_details">
            <Categorie />
          </ul>
        </div>
      </div>
      {/* End Categories Property widget */}

      <div className="terms_condition_widget style_two-pro">
        <h4 className="title">{t("featuredProperties")}</h4>

        <FeaturedProperties properties={recentlyViewedProperties} />
      </div>
      {/* End Featured Properties widget */}

      <div className="sidebar_feature_listing">
        <h4 className="title">{t("recentlyViewed")}</h4>

        <FeaturedListings />
      </div>
      {/* End Recently Viewed widget */}
    </div>
  );
};

export default SidebarListings;
