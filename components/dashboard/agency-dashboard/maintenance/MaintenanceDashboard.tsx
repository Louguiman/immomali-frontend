// components/maintenance/MaintenanceDashboard.js
"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MaintenanceRequestCard from "@/components/maintenance/MaintenanceRequestCard";
import {
  useGetRequestsByAgencyQuery,
  useGetRequestsByAgentQuery,
} from "@/features/api/maintenance.api";
import { useAppSelector } from "@/store/store";
import { MaintenanceRequest } from "@/types/maintenance-request";
import { useTranslations } from "next-intl";

const MaintenanceDashboard = () => {
  const t = useTranslations("dashboard.maintenance"); // Add the translation hook
  const user = useAppSelector((state) => state.auth.user);
  const agencyId = user?.agency?.id;
  const { data: agencyRequests, isLoading: agencyLoading } =
    useGetRequestsByAgencyQuery(agencyId, { skip: !agencyId });
  const { data: agentRequests, isLoading: agentLoading } =
    useGetRequestsByAgentQuery(user?.id || "", { skip: !user?.id });

  return (
    <div className="col-lg-12">
      <div className="container mt-4">
        {agencyId && (
          <>
            <h3>{t("agency_requests")}</h3> {/* Translatable string */}
            <div className="row">
              {agencyLoading ? (
                <LoadingSpinner />
              ) : (
                agencyRequests?.map((req: MaintenanceRequest) => (
                  <div key={req.id} className="col-md-6">
                    <MaintenanceRequestCard request={req} />
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
      <div className="container mt-4">
        <h3>{t("assigned_to_you")}</h3> {/* Translatable string */}
        <div className="row">
          {agentLoading ? (
            <LoadingSpinner />
          ) : (
            agentRequests?.map((req: MaintenanceRequest) => (
              <div key={req.id} className="col-md-6">
                <MaintenanceRequestCard request={req} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;
