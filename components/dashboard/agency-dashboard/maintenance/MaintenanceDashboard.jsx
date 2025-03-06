"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MaintenanceRequestCard from "@/components/maintenance/MaintenanceRequestCard";
import {
  useGetRequestsByAgencyQuery,
  useGetRequestsByAgentQuery,
} from "@/features/api/maintenance.api";
import { useSelector } from "react-redux";

const MaintenanceDashboard = () => {
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
            <h3>Agency Requests</h3>
            <div className="row">
              {agencyLoading ? (
                <LoadingSpinner />
              ) : (
                agencyRequests?.map((req) => (
                  <div key={request.id} className="col-md-6">
                    <MaintenanceRequestCard request={request} />
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
      <div className="container mt-4">
        <h3>Assigned to You</h3>
        <div className="row">
          {agentLoading ? (
            <LoadingSpinner />
          ) : (
            agentRequests?.map((req) => (
              <div key={request.id} className="col-md-6">
                <MaintenanceRequestCard request={request} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;
