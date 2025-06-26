"use client";

import React, { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";

interface FloorPlanFormData {
  planDescription: string;
  planBedrooms: string;
  planBathrooms: string;
  planPrice: string;
  planPostfix: string;
  planSize: string;
  planImage: File | null;
  planFullDescription: string;
}

const FloorPlans: React.FC = () => {
  const t = useTranslations("property");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FloorPlanFormData>({
    defaultValues: {
      planDescription: "",
      planBedrooms: "",
      planBathrooms: "",
      planPrice: "",
      planPostfix: "",
      planSize: "",
      planImage: null,
      planFullDescription: "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("planImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FloorPlanFormData> = (data) => {
    console.log("Floor plan data:", data);
    // Handle form submission (e.g., dispatch to Redux)
  };

  const handleBack = () => {
    // Handle back navigation
  };

  // Handle form submission is now directly in the form's onSubmit
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row">
      <div className="col-xl-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planDescription">{t("planDescription")}</label>
          <input
            type="text"
            className={`form-control ${errors.planDescription ? "is-invalid" : ""}`}
            id="planDescription"
            {...register("planDescription", { required: t("validation.required") })}
          />
          {errors.planDescription && (
            <div className="invalid-feedback d-block">
              {errors.planDescription.message}
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planBedrooms">{t("bedrooms")}</label>
          <input
            type="number"
            min="0"
            className={`form-control ${errors.planBedrooms ? "is-invalid" : ""}`}
            id="planBedrooms"
            {...register("planBedrooms", { required: t("validation.required") })}
          />
          {errors.planBedrooms && (
            <div className="invalid-feedback d-block">
              {errors.planBedrooms.message}
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planBathrooms">{t("bathrooms")}</label>
          <input
            type="number"
            min="0"
            step="0.5"
            className={`form-control ${errors.planBathrooms ? "is-invalid" : ""}`}
            id="planBathrooms"
            {...register("planBathrooms", { required: t("validation.required") })}
          />
          {errors.planBathrooms && (
            <div className="invalid-feedback d-block">
              {errors.planBathrooms.message}
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planPrice">{t("price")}</label>
          <div className="input-group">
            <input
              type="number"
              min="0"
              step="0.01"
              className={`form-control ${errors.planPrice ? "is-invalid" : ""}`}
              id="planPrice"
              {...register("planPrice", { required: t("validation.required") })}
            />
            <span className="input-group-text">FCFA</span>
          </div>
          {errors.planPrice && (
            <div className="invalid-feedback d-block">
              {errors.planPrice.message}
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planPostfix">{t("pricePostfix")}</label>
          <input
            type="text"
            className={`form-control ${errors.planPostfix ? "is-invalid" : ""}`}
            id="planPostfix"
            placeholder={t("e.g. per month")}
            {...register("planPostfix")}
          />
          {errors.planPostfix && (
            <div className="invalid-feedback d-block">
              {errors.planPostfix.message}
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planSize">{t("size")} (m²)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className={`form-control ${errors.planSize ? "is-invalid" : ""}`}
            id="planSize"
            {...register("planSize", { required: t("validation.required") })}
          />
          {errors.planSize && (
            <div className="invalid-feedback d-block">
              {errors.planSize.message}
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label>{t("planImage")}</label>
          <div className="avatar-upload">
            <div className="avatar-edit">
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                className="d-none"
                onChange={handleImageChange}
              />
              <label
                htmlFor="imageUpload"
                className="btn btn-thm"
              >
                {t("uploadImage")}
              </label>
            </div>
            <div className="avatar-preview">
              <div
                id="imagePreview"
                className={`preview-image ${previewImage ? 'has-image' : ''}`}
                data-bg-image={previewImage || ''}
              ></div>
            </div>
          </div>
          {errors.planImage && (
            <div className="invalid-feedback d-block">
              {errors.planImage.message}
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12">
        <div className="my_profile_setting_textarea mt30-991">
          <label htmlFor="planFullDescription">
            {t("fullDescription")}
          </label>
          <textarea
            className={`form-control ${errors.planFullDescription ? "is-invalid" : ""}`}
            id="planFullDescription"
            rows={7}
            {...register("planFullDescription")}
          ></textarea>
          {errors.planFullDescription && (
            <div className="invalid-feedback d-block">
              {errors.planFullDescription.message}
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button
            type="button"
            className="btn btn1 float-start"
            onClick={handleBack}
          >
            {t("back")}
          </button>
          <button type="submit" className="btn btn2 float-end">
            {t("next")}
          </button>
        </div>
      </div>
      {/* End .col */}
    </form>
  );
};

export default FloorPlans;
