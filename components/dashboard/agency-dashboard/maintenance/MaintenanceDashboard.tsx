// components/maintenance/MaintenanceDashboard.js
"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MaintenanceRequestCard from "@/components/maintenance/MaintenanceRequestCard";
import {
  useGetRequestsByAgencyQuery,
  useGetRequestsByAgentQuery,
} from "@/features/api/maintenance.api";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const MaintenanceDashboard = () => {
  const t = useTranslations("dashboard.maintenance"); // Add the translation hook
  const user = useSelector((state) => state.auth.user);
  const { data: agencyRequests, isLoading: agencyLoading } =
    useGetRequestsByAgencyQuery(user?.agency.id, { skip: !user?.agency.id });
  const { data: agentRequests, isLoading: agentLoading } =
    useGetRequestsByAgentQuery(user?.id);

  return (
    <div className="col-lg-12">
      <div className="container mt-4">
        {user?.agency.id && (
          <>
            <h3>{t("agency_requests")}</h3> {/* Translatable string */}
            <div className="row">
              {agencyLoading ? (
                <LoadingSpinner />
              ) : (
                agencyRequests?.map((req) => (
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
            agentRequests?.map((req) => (
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
