"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

import { getAgencyProfileSchema } from "@/utils/lib/validation/agency";
import {
  useGetAgencyByIdQuery,
  useUpdateAgencyMutation,
} from "@/features/api/agencies.api";
import { toBase64 } from "@/utils/lib";

type AgencyProfileFormProps = {
  agencyId: string | number;
};

type Agency = {
  id: string | number;
  logoUrl?: string;
  [key: string]: any; // Add index signature for dynamic fields
};

const AgencyProfileForm: React.FC<AgencyProfileFormProps> = ({ agencyId }) => {
  const t = useTranslations("dashboard"); // Load translations for the "profile" namespace
  const [editMode, setEditMode] = useState(false);
  const { data: agency, isLoading } = useGetAgencyByIdQuery(agencyId, {
    skip: !agencyId,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(agency?.logoUrl || null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [updateAgency, { isLoading: isUpdating }] = useUpdateAgencyMutation();
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  // console.log("agency: ", agency);
  const validationSchema = useMemo(() => getAgencyProfileSchema(t), [t]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  // Load initial data
  useEffect(() => {
    if (agency) {
      reset(agency);
      setLogoPreview(agency.logoUrl || null);
    }
  }, [agency]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Track edited fields
  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    setValue(field, e.target.value);
  };


  // Submit only modified fields
  const onSubmit = async (formData: Record<string, any>) => {
    const updatedFields: Record<string, any> = {};
    for (const key of Object.keys(formData)) {
      if (touchedFields[key] && agency && agency[key] !== formData[key]) {
        updatedFields[key] = formData[key];
      }
    }

    if (logoFile) {
      // Suppose your backend accepts base64 or handles uploads via another endpoint
      const base64 = await toBase64(logoFile);
      updatedFields.logoUrl = base64;
    }

    if (Object.keys(updatedFields).length === 0) {
      Swal.fire("Info", t("profile.noChanges"), "info");
      return;
    }

    try {
      await updateAgency({ id: agencyId, agency: updatedFields }).unwrap();
      Swal.fire("Succès", t("profile.updatedSuccess"), "success");
      setEditMode(false);
      setTouchedFields({});
    } catch (err) {
      console.log(err);
      Swal.fire("Erreur", t("profile.updateFailed"), "error");
    }
  };

  if (isLoading) return <p>{t("profile.loading")}...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {/* Logo Upload */}
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoChange}
              disabled={!editMode}
            />
            <label
              htmlFor="logo"
              className={`logo-upload-label${logoPreview ? " logo-preview" : ""}`}
              style={logoPreview ? { '--logo-url': `url(${logoPreview})` } as React.CSSProperties : undefined}
            >
              <span>
                <i className="flaticon-download"></i> {t("profile.uploadPhoto")}
              </span>
            </label>
          </div>
        </div>

        {Object.keys(getAgencyProfileSchema(t).fields).map((key) => (
          <div className="col-lg-6 col-xl-6" key={key}>
            <div className="my_profile_setting_input form-group">
              <label htmlFor={key}>{t(`profile.fields.${key}`)}</label>
              <input
                type="text"
                className="form-control"
                id={key}
                disabled={!editMode}
                defaultValue={agency[key]}
                {...register(key)}
                onChange={handleChange(key)}
              />
              {errors[key] && (
                <p className="text-danger">{errors[key]?.message}</p>
              )}
            </div>
          </div>
        ))}

        <div className="col-xl-12 text-right">
          <div className="my_profile_setting_input">
            {editMode ? (
              <button type="submit" className="btn btn2" disabled={isUpdating}>
                {isUpdating
                  ? t("profile.updating")
                  : t("profile.updateProfile")}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn2"
                onClick={() => setEditMode(true)}
              >
                {t("profile.edit")}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AgencyProfileForm;
