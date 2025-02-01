"use client";
import {
  useCreateTenantMutation,
  useUpdateTenantMutation,
} from "@/features/api/tenants.api";
import { useState, useEffect } from "react";

export default function TenantModal({ tenant, onClose }) {
  const [formData, setFormData] = useState({
    userId: "",
    propertyId: "",
    leaseStartDate: "",
    leaseEndDate: "",
    monthlyRent: "",
  });

  const [createTenant] = useCreateTenantMutation();
  const [updateTenant] = useUpdateTenantMutation();

  useEffect(() => {
    if (tenant) {
      setFormData({
        userId: tenant.userId || "",
        propertyId: tenant.propertyId || "",
        leaseStartDate: tenant.leaseStartDate || "",
        leaseEndDate: tenant.leaseEndDate || "",
        monthlyRent: parseInt(tenant.monthlyRent) || "",
      });
    }
  }, [tenant]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tenant?.id) {
      await updateTenant({ tenantId: parseInt(tenant.id), data: formData });
    } else {
      await createTenant(formData);
    }
    onClose();
  };

  return (
    <div className="modal fade show d-block z-100" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              {tenant ? "Edit Tenant" : "Add New Tenant"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body" style={{ backdropFilter: "blur(5px)" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">User ID</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userId: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Property ID</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.propertyId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      propertyId: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lease Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.leaseStartDate}
                  onChange={(e) =>
                    setFormData({ ...formData, leaseStartDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lease End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.leaseEndDate}
                  onChange={(e) =>
                    setFormData({ ...formData, leaseEndDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Monthly Rent (FCFA)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.monthlyRent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyRent: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}
