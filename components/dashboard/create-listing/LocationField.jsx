"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const LocationField = ({ activeStep, onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const t = useTranslations("property");
  const [location, setLocation] = useState(null);
  const property = useSelector((state) => state.properties.createListing);

  // Validation schema using Yup
  const validationSchema = yup.object().shape({
    address: yup.string().required(t("validation.required")),
    state: yup.string(),
    city: yup.string().required(t("validation.required")),
    neighborhood: yup.string(),
    zipCode: yup.string(),
    // latitude: yup.notRequired().numb er().typeError(t("validation.number")),
    // longitude: yup.notRequired().number().typeError(t("validation.number")),
    country: yup.string().required(t("validation.required")),
    streetView: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: property.address || "",
      state: property.state || "",
      city: property.city || "",
      neighborhood: property.neighborhood || "",
      zipCode: property.zipCode || "",
      latitude: property.latitude || "",
      longitude: property.longitude || "",
      country: property.country || "Mali",
      streetView: property.streetView || "Street View v1",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    dispatch(setAddress(data.address));
    dispatch(setState(data.state));
    dispatch(setCity(data.city));
    dispatch(setNeighborhood(data.neighborhood));
    dispatch(setZipCode(data.zipCode));
    dispatch(setLatitude(data.latitude));
    dispatch(setLongitude(data.longitude));
    dispatch(setCountry(data.country));
    dispatch(setStreetView(data.streetView));
    onNext();
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        console.log("coords user: ", coords);

        setLocation({ latitude, longitude });
        setValue("longitude", longitude);
        setValue("latitude", latitude);
      });
    }
  };

  return (
    <form
      className="my_dashboard_review mt30"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="mb30">{t("location")}</h3>

      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="address">{t("address")}</label>
          <input
            type="text"
            className="form-control"
            id="address"
            {...register("address")}
          />
          {errors.address && (
            <span className="text-danger">{errors.address.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="state">{t("countyState")}</label>
          <input
            type="text"
            className="form-control"
            id="state"
            {...register("state")}
          />
          {errors.state && (
            <span className="text-danger">{errors.state.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="city">{t("city")}</label>
          <input
            type="text"
            className="form-control"
            id="city"
            {...register("city")}
          />
          {errors.city && (
            <span className="text-danger">{errors.city.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="neighborhood">{t("neighborhood")}</label>
          <input
            type="text"
            className="form-control"
            id="neighborhood"
            {...register("neighborhood")}
          />
          {errors.neighborhood && (
            <span className="text-danger">{errors.neighborhood.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="zipCode">{t("zipCode")}</label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            {...register("zipCode")}
          />
          {errors.zipCode && (
            <span className="text-danger">{errors.zipCode.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>{t("country")}</label>
          <select
            className="selectpicker form-select"
            id="country"
            {...register("country")}
          >
            <option value="Mali">Mali</option>
            <option value="Turkey">Turkey</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Spain">Spain</option>
            <option value="Greece">Greece</option>
            <option value="Portugal">Portugal</option>
          </select>
          {errors.country && (
            <span className="text-danger">{errors.country.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <button
          className="btn btn-primary"
          type="button"
          onClick={getUserLocation}
        >
          Get my current coordinates
        </button>
        <div className="my_profile_setting_input form-group">
          <label htmlFor="latitude">{t("latitude")}</label>
          <input
            type="number"
            className="form-control"
            step="any"
            id="latitude"
            {...register("latitude")}
          />
          {errors.latitude && (
            <span className="text-danger">{errors.latitude.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="longitude">{t("longitude")}</label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="longitude"
            {...register("longitude")}
          />
          {errors.longitude && (
            <span className="text-danger">{errors.longitude.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>{t("streetView")}</label>
          <select
            className="selectpicker form-select"
            id="streetView"
            {...register("streetView")}
          >
            <option value="Street View v1">Street View v1</option>
            <option value="Street View v2">Street View v2</option>
            <option value="Street View v3">Street View v3</option>
            <option value="Street View v4">Street View v4</option>
            <option value="Street View v5">Street View v5</option>
            <option value="Street View v6">Street View v6</option>
          </select>
          {errors.streetView && (
            <span className="text-danger">{errors.streetView.message}</span>
          )}
        </div>
      </div>

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          {activeStep > 0 && (
            <button
              type="button"
              className="btn btn1 float-start"
              onClick={onPrevious}
            >
              {t("back")}
            </button>
          )}
          <button type="submit" className="btn btn2 float-end">
            {t("next")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LocationField;
