"use client";
import { useDispatch } from "react-redux";
import { clearCompareList } from "@/features/properties/propertiesSlice";

import ComparePricing from "./ComparePricing";
import { useSelector } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const compareList = useSelector((state) => state.properties.compareList);

  // if (compareList.length === 0)
  //   return <p>No properties selected for comparison.</p>;

  return (
    <>
      {/* <!-- Our Pricing Table --> */}
      <section className="our-pricing bgc-fa">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Compare Listings</h2>
                <p>We provide full service at every step</p>
              </div>
            </div>
            {/* <button
              onClick={() => dispatch(clearCompareList())}
              className="btn btn-warning mb-3"
            >
              Clear Comparison
            </button> */}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="membership_container">
                <ul className="mc_parent_list">
                  <li className="list-inline-item">
                    <ul className="mc_child_list one">
                      <li>
                        <div className="">Property</div>
                      </li>
                      <li>City</li>
                      <li>Beds</li>
                      <li>Bathrooms</li>
                      <li>Garage</li>
                      <li>Year of build</li>
                      <li>Laundry Room</li>
                      <li>Status</li>

                      {/* Additional fields */}
                      <li>State</li>
                      <li>Country</li>
                      <li>Address</li>
                      <li>Neighborhood</li>
                      <li>Category</li>
                      <li>Type</li>
                      <li>Sale Tag</li>
                      <li>Sq. Ft</li>
                      <li>Attachments</li>
                      <li>Featured</li>
                      <li>Owner</li>
                      <li>Agency</li>
                      <li>Tenants</li>

                      {/* Amenities */}
                      <li>Air Conditioning</li>
                      <li>Barbeque</li>
                      <li>Dryer</li>
                      <li>Gym</li>
                      <li>Lawn</li>
                      <li>Microwave</li>
                      <li>Outdoor Shower</li>
                      <li>Refrigerator</li>
                      <li>Sauna</li>
                      <li>Swimming Pool</li>
                      <li>TV Cable</li>
                      <li>Washer</li>
                      <li>WiFi</li>
                      <li>Window Coverings</li>

                      {/* View Link */}
                      <li>Action</li>
                    </ul>
                  </li>

                  <ComparePricing />
                </ul>
                {/* End .mc_parent_list */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
