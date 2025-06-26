"use client";

import DescriptionsText from "../agency-details/DescriptionsText";
import Team from "../agent-view/agent-v2/Team";
import Comments from "../blog-details/Comments";
import Ratings from "../blog-details/Ratings";
import ReviewBox from "../blog-details/ReviewBox";
import Listings from "./Listings";

const TabDetailsContent = ({ agent, isLoading, error }) => {
  if (isLoading)
    return <p className="text-center mt-5">Loading agent details...</p>;
  if (error)
    return (
      <p className="text-center mt-5 text-danger">
        Error loading agent details.
      </p>
    );

  return (
    <>
      {/* Tab Navigation */}
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
            Description
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#listing"
            role="tab"
            aria-controls="listing"
            aria-selected="false"
          >
            Listings
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#review"
            role="tab"
            aria-controls="review"
            aria-selected="false"
          >
            Reviews
          </a>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content" id="myTabContent2">
        {/* Description Tab */}
        <div
          className="tab-pane fade show active"
          id="description"
          role="tabpanel"
        >
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="mbp_first media">
                <div className="media-body agent-desc">
                  <DescriptionsText description={agent?.description} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Tab */}
        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="listing"
          role="tabpanel"
        >
          <Listings  properties={agent?.properties || []} />
        </div>

        {/* Reviews Tab */}
        <div className="tab-pane fade" id="review" role="tabpanel">
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="total_review">
                <h4>{agent?.reviews?.length || 0} Reviews</h4>
                <ul className="review_star_list mb0 pl10">
                  <Ratings rating={agent?.averageRating || 0} />
                </ul>
                <a className="tr_outoff pl10" href="#">
                  ( {agent?.averageRating || "0.0"} out of 5 )
                </a>
                <a className="write_review float-end fn-xsd" href="#">
                  Write a Review
                </a>
              </div>
              <Comments reviews={agent?.reviews || []} />
              <div className="custom_hr"></div>

              <div className="mbp_comment_form style2">
                <h4>Write a Review</h4>
                <ul className="review_star">
                  <li className="list-inline-item">
                    <span className="sspd_review">
                      <ul>
                        <Ratings rating={0} />
                      </ul>
                    </span>
                  </li>
                  <li className="list-inline-item pr15">
                    <p>Your Rating & Review</p>
                  </li>
                </ul>
                <ReviewBox agentId={agent?.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabDetailsContent;
