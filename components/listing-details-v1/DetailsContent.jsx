import Comments from "../blog-details/Comments";
import Ratings from "../blog-details/Ratings";
import ReviewBox from "../blog-details/ReviewBox";
import ReviewForm from "../blog-details/ReviewForm";
import ReviewsList from "../blog-details/ReviewList";
import AdditionalDetails from "../common/listing-details/AdditionalDetails";
import Attachments from "../common/listing-details/Attachments";
import FloorPlans from "../common/listing-details/FloorPlans";
import PropertyDescriptions from "../common/listing-details/PropertyDescriptions";
import PropertyDetails from "../common/listing-details/PropertyDetails";
import PropertyFeatures from "../common/listing-details/PropertyFeatures";
import PropertyItem from "../common/listing-details/PropertyItem";
import PropertyLocation from "../common/listing-details/PropertyLocation";
import PropertyVideo from "../common/listing-details/PropertyVideo";
import WalkScore from "../common/listing-details/WalkScore";
import WhatsNearby from "../common/listing-details/WhatsNearby";

const DetailsContent = ({ property }) => {
  return (
    <>
      <div className="listing_single_description">
        <div className="lsd_list">
          <PropertyItem
            propertyType={property?.type}
            baths={property?.baths}
            beds={property?.beds}
            size={property?.sqFt}
          />
        </div>
        {/* End .lsd_list */}

        <h4 className="mb30">Description</h4>
        <PropertyDescriptions description={property?.description} />
      </div>
      {/* End .listing_single_description */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">Property Details</h4>
          </div>
          <PropertyDetails property={property} />
        </div>
      </div>
      {/* End .additional_details */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">Additional details</h4>
          </div>
          <AdditionalDetails />
        </div>
      </div>
      {/* End .additional_details */}

      {/* <div className="property_attachment_area">
        <h4 className="mb30">Property Attachments</h4>
        <div className="iba_container style2">
          <Attachments />
        </div>
      </div> */}
      {/* End .property_attachment_area */}

      <div className="application_statics mt30">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb10">Features</h4>
          </div>
          {/* End .col */}

          <PropertyFeatures amenities={property?.amenities} />
        </div>
      </div>
      {/* End .feature_area */}

      <div className="application_statics mt30">
        <h4 className="mb30">
          Location <small className="float-end"></small>
        </h4>
        <h6 className="mb20">
          Address <small className="float-end">{property?.address}</small>
        </h6>
        <h6 className="mb20">
          City <small className="float-end">{property?.city}</small>
        </h6>
        <h6 className="mb20">
          State <small className="float-end">{property?.state}</small>
        </h6>
        <h6 className="mb20">
          Country <small className="float-end">{property?.country}</small>
        </h6>
        <div className="property_video p0">
          <PropertyLocation />
        </div>
      </div>
      {/* End .location_area */}

      {/* <div className="application_statics mt30">
        <h4 className="mb30">Floor plans</h4>
        <div className="faq_according style2">
          <FloorPlans />
        </div>
      </div> */}
      {/* End .floor_plane */}

      {/* <div className="shop_single_tab_content style2 mt30">
        <PropertyVideo />
      </div> */}
      {/* End property-video  */}

      <div className="walkscore_area mt30">
        <WalkScore />
      </div>
      {/* End walkscore_area */}

      <div className="whats_nearby mt30">
        <h4 className="mb10">What&apos;s Nearby</h4>
        <WhatsNearby />
      </div>
      {/* End what's nearby area */}

      <div className="product_single_content">
        <div className="mbp_pagination_comments mt30">
          {/* End .total_review */}
          {/* <Comments /> */}
          <ReviewsList propertyId={property?.id} />
          <div className="custom_hr"></div>

          <div className="mbp_comment_form style2">
            <h4>Write a Review</h4>
            <ul className="review_star">
              <li className="list-inline-item">
                <span className="sspd_review">
                  <ul>
                    <Ratings />
                  </ul>
                </span>
              </li>
              <li className="list-inline-item pr15">
                <p>Your Rating & Review</p>
              </li>
            </ul>
            {/* <ReviewBox /> */}
            <ReviewForm propertyId={property?.id} />
          </div>
        </div>
      </div>
      {/* End review and comment area area */}
    </>
  );
};

export default DetailsContent;
