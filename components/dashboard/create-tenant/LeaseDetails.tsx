"use client";

import React from "react";
import { useAppSelector } from "@/store/store";
import { useAppDispatch } from "@/store/store";
import { resetTenantForm, setLeaseField } from "@/features/tenant/tenantsSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";

type LeaseDetailsProps = {
  activeStep: number;
  onNext: () => void;
  onPrevious: () => void;
};

const LeaseDetails: React.FC<LeaseDetailsProps> = ({
  activeStep,
  onNext,
  onPrevious,
}) => {
  const t = useTranslations("dashboard");
  const dispatch = useAppDispatch();
  const leaseDetails = useAppSelector((state) => state.tenants.leaseDetails);

  // 📌 Validation Schema using Yup
  const schema = yup.object().shape({
    leaseStartDate: yup
      .string()
      .required(t("TenantProfile.leaseStartDateRequired")),
    leaseEndDate: yup
      .string()
      .test(
        "is-after-start",
        t("TenantProfile.leaseEndDateInvalid"),
        function (value) {
          const { leaseStartDate } = this.parent;
          return (
            !value ||
            !leaseStartDate ||
            new Date(value) >= new Date(leaseStartDate)
          );
        }
      )
      .required(t("TenantProfile.leaseEndDateRequired")),
    monthlyRent: yup
      .number()
      .typeError(t("TenantProfile.monthlyRentInvalid"))
      .min(0, t("TenantProfile.monthlyRentPositive"))
      .required(t("TenantProfile.monthlyRentRequired")),
    securityDeposit: yup
      .number()
      .typeError(t("TenantProfile.securityDepositInvalid"))
      .min(0, t("TenantProfile.securityDepositPositive"))
      .required(t("TenantProfile.securityDepositRequired")),
    leaseType: yup.string().required(t("TenantProfile.leaseTypeRequired")),
    autoRenew: yup
      .string()
      .oneOf(["true", "false"], t("TenantProfile.autoRenewRequired"))
      .required(t("TenantProfile.autoRenewRequired")),
    leaseStatus: yup.string().required(t("TenantProfile.leaseStatusRequired")),
    additionalTerms: yup.string().optional(),
  });

  // 📌 React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    leaseStartDate: string;
    leaseEndDate: string;
    monthlyRent: number;
    securityDeposit: number;
    leaseType: string;
    autoRenew: "true" | "false";
    leaseStatus: string;
    additionalTerms?: string;
  }>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...leaseDetails,
      monthlyRent: leaseDetails.monthlyRent ? Number(leaseDetails.monthlyRent) : 0,
      securityDeposit: leaseDetails.securityDeposit ? Number(leaseDetails.securityDeposit) : 0,
      autoRenew: leaseDetails.autoRenew ? "true" : "false",
    },
  });

  // 📌 Handle form submission
  const onSubmit = (data: {
    leaseStartDate: string;
    leaseEndDate: string;
    monthlyRent: number;
    securityDeposit: number;
    leaseType: string;
    autoRenew: "true" | "false";
    leaseStatus: string;
    additionalTerms?: string;
  }) => {
    Object.entries(data).forEach(([field, value]) => {
      dispatch(setLeaseField({ field, value }));
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-lg-12 row">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="leaseStartDate">
            {t("TenantProfile.leaseStartDate")}
          </label>
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
          <label htmlFor="leaseEndDate">
            {t("TenantProfile.leaseEndDate")}
          </label>
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
          <label htmlFor="monthlyRent">{t("TenantProfile.monthlyRent")}</label>
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
          <label htmlFor="securityDeposit">
            {t("TenantProfile.securityDeposit")}
          </label>
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
          <label htmlFor="leaseType">{t("TenantProfile.leaseType")}</label>
          <select className="form-control" {...register("leaseType")}>
            <option value="fixed-term">{t("TenantProfile.fixedTerm")}</option>
            <option value="month-to-month">
              {t("TenantProfile.monthToMonth")}
            </option>
          </select>
          {errors.leaseType && (
            <span className="text-danger">{errors.leaseType.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="autoRenew">{t("TenantProfile.autoRenew")}</label>
          <select className="form-control" {...register("autoRenew")}>
            <option value="">{t("TenantProfile.autoRenewPrompt")}</option>
            <option value="true">{t("TenantProfile.yes")}</option>
            <option value="false">{t("TenantProfile.no")}</option>
          </select>
          {errors.autoRenew && (
            <span className="text-danger">{errors.autoRenew.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="leaseStatus">{t("TenantProfile.leaseStatus")}</label>
          <select className="form-control" {...register("leaseStatus")}>
            <option value="pending">{t("TenantProfile.pending")}</option>
            <option value="active">{t("TenantProfile.active")}</option>
            <option value="terminated">{t("TenantProfile.terminated")}</option>
          </select>
          {errors.leaseStatus && (
            <span className="text-danger">{errors.leaseStatus.message}</span>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="additionalTerms">
            {t("TenantProfile.additionalTerms")}
          </label>
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
          {t("TenantProfile.resetForm")}
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
            {t("TenantProfile.back")}
          </button>
        )}
        <button type="submit" className="btn btn2 float-end">
          {t("TenantProfile.next")}
        </button>
      </div>
    </form>
  );
};

export default LeaseDetails;
