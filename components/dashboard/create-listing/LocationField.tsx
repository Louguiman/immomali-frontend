"use client";

import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootState } from "@/store/store";
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

interface LocationFieldProps {
  activeStep: number;
  onNext?: () => void;
  onPrevious?: () => void;
}

const LocationField: React.FC<LocationFieldProps> = ({
  activeStep,
  onNext,
  onPrevious,
}) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("property");
  // Location state is used for storing the user's current coordinates
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // Store the user's current coordinates (unused in the UI but kept for potential future use)
  const [, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const property = useAppSelector((state: RootState) => state.properties.createListing);

  // Validation schema using Yup
  const validationSchema = yup.object().shape({
    address: yup.string().required(t("validation.required")),
    state: yup.string(),
    city: yup.string().required(t("validation.required")),
    neighborhood: yup.string(),
    zipCode: yup.string(),
    latitude: yup.mixed().test('is-number', t("validation.number"), (value) => {
      if (!value) return true; // Optional field
      return !isNaN(Number(value));
    }),
    longitude: yup.mixed().test('is-number', t("validation.number"), (value) => {
      if (!value) return true; // Optional field
      return !isNaN(Number(value));
    }),
    country: yup.string().required(t("validation.required")),
    streetView: yup.string(),
  });
  
  type FormData = yup.InferType<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Ensure all required fields are provided with default empty strings
    dispatch(setAddress(data.address || ''));
    dispatch(setState(data.state || ''));
    dispatch(setCity(data.city || ''));
    dispatch(setNeighborhood(data.neighborhood || ''));
    dispatch(setZipCode(data.zipCode || ''));
    
    // Convert string values to numbers for latitude and longitude
    const latitude = data.latitude ? Number(data.latitude) : null;
    const longitude = data.longitude ? Number(data.longitude) : null;
    
    // Convert to strings for Redux store compatibility
    dispatch(setLatitude(latitude !== null ? latitude.toString() : ''));
    dispatch(setLongitude(longitude !== null ? longitude.toString() : ''));
    dispatch(setCountry(data.country || 'Mali'));
    dispatch(setStreetView(data.streetView || 'Street View v1'));
    
    if (onNext) onNext();
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          console.log("User coordinates: ", { latitude, longitude });

          setLocation({ latitude, longitude });
          setValue("longitude", longitude);
          setValue("latitude", latitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
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
            <span className="text-danger d-block">{errors.address.message}</span>
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
            <span className="text-danger d-block">{errors.state.message}</span>
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
            <span className="text-danger d-block">{errors.city.message}</span>
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
            <span className="text-danger d-block">{errors.neighborhood.message}</span>
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
            <span className="text-danger d-block">{errors.zipCode.message}</span>
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
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Senegal">Sénégal</option>
            <option value="Côte d&apos;Ivoire">Côte d&apos;Ivoire</option>
            <option value="Guinée">Guinée</option>
            <option value="Niger">Niger</option>
            <option value="Mauritanie">Mauritanie</option>
          </select>
          {errors.country && (
            <span className="text-danger d-block">{errors.country.message}</span>
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
            <span className="text-danger d-block">{errors.latitude.message}</span>
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
            <span className="text-danger d-block">{errors.longitude.message}</span>
          )}
        </div>
      </div>

      {/* <div className="col-lg-4 col-xl-4">
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
      </div> */}

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
          <button 
            type="submit" 
            className="btn btn2 float-end"
            disabled={Object.keys(errors).length > 0}
          >
            {t("next")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LocationField;
