"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRegisterMutation } from "@/features/api/auth.api";
import { useCreateAgencyMutation } from "@/features/api/agencies.api";
import { useCreateAgentMutation } from "@/features/api/agents.api";
import Swal from "sweetalert2"; // SweetAlert import

const SignupForm = () => {
  const t = useTranslations("SignupForm"); // Using next-intl to get translations

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user", // Default role
    agencyId: "",
    isActive: true,
    address: "",
    description: "",
    website: "",
  });

  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [createAgency, { isLoading: isCreatingAgency }] =
    useCreateAgencyMutation();
  const [createAgent, { isLoading: isCreatingAgent }] =
    useCreateAgentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.role === "agency") {
        // Create an agency
        await createAgency({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          address: formData.address,
          description: formData.description,
          website: formData.website,
        }).unwrap();
        Swal.fire(t("agencyRegistered"));
      } else if (formData.role === "agent") {
        // Create an agent
        await createAgent({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          agencyId: formData.agencyId ? parseInt(formData.agencyId) : null,
        }).unwrap();
        Swal.fire(t("agentRegistered"));
      } else {
        // Register a normal user
        await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
        }).unwrap();
        Swal.fire(t("userRegistered"));
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: t("registrationFailed"),
        text: err.data?.message || err.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>{t("registerYourAccount")}</h3>
        <p className="text-center">
          {t("alreadyHaveAccount")}{" "}
          <Link href="/login" className="text-thm">
            {t("login")}
          </Link>
        </p>
      </div>

      {/* Full Name */}
      <div className="form-group input-group">
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={t("fullName")}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="form-group input-group">
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={t("email")}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-envelope-o"></i>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="form-group input-group">
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder={t("password")}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>

      {/* Phone Number */}
      <div className="form-group input-group">
        <input
          type="text"
          className="form-control"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          placeholder={t("phoneNumber")}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-phone"></i>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="form-group">
        <label className="form-label">{t("chooseRole")}</label>
        <div className="role-selection">
          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
            />
            <span className="role-text">
              <strong>{t("user")}</strong>
              <p>{t("userDescription")}</p>
            </span>
          </label>

          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="agent"
              checked={formData.role === "agent"}
              onChange={handleChange}
            />
            <span className="role-text">
              <strong>{t("agent")}</strong>
              <p>{t("agentDescription")}</p>
            </span>
          </label>

          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="agency"
              checked={formData.role === "agency"}
              onChange={handleChange}
            />
            <span className="role-text">
              <strong>{t("agency")}</strong>
              <p>{t("agencyDescription")}</p>
            </span>
          </label>
        </div>
      </div>

      {/* Agency ID (For Agents) */}
      {formData.role === "agent" && (
        <div className="form-group input-group">
          <input
            type="number"
            className="form-control"
            name="agencyId"
            value={formData.agencyId || ""}
            onChange={handleChange}
            placeholder={t("agencyId")}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa fa-building"></i>
            </div>
          </div>
        </div>
      )}

      {/* Additional Fields for Agencies */}
      {formData.role === "agency" && (
        <>
          <div className="form-group input-group">
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t("agencyDescription")}
            />
          </div>

          <div className="form-group input-group">
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={t("agencyAddress")}
            />
          </div>

          <div className="form-group input-group">
            <input
              type="text"
              className="form-control"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder={t("agencyWebsite")}
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isRegistering || isCreatingAgency || isCreatingAgent}
        className="btn btn-log w-100 btn-thm"
      >
        {isRegistering || isCreatingAgency || isCreatingAgent
          ? t("registering")
          : t("register")}
      </button>
    </form>
  );
};

export default SignupForm;
