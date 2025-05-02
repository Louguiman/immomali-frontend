"use client";

import {
  useUpdateUserProfileMutation,
  useUploadProfileImageMutation,
} from "@/features/api/user.api";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { useGetMeQuery } from "@/features/api/auth.api";

// ✅ Schéma de validation Yup avec traduction
const getProfileSchema = (t) =>
  yup.object().shape({
    name: yup.string().required(t("profile.validation.nameRequired")),
    email: yup
      .string()
      .email(t("profile.validation.invalidEmail"))
      .required(t("profile.validation.emailRequired")),
    firstName: yup.string().required(t("profile.validation.firstNameRequired")),
    lastName: yup.string().required(t("profile.validation.lastNameRequired")),
    position: yup.string().notRequired(),
    license: yup.string().notRequired(),
    taxNumber: yup.string().notRequired(),
    phone: yup
      .string()
      .matches(/^\+?\d{10,15}$/, t("profile.validation.invalidPhone"))
      .notRequired(),
    fax: yup.string().notRequired(),
    mobile: yup
      .string()
      .matches(/^\+?\d{10,15}$/, t("profile.validation.invalidMobile"))
      .notRequired(),
    language: yup.string().required(t("profile.validation.languageRequired")),
    companyName: yup.string().notRequired(),
    address: yup.string().notRequired(),
    about: yup.string().notRequired(),
  });

const ProfileInfo = () => {
  const t = useTranslations("dashboard"); // ✅ Récupération des traductions
  const { user } = useAppSelector((state) => state.auth);
  const { refetch } = useGetMeQuery();
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [uploadProfileImage, { isLoading: isUploading }] =
    useUploadProfileImageMutation();
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.img || null);
  // ✅ Hook Form avec validation Yup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getProfileSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      firstName: "",
      lastName: "",
      position: "",
      license: "",
      taxNumber: "",
      phone: "",
      fax: "",
      mobile: "",
      language: "",
      companyName: "",
      address: "",
      about: "",
    },
  });

  // ✅ Pré-remplir les champs avec les données utilisateur
  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => setValue(key, user[key] || ""));
      if (user?.img) setProfileImage(user?.img);
    }
  }, [user, setValue]);

  // ✅ Gestion du changement de fichier
  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setProfileImage(e.target.files[0]);
      setProfileImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // ✅ Upload de l’image de profil
  const handleUploadImage = async () => {
    if (!profileImage) {
      Swal.fire(
        t("profile.alert.error"),
        t("profile.alert.selectImage"),
        "error"
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", profileImage);

    try {
      await uploadProfileImage(formData).unwrap();
      await refetch(); // Re-fetch user data after upload
      Swal.fire(
        t("profile.alert.success"),
        t("profile.alert.imageUpdated"),
        "success"
      );
    } catch (error) {
      Swal.fire(
        t("profile.alert.error"),
        t("profile.alert.imageUpdateFailed"),
        "error"
      );
    }
  };

  // ✅ Mise à jour du profil utilisateur
  const onSubmit = async (data) => {
    try {
      await updateUserProfile(data).unwrap();
      await refetch(); // Re-fetch user data after update
      Swal.fire(
        t("profile.alert.success"),
        t("profile.alert.profileUpdated"),
        "success"
      );
    } catch (error) {
      Swal.fire(
        t("profile.alert.error"),
        t("profile.alert.profileUpdateFailed"),
        "error"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {/* Upload Image */}
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              style={
                profileImageUrl
                  ? {
                      backgroundImage: `url(${profileImageUrl})`,
                    }
                  : undefined
              }
              htmlFor="image1"
            >
              <span>
                <i className="flaticon-download"></i> {t("profile.uploadPhoto")}
              </span>
            </label>
          </div>
          <p>{t("profile.imageMinSize")}</p>
          {profileImage && (
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleUploadImage}
              disabled={isUploading}
            >
              {isUploading ? t("profile.uploading") : t("profile.saveImage")}
            </button>
          )}
        </div>

        {/* Dynamic Form Fields */}
        {Object.keys(getProfileSchema(t).fields).map((key) => (
          <div className="col-lg-6 col-xl-6" key={key}>
            <div className="my_profile_setting_input form-group">
              <label htmlFor={key}>{t(`profile.fields.${key}`)}</label>
              <input
                type="text"
                className="form-control"
                id={key}
                {...register(key)}
              />
              {errors[key] && (
                <p className="text-danger">{errors[key]?.message}</p>
              )}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="col-xl-12 text-right">
          <div className="my_profile_setting_input">
            <button type="submit" className="btn btn2" disabled={isUpdating}>
              {isUpdating ? t("profile.updating") : t("profile.updateProfile")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileInfo;
