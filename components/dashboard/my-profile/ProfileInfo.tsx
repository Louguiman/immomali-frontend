"use client";

import {
  useUpdateUserProfileMutation,
  useUploadProfileImageMutation,
} from "@/features/api/user.api";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { useGetMeQuery } from "@/features/api/auth.api";

interface UserProfileFormData {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  position?: string;
  license?: string;
  taxNumber?: string;
  phone?: string;
  fax?: string;
  mobile?: string;
  language: string;
  companyName?: string;
  address?: string;
  about?: string;
}



// ✅ Schéma de validation Yup avec traduction
const getProfileSchema = (t: (key: string) => string) => {
  return yup.object().shape({
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
}

const ProfileInfo = () => {
  const t = useTranslations("dashboard");
  const { user } = useAppSelector((state) => state.auth);
  const { refetch } = useGetMeQuery();
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [uploadProfileImage, { isLoading: isUploading }] =
    useUploadProfileImageMutation();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(user?.img || null);
  
  type FormData = yup.InferType<ReturnType<typeof getProfileSchema>>;
  // ✅ Hook Form avec validation Yup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
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
  
  type FormField = keyof FormData;

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      (Object.keys(user) as Array<keyof UserProfileFormData>).forEach((key) => {
        if (user[key] !== undefined) {
          setValue(key, user[key] as string);
        }
      });
      if (user?.img) setProfileImageUrl(user.img);
    }
  }, [user, setValue]);

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  // Upload profile image
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

  // Update user profile
  const onSubmit = async (data: FormData) => {
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
                {...register(key as FormField)}
              />
              {errors[key as FormField] && (
                <p className="text-danger">
                  {errors[key as FormField]?.message?.toString()}
                </p>
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
