"use client";
import {
  useCreateTenantMutation,
  useGetTenantLeasesQuery,
  useGetTenantPaymentsQuery,
  useSendPaymentReminderMutation,
  useUpdateLeaseStatusMutation,
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
  const { data: leases } = useGetTenantLeasesQuery(tenant?.id, {
    skip: !tenant,
  });
  const { data: payments } = useGetTenantPaymentsQuery(tenant?.id, {
    skip: !tenant,
  });
  const [updateLeaseStatus] = useUpdateLeaseStatusMutation();
  const [sendReminder] = useSendPaymentReminderMutation();
  const [activeTab, setActiveTab] = useState("profile");

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

          {/* Tabs Navigation */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "profile" && "active"}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "leases" && "active"}`}
                onClick={() => setActiveTab("leases")}
              >
                Leases
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "payments" && "active"}`}
                onClick={() => setActiveTab("payments")}
              >
                Payments
              </button>
            </li>
          </ul>

          <div className="modal-body" style={{ backdropFilter: "blur(5px)" }}>
            {/* Profile Tab */}
            {activeTab === "profile" && (
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
                      setFormData({
                        ...formData,
                        leaseStartDate: e.target.value,
                      })
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
            )}

            {/* Lease Tab */}
            {activeTab === "leases" && leases && (
              <div>
                <h5>Active Leases</h5>
                <ul className="list-group">
                  {leases.map((lease) => (
                    <li
                      key={lease.id}
                      className="list-group-item d-flex justify-content-between"
                    >
                      {lease.property.title} - {lease.status}
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          updateLeaseStatus({
                            leaseId: lease.id,
                            status: "terminated",
                          })
                        }
                      >
                        Terminate Lease
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && payments && (
              <div>
                <h5>Payment History</h5>
                <ul className="list-group">
                  {payments.map((payment) => (
                    <li
                      key={payment.id}
                      className="list-group-item d-flex justify-content-between"
                    >
                      {payment.amount} FCFA - {payment.status}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => sendReminder(tenant.id)}
                      >
                        Send Reminder
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}
