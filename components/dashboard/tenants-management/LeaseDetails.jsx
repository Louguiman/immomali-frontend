import React, { useState, useEffect } from "react";
import { useUpdateLeaseMutation } from "@/features/api/tenants.api";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2"; // Import SweetAlert2

const LeaseDetails = ({ lease }) => {
  const t = useTranslations("dashboard.TenantProfile");
  const [isEditing, setIsEditing] = useState(false);
  const [leaseData, setLeaseData] = useState(lease);
  const [updateLease, { isLoading, error }] = useUpdateLeaseMutation();

  useEffect(() => {
    setLeaseData(lease);
  }, [lease]);

  const handleSave = async () => {
    try {
      await updateLease({ id: lease.id, ...leaseData }).unwrap();
      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: t("success"),
        text: t("leaseUpdated"),
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("leaseUpdateFailed"),
      });
      console.error("Échec de la mise à jour du bail :", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    Swal.fire({
      icon: "info",
      title: t("cancelled"),
      text: t("editCancelled"),
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="card shadow-sm p-3">
      <h4>{t("leaseInformation")}</h4>
      <p>
        <strong>{t("leaseType")}:</strong> {lease?.leaseType || "N/A"}
      </p>
      <p>
        <strong>{t("startDate")}:</strong> {lease?.leaseStartDate || "N/A"}
      </p>
      <p>
        <strong>{t("endDate")}:</strong> {lease?.leaseEndDate || "N/A"}
      </p>
      <p>
        <strong>{t("rentAmount")}:</strong> ${lease?.monthlyRent || "N/A"}
      </p>
      <p>
        <strong>{t("status")}:</strong>{" "}
        <span
          className={`badge ${
            lease?.leaseStatus === "active" ? "bg-success" : "bg-danger"
          }`}
        >
          {lease?.leaseStatus === "active" ? t("active") : t("inactive")}
        </span>
      </p>

      {isEditing ? (
        <>
          <input
            type="number"
            value={leaseData?.monthlyRent || ""}
            onChange={(e) =>
              setLeaseData({
                ...leaseData,
                monthlyRent: parseFloat(e.target.value) || 0,
              })
            }
            className="form-control my-2"
          />
          <button
            className="btn btn-primary me-2"
            onClick={handleSave}
            disabled={isLoading || leaseData.monthlyRent === lease.monthlyRent}
          >
            {isLoading ? t("saving") : t("save")}
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            {t("cancel")}
          </button>
        </>
      ) : (
        <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
          {t("editLease")}
        </button>
      )}
    </div>
  );
};

export default LeaseDetails;
