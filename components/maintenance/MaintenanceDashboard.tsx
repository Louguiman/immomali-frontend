"use client";

import { useGetUserMaintenanceRequestsQuery } from "@/features/api/maintenance.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MaintenanceRequestCard from "./MaintenanceRequestCard";
import { useAppSelector } from "@/store/store";
import { useTranslations } from "next-intl";

import { RootState } from "@/store/store";

const TenantMaintenanceDashboard = () => {
  const t = useTranslations("dashboard.maintenance");
  const user = useAppSelector((state: RootState) => state.auth.user);

  const {
    data: requests,
    isLoading,
    isError,
  } = useGetUserMaintenanceRequestsQuery(user?.id, { skip: !user?.id });

  if (isError) return <p className="alert alert-danger">{t("error")}</p>;

  return (
    <section className="col-lg-12">
      {!isLoading && requests?.length === 0 ? (
        <p>{t("noRequests")}</p>
      ) : (
        <div className="row">
          {isLoading && <LoadingSpinner />}
          {!isLoading &&
            requests?.map((request: any) => (
              <div key={request.id} className="col-md-6">
                <MaintenanceRequestCard request={request} />
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default TenantMaintenanceDashboard;
