"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetRequestByIdQuery,
  useUpdateRequestMutation,
} from "@/features/api/maintenance.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Link } from "@/i18n/navigation";

const MaintenanceRequestDetail = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { data: request, isLoading, isError } = useGetRequestByIdQuery(id);
  const [updateRequest, { isLoading: isUpdating }] = useUpdateRequestMutation();
  const user = useSelector((state) => state.auth.user);

  // Determine if the logged-in user is allowed to update (agent, agency, admin)
  const canEdit = user?.roles.some((role) =>
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
    return (
      <p className="alert alert-danger">
        Error loading maintenance request details.
      </p>
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateRequest({ id: request.id, ...formData }).unwrap();
      toast.success("Maintenance request updated successfully!");
      setIsEditing(false);
      router.refresh(); // refresh data if needed
    } catch (error) {
      toast.error("Failed to update maintenance request.");
    }
  };

  return (
    <section className="our-dashbord dashbord bgc-f7 pb50 container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Maintenance Request Detail</h2>
        <button onClick={() => router.back()} className="btn btn-secondary">
          Back to List
        </button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title">{request.title}</h4>
          <p className="card-text">{request.description}</p>
          <p className="card-text">
            <strong>Category:</strong> {request.category}
          </p>
          <p className="card-text">
            <strong>Priority:</strong> {request.priority}
          </p>
          <p className="card-text">
            <strong>Status:</strong>{" "}
            <span
              className={`badge ${
                request.status === "resolved"
                  ? "bg-success"
                  : request.status === "in-progress"
                  ? "bg-warning"
                  : "bg-danger"
              }`}
            >
              {request.status.toUpperCase()}
            </span>
          </p>
          <p className="card-text">
            <strong>Estimated Cost:</strong>{" "}
            {request.estimatedCost ? `${request.estimatedCost} FCFA` : "N/A"}
          </p>
          <p className="card-text">
            <strong>Actual Cost:</strong>{" "}
            {request.actualCost ? `${request.actualCost} FCFA` : "N/A"}
          </p>
          <p className="card-text">
            <strong>Resolution Notes:</strong>{" "}
            {request.resolutionNotes || "N/A"}
          </p>
        </div>
      </div>

      {canEdit && (
        <div className="card shadow-sm">
          <div className="card-header">
            {isEditing
              ? "Edit Maintenance Request"
              : "Update Maintenance Request"}
          </div>
          <div className="card-body">
            {isEditing ? (
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Estimated Cost (FCFA)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="estimatedCost"
                    value={formData.estimatedCost}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Actual Cost (FCFA)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="actualCost"
                    value={formData.actualCost}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Resolution Notes</label>
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
                    {isUpdating ? "Updating..." : "Update Request"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-3"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => setIsEditing(true)}
              >
                Edit Maintenance Request
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default MaintenanceRequestDetail;
