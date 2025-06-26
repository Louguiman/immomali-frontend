import { useTranslations } from "next-intl";
import Categorie from "../listing/Categorie";
import FeaturedListings from "../listing/FeaturedListings";
import FeatureProperties from "../listing/FeatureProperties";

const SidebarListings = () => {
  const t = useTranslations("property.sidebar");

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

        <FeatureProperties />
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
