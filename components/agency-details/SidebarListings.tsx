import ContactWithAgency from "../common/agent-view/ContactWithAgency";
import Categorie from "../../components/common/listing/Categorie";
import FeaturedListings from "../../components/common/listing/FeaturedListings";
import FeaturedProperties from "../home-4/FeaturedProperties";
import { useAppSelector } from "@/store/store";

const SidebarListings = ({ agencyId }: { agencyId: number }) => {
  const recentlyViewedProperties = useAppSelector(
    (state) => state.properties.recentlyViewed
  );
  return (
    <div className="sidebar_listing_grid1">
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <h4 className="mb25">Contact with Agency</h4>
          <ContactWithAgency agencyId={agencyId} />
        </div>
      </div>
      {/* End filter and search area */}

      <div className="terms_condition_widget style_two-pro">
        <h4 className="title">Featured Properties</h4>
        <FeaturedProperties properties={recentlyViewedProperties} />
      </div>
      {/* End Featured Properties widget */}

      <div className="terms_condition_widget">
        <h4 className="title">Categories Property</h4>
        <div className="widget_list">
          <ul className="list_details">
            <Categorie />
          </ul>
        </div>
      </div>
      {/* End Categories Property widget */}

      <div className="sidebar_feature_listing">
        <h4 className="title">Recently Viewed</h4>
        <FeaturedListings />
      </div>
      {/* End Recently Viewed widget */}
    </div>
  );
};

export default SidebarListings;
