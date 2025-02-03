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
            value={property.type}
            onChange={handleSelectChange}
          >
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
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
            value={property.category}
            onChange={handleSelectChange}
          >
            <option value="">Select Category</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Office">Office</option>
            <option value="Land">Land</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExamplePrice">Price</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExamplePrice"
            value={property.price}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">Area</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleArea"
            value={property.area}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Rooms</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            id="rooms"
            value={property.rooms}
            onChange={handleSelectChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="Other">Other</option>
          </select>
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
