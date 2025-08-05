import Team from "./Team";
import Comments from "../blog-details/Comments";
import Ratings from "../blog-details/Ratings";
import ReviewBox from "../blog-details/ReviewBox";
import DescriptionsText from "./DescriptionsText";
import Listings from "./Listings";
import { Agency } from "@/types/agency";
import { useTranslations } from "next-intl";

interface TabDetailsContentProps {
  agency: Agency;
}

const TabDetailsContent = ({ agency }: TabDetailsContentProps) => {
  const t = useTranslations("agency.details");
  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#description"
            role="tab"
            aria-controls="description"
            aria-selected="true"
          >
            {t("descriptionTab", { defaultValue: "Description" })}
          </a>
        </li>
        {/* End Description tab */}

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#listing"
            role="tab"
            aria-controls="listing"
            aria-selected="false"
          >
            {t("listingTab", { defaultValue: "Listing" })}
          </a>
        </li>
        {/* End Listing tab */}

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#agetns"
            role="tab"
            aria-controls="listing"
            aria-selected="false"
          >
            {t("agentsTab", { defaultValue: "Agents" })}
          </a>
        </li>
        {/* End Listing tab */}

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#review"
            role="tab"
            aria-controls="review"
            aria-selected="false"
          >
            {t("reviewsTab", { defaultValue: "Reviews" })}
          </a>
        </li>
        {/* End Reviews tab */}
      </ul>
      {/* End .nav nav-tabs */}

      <div className="tab-content" id="myTabContent2">
        <div
          className="tab-pane fade show active"
          id="description"
          role="tabpanel"
        >
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="mbp_first media">
                <div className="media-body agent-desc">
                  <DescriptionsText description={agency?.description} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Description details content*/}

        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="listing"
          role="tabpanel"
        >
          <Listings properties={agency.properties} />
        </div>
        {/* End Listing details content*/}

        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="agetns"
          role="tabpanel"
        >
          <div className="row  mt30">
            <Team agents={agency.agents} />
          </div>
        </div>
        {/* End Listing details content*/}

        <div className="tab-pane fade" id="review" role="tabpanel">
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="total_review">
                <h4>
                  {t("reviewsCount", {
                    count: 896,
                    defaultValue: "{count} Reviews",
                  })}
                </h4>
                <ul className="review_star_list mb0 pl10">
                  <Ratings />
                </ul>
                <a className="tr_outoff pl10" href="#">
                  {t("outOf", {
                    value: 4.5,
                    max: 5,
                    defaultValue: "( {value} out of {max} )",
                  })}
                </a>
                <a className="write_review float-end fn-xsd" href="#">
                  {t("writeReview", { defaultValue: "Write a Review" })}
                </a>
              </div>
              {/* End .total_review */}
              <Comments />
              <div className="custom_hr"></div>

              <div className="mbp_comment_form style2">
                <h4>{t("writeReview", { defaultValue: "Write a Review" })}</h4>
                <ul className="review_star">
                  <li className="list-inline-item">
                    <span className="sspd_review">
                      <ul>
                        <Ratings />
                      </ul>
                    </span>
                  </li>
                  <li className="list-inline-item pr15">
                    <p>
                      {t("yourRatingReview", {
                        defaultValue: "Your Rating & Review",
                      })}
                    </p>
                  </li>
                </ul>
                <ReviewBox />
              </div>
            </div>
          </div>
        </div>
        {/* End Reviews details content*/}
      </div>
      {/* End tab-content */}
    </>
  );
};

export default TabDetailsContent;
