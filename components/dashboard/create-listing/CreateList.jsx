// CreateList.js
"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPropertyTitle,
  setPropertyDescription,
  setType,
  setCategory,
  setPrice,
  setArea,
  setRooms,
} from "@/features/properties/propertiesSlice";

const CreateList = () => {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.properties.createListing);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "propertyTitle":
        dispatch(setPropertyTitle(value));
        break;
      case "propertyDescription":
        dispatch(setPropertyDescription(value));
        break;
      case "formGroupExamplePrice":
        dispatch(setPrice(value));
        break;
      case "formGroupExampleArea":
        dispatch(setArea(value));
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "type":
        dispatch(setType(value));
        break;
      case "category":
        dispatch(setCategory(value));
        break;
      case "rooms":
        dispatch(setRooms(value));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            required
            value={property.title}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Description</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
            value={property.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Type</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            id="type"
            required
            value={property.type}
            onChange={handleSelectChange}
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Category</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            id="category"
            required
            value={property.category}
            onChange={handleSelectChange}
          >
            <option value="">Select Category</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="office">Office</option>
            <option value="Land">Land</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExamplePrice">
            {property.type === "sale" ? "Price" : "Monthly Rent"} (FCFA)
          </label>
          <input
            type="number"
            className="form-control"
            id="formGroupExamplePrice"
            value={property.price}
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start">Back</button>
          <button href="#location" className="btn btn2 float-end">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateList;
