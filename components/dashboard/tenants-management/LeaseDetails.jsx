import React from "react";
import { useUpdateLeaseMutation } from "@/features/api/tenants.api";
import { useState } from "react";

const LeaseDetails = ({ lease }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [leaseData, setLeaseData] = useState(lease);
  const [updateLease] = useUpdateLeaseMutation();

  const handleSave = async () => {
    await updateLease({ id: lease.id, ...leaseData });
    setIsEditing(false);
  };

  return (
    <div className="card shadow-sm p-3">
      <h4>Lease Information</h4>
      <p>
        <strong>Lease Type:</strong> {lease?.leaseType}
      </p>
      <p>
        <strong>Start Date:</strong> {lease?.leaseStartDate}
      </p>
      <p>
        <strong>End Date:</strong> {lease?.leaseEndDate}
      </p>
      <p>
        <strong>Rent Amount:</strong> ${lease?.monthlyRent}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`badge ${
            lease?.leaseStatus === "active" ? "bg-success" : "bg-danger"
          }`}
        >
          {lease?.leaseStatus}
        </span>
      </p>

      {isEditing ? (
        <>
          <input
            type="number"
            value={leaseData?.monthlyRent}
            onChange={(e) =>
              setLeaseData({ ...leaseData, monthlyRent: e.target.value })
            }
            className="form-control my-2"
          />
          <button className="btn btn-primary me-2" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
          Edit Lease
        </button>
      )}
    </div>
  );
};

export default LeaseDetails;
