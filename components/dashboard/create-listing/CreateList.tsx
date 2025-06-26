"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  setPropertyTitle,
  setPropertyDescription,
  setType,
  setCategory,
  setPrice,
} from "@/features/properties/propertiesSlice";
import { CreateListProps } from "@/types/property";
import { PropertyType, PropertyCategory } from "@/types/property-enums";

// Form data type that matches our form fields
type CreateListFormData = {
  title: string;
  description: string;
  type: PropertyType;
  category: PropertyCategory;
  price: string; // Always handle as string in the form
};

const CreateList: React.FC<CreateListProps> = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("property");
  const property = useAppSelector((state) => state.properties.createListing);

  // Validation schema using Yup
  // Form validation rules
  const validatePrice = (value: string): string | true => {
    if (!value) return t("validation.required");
    const num = Number(value);
    return (!isNaN(num) && num > 0) || t("validation.positive");
  };

  // Initialize form with default values
  const formMethods = useForm<CreateListFormData>({
    defaultValues: {
      title: property.title || "",
      description: property.description || "",
      type: (property.type as PropertyType) || PropertyType.RENT,
      category: (property.category as PropertyCategory) || PropertyCategory.APARTMENT,
      price: property.price ? String(property.price) : "",
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = formMethods;

  // Watch the type value in real-time
  const propertyType = watch("type");

  const onSubmit: SubmitHandler<CreateListFormData> = (data) => {
    try {
          // Validate price
      const priceError = validatePrice(data.price);
      if (priceError !== true) {
        setError('price', { message: priceError });
        return;
      }

      // Update Redux store with form data
      dispatch(setPropertyTitle(data.title));
      dispatch(setPropertyDescription(data.description));
      dispatch(setType(data.type));
      dispatch(setCategory(data.category));
      
      // Convert price to number before dispatching
      const priceNumber = parseFloat(data.price);
      dispatch(setPrice(priceNumber));
      
      onNext?.();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Consider showing an error message to the user here
    }
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
            rows={7}
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
            <option value={PropertyType.RENT}>{t("rent")}</option>
            <option value={PropertyType.SALE}>{t("sale")}</option>
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
            {Object.values(PropertyCategory).map((category) => (
              <option key={category} value={category}>
                {t(`property.categories.${category}`) || category}
              </option>
            ))}
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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="form-control"
            id="price"
            {...register("price", {
              validate: (value: string) => validatePrice(value)
            })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </div>
      </div>

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button 
            type="submit" 
            className="btn btn2 float-end"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {t("next")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateList;
