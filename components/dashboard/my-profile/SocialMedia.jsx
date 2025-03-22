"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/store/hooks";
import { useUpdateUserProfileMutation } from "@/features/api/user.api";

const SocialMedia = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [updateSocialMedia, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const t = useTranslations("dashboard.profile.SocialMedia");

  // Validation Schema
  const schema = yup.object().shape({
    skype: yup.string().url(t("validation.invalidUrl")).nullable(),
    website: yup.string().url(t("validation.invalidUrl")).nullable(),
    facebook: yup.string().url(t("validation.invalidUrl")).nullable(),
    twitter: yup.string().url(t("validation.invalidUrl")).nullable(),
    linkedin: yup.string().url(t("validation.invalidUrl")).nullable(),
    instagram: yup.string().url(t("validation.invalidUrl")).nullable(),
    googlePlus: yup.string().url(t("validation.invalidUrl")).nullable(),
    youtube: yup.string().url(t("validation.invalidUrl")).nullable(),
    pinterest: yup.string().url(t("validation.invalidUrl")).nullable(),
    vimeo: yup.string().url(t("validation.invalidUrl")).nullable(),
  });

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      skype: "",
      website: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      googlePlus: "",
      youtube: "",
      pinterest: "",
      vimeo: "",
    },
  });

  // Populate data when user is loaded
  useEffect(() => {
    if (user?.socialMedia) {
      Object.keys(user.socialMedia).forEach((key) => {
        setValue(key, user.socialMedia[key] || "");
      });
    }
  }, [user, setValue]);

  // Handle Form Submission
  const onSubmit = async (data) => {
    try {
      await updateSocialMedia(data).unwrap();
      Swal.fire({
        icon: "success",
        title: t("alert.success"),
        text: t("alert.socialMediaUpdated"),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("alert.error"),
        text: t("alert.socialMediaUpdateFailed"),
      });
      console.error("Update Error:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {Object.keys(schema.fields).map((key) => (
          <div className="col-lg-6 col-xl-6" key={key}>
            <div className="my_profile_setting_input form-group">
              <label htmlFor={key}>{t(`fields.${key}`)}</label>
              <input type="text" className="form-control" {...register(key)} />
              {errors[key] && (
                <div className="text-danger">{errors[key]?.message}</div>
              )}
            </div>
          </div>
        ))}

        <div className="col-xl-12 text-right">
          <div className="my_profile_setting_input">
            <button type="submit" className="btn btn2" disabled={isUpdating}>
              {isUpdating ? t("updating") : t("updateProfile")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SocialMedia;
