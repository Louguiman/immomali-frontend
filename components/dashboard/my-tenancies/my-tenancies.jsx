"use client";
import Link from "next/link";
import { useGetUserTenanciesQuery } from "@/features/api/tenants.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import TenantRequestForm from "@/components/maintenance/TenantRequestForm";
import TenantCard from "@/components/TenantCard";
import { useState } from "react";

const UserTenanciesPage = () => {
  const { data: tenancies, isLoading, isError } = useGetUserTenanciesQuery();

  const [maintenanceModal, setMaintenanceModal] = useState({
    show: false,
    tenancy: null,
  });

  // Dummy functions for extension and termination actions.
  const handleRequestExtension = (tenancyId) => {
    console.log("Request extension for tenancy", tenancyId);
    // Integrate extension request logic here
  };

  const handleRequestTermination = (tenancyId) => {
    console.log("Request termination for tenancy", tenancyId);
    // Integrate termination request logic here
  };

  const handleMaintenanceRequest = (tenancy) => {
    setMaintenanceModal({ show: true, tenancy });
  };
  if (isError)
    return <p className="alert alert-danger">Error loading tenancies.</p>;

  return (
    <>
      <div className="card mt-3">
        <div className="card-body">
          {isLoading && <LoadingSpinner />}
          {tenancies && tenancies.length > 0 ? (
            <div className="row">
              {tenancies.map((tenancy) => (
                <div key={tenancy.id} className="col-md-12">
                  <TenantCard
                    isUser={true}
                    tenant={tenancy}
                    onRequestMaintenance={handleMaintenanceRequest}
                    onRequestExtension={handleRequestExtension}
                    onRequestTermination={handleRequestTermination}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No tenancies found.</p>
          )}
          {isError && (
            <p className="alert alert-danger">Error loading tenancies.</p>
          )}
        </div>
      </div>

      {/* Maintenance Request Modal */}
      {maintenanceModal.show && (
        <TenantRequestForm
          tenantId={maintenanceModal.tenancy.id}
          propertyId={maintenanceModal.tenancy.property.id}
          onClose={() => setMaintenanceModal({ show: false, tenancy: null })}
        />
      )}
    </>
  );
};

export default UserTenanciesPage;
