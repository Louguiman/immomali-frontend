"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetTenantByIdQuery,
  useUpdateTenantMutation,
} from "@/features/api/tenants.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useState, useEffect } from "react";

export const EditTenantPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: tenant, isLoading } = useGetTenantByIdQuery(id);
  const [updateTenant, { isLoading: isUpdating }] = useUpdateTenantMutation();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    leaseStartDate: "",
    leaseEndDate: "",
    monthlyRent: "",
    outstandingBalance: "",
    autoRenewal: false,
  });

  // Populate form data when tenant is loaded
  useEffect(() => {
    if (tenant) {
      setFormData({
        leaseStartDate: tenant.lease?.leaseStartDate || "",
        leaseEndDate: tenant.lease?.leaseEndDate || "",
        monthlyRent: tenant?.lease?.monthlyRent || "",
        outstandingBalance: tenant?.outstandingBalance || "",
        autoRenewal: tenant?.autoRenewal || false,
      });
    }
  }, [tenant]);

  if (isLoading) return <LoadingSpinner />;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTenant({ id, ...formData });
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Tenant Details</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {/* Left Column */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Lease Start Date</label>
            <input
              type="date"
              name="leaseStartDate"
              className="form-control"
              value={formData.leaseStartDate}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Lease End Date</label>
            <input
              type="date"
              name="leaseEndDate"
              className="form-control"
              value={formData.leaseEndDate}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Monthly Rent</label>
            <input
              type="number"
              name="monthlyRent"
              className="form-control"
              value={formData.monthlyRent}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Outstanding Balance</label>
            <input
              type="number"
              name="outstandingBalance"
              className="form-control"
              value={formData.outstandingBalance}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="autoRenewal"
              name="autoRenewal"
              checked={formData.autoRenewal}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label className="form-check-label" htmlFor="autoRenewal">
              Auto-Renew Lease
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-12">
          {!isEditing ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Tenant
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="btn btn-success me-2"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditTenantPage;
