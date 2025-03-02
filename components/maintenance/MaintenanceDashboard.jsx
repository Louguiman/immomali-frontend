"use client";
import {
  useGetRequestsByAgencyQuery,
  useGetRequestsByAgentQuery,
} from "@/features/api/maintenance.api";
import { useSelector } from "react-redux";

const MaintenanceDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: agencyRequests, isLoading: agencyLoading } =
    useGetRequestsByAgencyQuery(user?.agencyId, { skip: !user?.agencyId });
  const { data: agentRequests, isLoading: agentLoading } =
    useGetRequestsByAgentQuery(user?.id);

  return (
    <div>
      <h2>Maintenance Requests</h2>

      {user?.agencyId && (
        <>
          <h3>Agency Requests</h3>
          {agencyLoading ? (
            <p>Loading...</p>
          ) : (
            agencyRequests?.map((req) => (
              <p key={req.id}>
                {req.title} - {req.status}
              </p>
            ))
          )}
        </>
      )}

      <h3>Assigned to You</h3>
      {agentLoading ? (
        <p>Loading...</p>
      ) : (
        agentRequests?.map((req) => (
          <p key={req.id}>
            {req.title} - {req.status}
          </p>
        ))
      )}
    </div>
  );
};

export default MaintenanceDashboard;
