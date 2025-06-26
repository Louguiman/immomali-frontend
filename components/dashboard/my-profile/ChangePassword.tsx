"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { useChangePasswordMutation } from "@/features/api/user.api";

const ChangePassword = () => {
  const t = useTranslations("dashboard.profile.ChangePassword");
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  // Validation Schema
  const schema = yup.object().shape({
    oldPassword: yup.string().required(t("validation.required")),
    newPassword: yup
      .string()
      .min(6, t("validation.minLength"))
      .required(t("validation.required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], t("validation.passwordMatch"))
      .required(t("validation.required")),
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle Submit
  const onSubmit = async (data) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: t("alert.success"),
        text: t("alert.passwordUpdated"),
      });

      reset(); // Reset form after successful update
    } catch (error) {
      console.log("password error: ", error);

      Swal.fire({
        icon: "error",
        title: t("alert.error"),
        text:
          t("alert.passwordUpdateFailed") +
          ": " +
          error?.data?.message?.toString(),
      });

      console.log("Change Password Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="oldPassword">{t("fields.oldPassword")}</label>
            <input
              type="password"
              className="form-control"
              {...register("oldPassword")}
            />
            {errors.oldPassword && (
              <div className="text-danger">{errors.oldPassword.message}</div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="newPassword">{t("fields.newPassword")}</label>
            <input
              type="password"
              className="form-control"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <div className="text-danger">{errors.newPassword.message}</div>
            )}
          </div>
        </div>

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="confirmPassword">
              {t("fields.confirmPassword")}
            </label>
            <input
              type="password"
              className="form-control"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <div className="text-danger">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>

        <div className="col-xl-12 text-end my_profile_setting_input float-end fn-520">
          <button type="submit" className="btn btn2" disabled={isLoading}>
            {isLoading ? t("updating") : t("updateProfile")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
