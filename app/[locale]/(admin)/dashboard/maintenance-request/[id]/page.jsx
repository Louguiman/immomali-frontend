"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
  useGetRequestByIdQuery,
  useUpdateRequestMutation,
} from "@/features/api/maintenance.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const MaintenanceRequestDetail = ({ params }) => {
  const t = useTranslations("dashboard.maintenance"); // Namespace "Maintenance"
  const { id } = params;
  const router = useRouter();
  const { data: request, isLoading, isError } = useGetRequestByIdQuery(id);
  const [updateRequest, { isLoading: isUpdating }] = useUpdateRequestMutation();
  const user = useSelector((state) => state.auth.user);

  // Vérifier si l'utilisateur peut modifier la requête
  const canEdit = user?.roles?.some((role) =>
    ["agent", "agency", "admin"].includes(role.name)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    estimatedCost: "",
    actualCost: "",
    resolutionNotes: "",
  });

  useEffect(() => {
    if (request) {
      setFormData({
        status: request.status,
        estimatedCost: request.estimatedCost || "",
        actualCost: request.actualCost || "",
        resolutionNotes: request.resolutionNotes || "",
      });
    }
  }, [request]);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !request)
    return <p className="alert alert-danger">{t("Error.loading")}</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateRequest({ id: request.id, ...formData }).unwrap();
      toast.success(t("success.update"));
      setIsEditing(false);
      router.refresh(); // Actualiser les données
    } catch (error) {
      toast.error(t("Error.update"));
    }
  };

  return (
    <section className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{t("titleDetails.detail")}</h2>
        <button onClick={() => router.back()} className="btn btn-secondary">
          {t("button.back")}
        </button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title">{request.title}</h4>
          <p className="card-text">{request.description}</p>
          <p className="card-text">
            <strong>{t("label.category")}:</strong> {request.category}
          </p>
          <p className="card-text">
            <strong>{t("label.priority")}:</strong> {request.priority}
          </p>
          <p className="card-text">
            <strong>{t("label.status")}:</strong>{" "}
            <span
              className={`badge ${
                request.status === "resolved"
                  ? "bg-success"
                  : request.status === "in-progress"
                  ? "bg-warning"
                  : "bg-danger"
              }`}
            >
              {t(`status.${request.status}`)}
            </span>
          </p>
          <p className="card-text">
            <strong>{t("label.estimatedCost")}:</strong>{" "}
            {request.estimatedCost ? `${request.estimatedCost} FCFA` : "N/A"}
          </p>
          <p className="card-text">
            <strong>{t("label.actualCost")}:</strong>{" "}
            {request.actualCost ? `${request.actualCost} FCFA` : "N/A"}
          </p>
          <p className="card-text">
            <strong>{t("label.resolutionNotes")}:</strong>{" "}
            {request.resolutionNotes || "N/A"}
          </p>
        </div>
      </div>

      {canEdit && (
        <div className="card shadow-sm">
          <div className="card-header">
            {isEditing ? t("edit.title") : t("update.title")}
          </div>
          <div className="card-body">
            {isEditing ? (
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">{t("label.status")}</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="pending">{t("Status.pending")}</option>
                    <option value="in-progress">
                      {t("Status.inProgress")}
                    </option>
                    <option value="resolved">{t("Status.resolved")}</option>
                    <option value="cancelled">{t("Status.cancelled")}</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {t("label.estimatedCost")}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="estimatedCost"
                    value={formData.estimatedCost}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">{t("label.actualCost")}</label>
                  <input
                    type="number"
                    className="form-control"
                    name="actualCost"
                    value={formData.actualCost}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {t("label.resolutionNotes")}
                  </label>
                  <textarea
                    className="form-control"
                    name="resolutionNotes"
                    rows={3}
                    value={formData.resolutionNotes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="d-flex">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isUpdating}
                  >
                    {isUpdating ? t("button.updating") : t("button.update")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-3"
                    onClick={() => setIsEditing(false)}
                  >
                    {t("button.cancel")}
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => setIsEditing(true)}
              >
                {t("button.edit")}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default MaintenanceRequestDetail;
