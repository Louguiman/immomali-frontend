"use client";
import { useCreateRequestMutation } from "@/features/api/maintenance.api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const TenantRequestForm = ({ propertyId, tenantId, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("medium");
  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const t = useTranslations("dashboard.maintenance");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest({
        title,
        description,
        category,
        priority,
        tenantId,
        propertyId,
      }).unwrap();
      toast.success(t("maintenance_request_submitted"));
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      toast.error(t("error_submitting_request"));
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t("new_maintenance_request")}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <h3>{t("new_maintenance_request")}</h3>
              <div className="mb-3">
                <label className="form-label">{t("title")}</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">{t("description")}</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">{t("category")}</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="general">{t("general")}</option>
                  <option value="plumbing">{t("plumbing")}</option>
                  <option value="electrical">{t("electrical")}</option>
                  <option value="hvac">{t("hvac")}</option>
                  <option value="other">{t("other")}</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">{t("priority")}</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">{t("low")}</option>
                  <option value="medium">{t("medium")}</option>
                  <option value="high">{t("high")}</option>
                  <option value="urgent">{t("urgent")}</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? t("submitting") : t("submit_request")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRequestForm;
