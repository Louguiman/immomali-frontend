"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckBoxFilter from "../../common/CheckBoxFilter";
import {
  setBeds,
  setBaths,
  setGarages,
  setSqFt,
  setBuiltYear,
} from "@/features/properties/propertiesSlice";

const DetailedInfo = () => {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.properties.createListing);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "beds":
        dispatch(setBeds(value));
        break;
      case "baths":
        dispatch(setBaths(value));
        break;
      case "garages":
        dispatch(setGarages(value));
        break;
      case "sqFt":
        dispatch(setSqFt(value));
        break;
      case "builtYear":
        dispatch(setBuiltYear(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="row">
      {/* Bedrooms */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="beds">Bedrooms</label>
          <input
            type="text"
            className="form-control"
            id="beds"
            required
            value={property.beds}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      {/* Bathrooms */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="baths">Bathrooms</label>
          <input
            type="text"
            required
            className="form-control"
            id="baths"
            value={property.baths}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      {/* Garages */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="garages">Garages</label>
          <input
            type="text"
            className="form-control"
            required
            id="garages"
            value={property.garages}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      {/* Square Footage */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="sqFt">Square Footage</label>
          <input
            type="text"
            className="form-control"
            id="sqFt"
            value={property.sqFt}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      {/* Year Built */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="builtYear">Year Built</label>
          <input
            type="text"
            className="form-control"
            id="builtYear"
            value={property.builtYear}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      {/* Amenities Section */}
      <div className="col-xl-12">
        <h4 className="mb10">Amenities</h4>
      </div>

      <CheckBoxFilter />

      {/* Navigation Buttons */}
      <div className="col-xl-12">
        <div className="my_profile_setting_input overflow-hidden mt20">
          <button href="#location" className="btn btn1 float-start">
            Back
          </button>
          <button href="#media" className="btn btn2 float-end">
            Next
          </button>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default DetailedInfo;
