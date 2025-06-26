"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetTenantForm, setLeaseField } from "@/features/tenant/tenantsSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";

const LeaseDetails = ({ activeStep, onNext, onPrevious }) => {
  const t = useTranslations("dashboard.TenantProfile");
  const dispatch = useDispatch();
  const leaseDetails = useSelector((state) => state.tenants.leaseDetails);

  // 📌 Validation Schema using Yup
  const schema = yup.object().shape({
    leaseStartDate: yup.date().required(t("leaseStartDateRequired")),
    leaseEndDate: yup
      .date()
      .min(yup.ref("leaseStartDate"), t("leaseEndDateInvalid"))
      .required(t("leaseEndDateRequired")),
    monthlyRent: yup
      .number()
      .typeError(t("monthlyRentInvalid"))
      .min(0, t("monthlyRentPositive"))
      .required(t("monthlyRentRequired")),
    securityDeposit: yup
      .number()
      .typeError(t("securityDepositInvalid"))
      .min(0, t("securityDepositPositive"))
      .required(t("securityDepositRequired")),
    leaseType: yup.string().required(t("leaseTypeRequired")),
    autoRenew: yup.boolean().required(t("autoRenewRequired")),
    leaseStatus: yup.string().required(t("leaseStatusRequired")),
    additionalTerms: yup.string().optional(),
  });

  // 📌 React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: leaseDetails,
  });

  // 📌 Handle form submission
  const onSubmit = (data) => {
    Object.entries(data).forEach(([field, value]) => {
      dispatch(setLeaseField({ field, value }));
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-lg-12 row">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="leaseStartDate">{t("leaseStartDate")}</label>
          <input
            type="date"
            className="form-control"
            {...register("leaseStartDate")}
          />
          {errors.leaseStartDate && (
            <span className="text-danger">{errors.leaseStartDate.message}</span>
          )}
        </div>

        <div className="my_profile_setting_input form-group">
          <label htmlFor="leaseEndDate">{t("leaseEndDate")}</label>
          <input
            type="date"
            className="form-control"
            {...register("leaseEndDate")}
          />
          {errors.leaseEndDate && (
            <span className="text-danger">{errors.leaseEndDate.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="monthlyRent">{t("monthlyRent")}</label>
          <input
            type="number"
            className="form-control"
            {...register("monthlyRent")}
          />
          {errors.monthlyRent && (
            <span className="text-danger">{errors.monthlyRent.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="securityDeposit">{t("securityDeposit")}</label>
          <input
            type="number"
            className="form-control"
            {...register("securityDeposit")}
          />
          {errors.securityDeposit && (
            <span className="text-danger">
              {errors.securityDeposit.message}
            </span>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="leaseType">{t("leaseType")}</label>
          <select className="form-control" {...register("leaseType")}>
            <option value="fixed-term">{t("fixedTerm")}</option>
            <option value="month-to-month">{t("monthToMonth")}</option>
          </select>
          {errors.leaseType && (
            <span className="text-danger">{errors.leaseType.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="autoRenew">{t("autoRenew")}</label>
          <select className="form-control" {...register("autoRenew")}>
            <option value="">{t("autoRenewPrompt")}</option>
            <option value="true">{t("yes")}</option>
            <option value="false">{t("no")}</option>
          </select>
          {errors.autoRenew && (
            <span className="text-danger">{errors.autoRenew.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="leaseStatus">{t("leaseStatus")}</label>
          <select className="form-control" {...register("leaseStatus")}>
            <option value="pending">{t("pending")}</option>
            <option value="active">{t("active")}</option>
            <option value="terminated">{t("terminated")}</option>
          </select>
          {errors.leaseStatus && (
            <span className="text-danger">{errors.leaseStatus.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="additionalTerms">{t("additionalTerms")}</label>
          <input
            type="text"
            className="form-control"
            {...register("additionalTerms")}
          />
        </div>
      </div>

      {/* 🔄 Reset Button */}
      <div className="col-xl-12">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            dispatch(resetTenantForm());
            reset();
          }}
        >
          {t("resetForm")}
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="col-xl-12 mt20">
        {activeStep > 0 && (
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
    </form>
  );
};

export default LeaseDetails;
