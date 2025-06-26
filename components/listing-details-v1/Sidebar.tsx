import { useTranslations } from "next-intl";
import ContactWithAgent from "../common/agent-view/ContactWithAgent";
import Categorie from "../common/listing/Categorie";
import ListingCreator from "../common/listing/ListingCreator";
import FeaturedListings from "../common/listing/FeaturedListings";
import FeaturedProperties from "../home-4/FeaturedProperties";

const Sidebar = ({ propertyId, agent }) => {
  const t = useTranslations("property.sidebar");

  return (
    <>
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="sl_creator">
            <h4 className="mb25">{t("listedBy")}</h4>
            <ListingCreator owner={agent} />
          </div>
          {/* End .sl_creator */}
          <ContactWithAgent agentId={agent?.id} propertyId={propertyId} />
        </div>
      </div>
      {/* End .sidebar_listing_list */}

      <div className="terms_condition_widget">
        <h4 className="title">{t("featuredProperties")}</h4>
        <div className="sidebar_feature_property_slider">
          <FeaturedProperties />
        </div>
      </div>
      {/* End .Featured Properties */}

      <div className="terms_condition_widget">
        <h4 className="title">{t("categoriesProperty")}</h4>
        <div className="widget_list">
          <ul className="list_details">
            <Categorie />
          </ul>
        </div>`1`
      </div>
      {/* End .Categories Property */}

      <div className="sidebar_feature_listing">
        <h4 className="title">{t("recentlyViewed")}</h4>
        <FeaturedListings />
      </div>
      {/* End .Recently Viewed */}
    </>
  );
};

export default Sidebar;
