// LocationField.js
"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddress,
  setState,
  setCity,
  setNeighborhood,
  setZipCode,
  setCountry,
  setLatitude,
  setLongitude,
  setStreetView,
} from "@/features/properties/propertiesSlice";

const LocationField = () => {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.properties.createListing);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "propertyAddress":
        dispatch(setAddress(value));
        break;
      case "propertyState":
        dispatch(setState(value));
        break;
      case "propertyCity":
        dispatch(setCity(value));
        break;
      case "neighborHood":
        dispatch(setNeighborhood(value));
        break;
      case "zipCode":
        dispatch(setZipCode(value));
        break;
      case "googleMapLat":
        dispatch(setLatitude(value));
        break;
      case "googleMapLong":
        dispatch(setLongitude(value));
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "country":
        dispatch(setCountry(value));
        break;
      case "streetView":
        dispatch(setStreetView(value));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="propertyAddress"
            value={property.address}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyState">County / State</label>
          <input
            type="text"
            className="form-control"
            id="propertyState"
            value={property.state}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyCity">City</label>
          <input
            type="text"
            className="form-control"
            id="propertyCity"
            value={property.city}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="neighborHood">Neighborhood</label>
          <input
            type="text"
            className="form-control"
            id="neighborHood"
            value={property.neighborhood}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="zipCode">Zip</label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            value={property.zipCode}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Country</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            id="country"
            value={property.country}
            onChange={handleSelectChange}
          >
            <option value="Mali">Mali</option>
            <option value="Turkey">Turkey</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Spain">Spain</option>
            <option value="Greece">Greece</option>
            <option value="Portugal">Portugal</option>
          </select>
        </div>
      </div>
      {/* End .col */}
      {/* 
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <div className="h400 bdrs8" id="map-canvas">
            <div className="gmap_canvas pe-none">
              <iframe
                title="map"
                className="gmap_iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206252.721472711!2d-115.31508339643749!3d36.12519578053308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV%2C%20USA!5e0!3m2!1sen!2sbd!4v1669000531244!5m2!1sen!2sbd"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="googleMapLat">Latitude (for Google Maps)</label>
          <input
            type="text"
            className="form-control"
            id="googleMapLat"
            value={property.latitude}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="googleMapLong">Longitude (for Google Maps)</label>
          <input
            type="text"
            className="form-control"
            id="googleMapLong"
            value={property.longitude}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Google Map Street View</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            id="streetView"
            value={property.streetView}
            onChange={handleSelectChange}
          >
            <option value="Street View v1">Street View v1</option>
            <option value="Street View v2">Street View v2</option>
            <option value="Street View v3">Street View v3</option>
            <option value="Street View v4">Street View v4</option>
            <option value="Street View v5">Street View v5</option>
            <option value="Street View v6">Street View v6</option>
          </select>
        </div>
      </div> */}
      {/* End .col */}

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button href="#info" className="btn btn1 float-start">
            Back
          </button>
          <button href="#details" className="btn btn2 float-end">
            Next
          </button>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default LocationField;
