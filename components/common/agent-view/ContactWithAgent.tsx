"use client";

import { useCreateInquiryMutation } from "@/features/api/inquiries.api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const ContactWithAgent = ({ agentId, propertyId }) => {
  const t = useTranslations("property.sidebar.contactAgent");
  const user = useSelector((state) => state.auth?.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    agentId: agentId,
    propertyId,
  });

  const [errors, setErrors] = useState({});
  const [createInquiry, { isLoading }] = useCreateInquiryMutation();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim()) errors.name = t("validation.nameRequired");
    if (!formData.email.trim()) {
      errors.email = t("validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("validation.emailInvalid");
    }
    if (!formData.message.trim())
      errors.message = t("validation.messageRequired");

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createInquiry(formData).unwrap();
      toast.success(t("success"));
      setFormData((prev) => ({ ...prev, message: "" }));
      setErrors({});
    } catch (error) {
      toast.error(t("error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="sasw_list mb0">
        <li className="search_area">
          <div className="form-group mb-3">
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder={t("namePlaceholder")}
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!!user}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
        </li>

        <li className="search_area">
          <div className="form-group mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder={t("emailPlaceholder")}
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!!user}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
        </li>

        <li className="search_area">
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder={t("phonePlaceholder")}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </li>

        <li className="search_area">
          <div className="form-group mb-3">
            <textarea
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              rows="5"
              placeholder={t("messagePlaceholder")}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {errors.message && (
              <div className="invalid-feedback">{errors.message}</div>
            )}
          </div>
        </li>

        <li>
          <div className="search_option_button">
            <button
              type="submit"
              className="btn btn-block btn-thm w-100"
              disabled={isLoading}
            >
              {isLoading ? t("sending") : t("sendButton")}
            </button>
          </div>
        </li>
      </ul>
    </form>
  );
};

export default ContactWithAgent;
