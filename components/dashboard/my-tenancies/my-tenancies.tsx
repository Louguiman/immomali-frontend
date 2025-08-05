"use client";

import { useGetUserTenanciesQuery } from "@/features/api/tenants.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import TenantRequestForm from "@/components/maintenance/TenantRequestForm";
import TenantCard from "@/components/TenantCard";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tenant } from "@/types/tenant";

const UserTenanciesPage = () => {
  const { data: tenancies, isLoading, isError } = useGetUserTenanciesQuery({});
  const [maintenanceModal, setMaintenanceModal] = useState<{
    show: boolean;
    tenancy: Tenant | null;
  }>({
    show: false,
    tenancy: null,
  });

  const t = useTranslations("dashboard.myTenancies");

  // Dummy functions for extension and termination actions.
  const handleRequestExtension = (tenancy: Tenant) => {
    console.log("Request extension for tenancy", tenancy.id);
    // Integrate extension request logic here
  };

  const handleRequestTermination = (tenancy: Tenant) => {
    console.log("Request termination for tenancy", tenancy.id);
    // Integrate termination request logic here
  };

  const handleMaintenanceRequest = (tenancy: Tenant) => {
    if (!tenancy) return;
    setMaintenanceModal({ show: true, tenancy });
  };

  if (isError)
    return <p className="alert alert-danger">{t("error_loading_tenancies")}</p>;

  return (
    <>
      <div className="card mt-3">
        <div className="card-body">
          {isLoading && <LoadingSpinner />}
          {tenancies && tenancies.length > 0 ? (
            <div className="row">
              {tenancies.map((tenancy: Tenant) => (
                <div key={tenancy.id} className="col-md-12">
                  <TenantCard
                    isUser={true}
                    tenant={tenancy}
                    onRequestMaintenance={(tenancy) =>
                      handleMaintenanceRequest(tenancy)
                    }
                    onRequestExtension={(tenancy) =>
                      handleRequestExtension(tenancy)
                    }
                    onRequestTermination={(tenancy) =>
                      handleRequestTermination(tenancy)
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">{t("no_tenancies_found")}</p>
          )}
          {isError && (
            <p className="alert alert-danger">{t("error_loading_tenancies")}</p>
          )}
        </div>
      </div>

      {/* Maintenance Request Modal */}
      {maintenanceModal.show && maintenanceModal.tenancy && (
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
