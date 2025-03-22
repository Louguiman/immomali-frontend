import { useTranslations } from "next-intl";
import Categorie from "../listing/Categorie";
import FeaturedListings from "../listing/FeaturedListings";
import FeatureProperties from "../listing/FeatureProperties";
import FilterSearch from "./FilterSearch";

const SidebarListings = () => {
  const t = useTranslations("home.agents.sidebar");

  return (
    <div className="sidebar_listing_grid1">
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <h4 className="mb25">{t("find_agent")}</h4>
          <FilterSearch />
        </div>
      </div>
      {/* End filter and search area */}

      <div className="terms_condition_widget style_two-pro">
        <h4 className="title">{t("featured_properties")}</h4>
        <FeatureProperties />
      </div>
      {/* End Featured Properties widget */}

      <div className="terms_condition_widget">
        <h4 className="title">{t("categories_property")}</h4>
        <div className="widget_list">
          <ul className="list_details">
            <Categorie />
          </ul>
        </div>
      </div>
      {/* End Categories Property widget */}

      <div className="sidebar_feature_listing">
        <h4 className="title">{t("recently_viewed")}</h4>
        <FeaturedListings />
      </div>
      {/* End Recently Viewed widget */}
    </div>
  );
};

export default SidebarListings;
