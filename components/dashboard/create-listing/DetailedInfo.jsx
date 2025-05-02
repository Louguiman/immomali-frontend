"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import CheckBoxFilter from "../../common/CheckBoxFilter";
import {
  setBeds,
  setBaths,
  setGarages,
  setSqFt,
  setBuiltYear,
} from "@/features/properties/propertiesSlice";

const DetailedInfo = ({ activeStep, onNext, onPrevious }) => {
  const t = useTranslations("property");
  const dispatch = useDispatch();
  const property = useSelector((state) => state.properties.createListing);

  // Validation schema using Yup
  const schema = yup.object().shape({
    beds: yup
      .number()
      .typeError(t("validation.number"))
      .required(t("validation.required")),
    baths: yup
      .number()
      .typeError(t("validation.number"))
      .required(t("validation.required")),
    garages: yup
      .number()
      .typeError(t("validation.number"))
      .required(t("validation.required")),
    sqFt: yup
      .number()
      .typeError(t("validation.number"))
      .required(t("validation.required")),
    builtYear: yup
      .number()
      .typeError(t("validation.number"))
      .required(t("validation.required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: property,
  });

  const onSubmit = (data) => {
    dispatch(setBeds(data.beds));
    dispatch(setBaths(data.baths));
    dispatch(setGarages(data.garages));
    dispatch(setSqFt(data.sqFt));
    dispatch(setBuiltYear(data.builtYear));
    if (onNext) onNext();
  };

  return (
    <form
      className="my_dashboard_review row mt30"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="mb30">{t("detailedInformation")}</h3>

      {/* Bedrooms */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="beds">{t("bedrooms")}</label>
          <input
            type="text"
            className="form-control"
            id="beds"
            {...register("beds")}
          />
          {errors.beds && <p className="text-danger">{errors.beds.message}</p>}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="baths">{t("bathrooms")}</label>
          <input
            type="text"
            className="form-control"
            id="baths"
            {...register("baths")}
          />
          {errors.baths && (
            <p className="text-danger">{errors.baths.message}</p>
          )}
        </div>
      </div>

      {/* Garages */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="garages">{t("garages")}</label>
          <input
            type="text"
            className="form-control"
            id="garages"
            {...register("garages")}
          />
          {errors.garages && (
            <p className="text-danger">{errors.garages.message}</p>
          )}
        </div>
      </div>

      {/* Square Footage */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="sqFt">{t("squareFootage")}</label>
          <input
            type="text"
            className="form-control"
            id="sqFt"
            {...register("sqFt")}
          />
          {errors.sqFt && <p className="text-danger">{errors.sqFt.message}</p>}
        </div>
      </div>

      {/* Year Built */}
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="builtYear">{t("yearBuilt")}</label>
          <input
            type="text"
            className="form-control"
            id="builtYear"
            {...register("builtYear")}
          />
          {errors.builtYear && (
            <p className="text-danger">{errors.builtYear.message}</p>
          )}
        </div>
      </div>

      {/* Amenities Section */}
      <div className="col-xl-12">
        <h4 className="mb10">{t("Amenities")}</h4>
      </div>

      <CheckBoxFilter />

      {/* Navigation Buttons */}
      <div className="col-xl-12">
        <div className="my_profile_setting_input overflow-hidden mt20">
          {activeStep > 1 && (
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

export default DetailedInfo;
