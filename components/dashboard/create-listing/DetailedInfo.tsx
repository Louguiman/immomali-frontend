"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import CheckBoxFilter from "../../common/CheckBoxFilter";
import {
  setBeds,
  setBaths,
  setGarages,
  setSqFt,
  setBuiltYear,
} from "@/features/properties/propertiesSlice";

interface DetailedInfoProps {
  activeStep: number;
  onNext?: () => void;
  onPrevious?: () => void;
}

interface DetailedInfoFormData {
  beds: string;
  baths: string;
  garages: string;
  sqFt: string;
  builtYear: string;
}

const DetailedInfo: React.FC<DetailedInfoProps> = ({ activeStep, onNext, onPrevious }) => {
  const t = useTranslations("property");
  const dispatch = useAppDispatch();
  const property = useAppSelector((state: import("@/store/store").RootState) => state.properties.createListing);

  // Form validation rules
  const validateNumber = (value: string) => {
    if (!value) return t("validation.required");
    return !isNaN(Number(value)) || t("validation.number");
  };

  const validateYear = (value: string) => {
    if (!value) return t("validation.required");
    const year = Number(value);
    return (!isNaN(year) && year >= 1800 && year <= new Date().getFullYear() + 1) || t("validation.number");
  };

  type FormData = DetailedInfoFormData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      beds: property.beds || "",
      baths: property.baths || "",
      garages: property.garages || "",
      sqFt: property.sqFt || "",
      builtYear: property.builtYear ? String(property.builtYear) : "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(setBeds(data.beds));
    dispatch(setBaths(data.baths));
    dispatch(setGarages(data.garages));
    dispatch(setSqFt(data.sqFt));
    dispatch(setBuiltYear(Number(data.builtYear)));
    onNext?.();
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
            {...register("beds", {
              validate: validateNumber
            })}
          />
          {errors.beds && (
            <p className="text-danger">{errors.beds.message as string}</p>
          )}
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
            {...register("baths", {
              validate: validateNumber
            })}
          />
          {errors.baths && (
            <p className="text-danger">{errors.baths.message as string}</p>
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
            {...register("garages", {
              validate: validateNumber
            })}
          />
          {errors.garages && (
            <p className="text-danger">{errors.garages.message as string}</p>
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
            {...register("sqFt", {
              validate: validateNumber
            })}
          />
          {errors.sqFt && (
            <p className="text-danger">{errors.sqFt.message as string}</p>
          )}
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
            {...register("builtYear", {
              validate: validateYear
            })}
          />
          {errors.builtYear && (
            <p className="text-danger">{errors.builtYear.message as string}</p>
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
