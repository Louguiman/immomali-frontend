"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  setPropertyTitle,
  setPropertyDescription,
  setType,
  setCategory,
  setPrice,
} from "@/features/properties/propertiesSlice";

const CreateList = ({ activeStep, onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const t = useTranslations("property");
  const property = useSelector((state) => state.properties.createListing);
  console.log("property create listing: ", property);

  // Validation schema using Yup
  const validationSchema = yup.object().shape({
    title: yup.string().required(t("validation.required")),
    description: yup.string().required(t("validation.required")),
    type: yup.string().required(t("validation.required")),
    category: yup.string().required(t("validation.required")),
    price: yup
      .number()
      .typeError(t("validation.number"))
      .positive(t("validation.positive"))
      .required(t("validation.required")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: property.title || "",
      description: property.description || "",
      type: property.type || "rent",
      category: property.category || "",
      price: property.price || "",
    },
    resolver: yupResolver(validationSchema),
  });

  // Watch the type value in real-time
  const propertyType = watch("type");

  const onSubmit = (data) => {
    dispatch(setPropertyTitle(data.title));
    dispatch(setPropertyDescription(data.description));
    dispatch(setType(data.type));
    dispatch(setCategory(data.category));
    dispatch(setPrice(data.price));
    if (onNext) onNext();
  };

  return (
    <form className="my_dashboard_review" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="mb30">{t("createListing")}</h3>

      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="title">{t("propertyTitle")}</label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="description">{t("description")}</label>
          <textarea
            className="form-control"
            id="description"
            rows="7"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <span className="text-danger">{errors.description.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>{t("type")}</label>
          <select
            className="selectpicker form-select"
            id="type"
            {...register("type")}
          >
            <option value="rent">{t("rent")}</option>
            <option value="sale">{t("sale")}</option>
          </select>
          {errors.type && (
            <span className="text-danger">{errors.type.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>{t("category")}</label>
          <select
            className="selectpicker form-select"
            id="category"
            {...register("category")}
          >
            <option value="">{t("selectCategory")}</option>
            <option value="apartment">{t("apartment")}</option>
            <option value="house">{t("house")}</option>
            <option value="villa">{t("villa")}</option>
            <option value="office">{t("office")}</option>
            <option value="land">{t("land")}</option>
          </select>
          {errors.category && (
            <span className="text-danger">{errors.category.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="price">
            {propertyType === "sale" ? t("price") : t("monthlyRent")} (FCFA)
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price")}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </div>
      </div>

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button type="submit" className="btn btn2 float-end">
            {t("next")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateList;
