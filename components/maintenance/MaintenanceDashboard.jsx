"use client";
import { useGetUserMaintenanceRequestsQuery } from "@/features/api/maintenance.api"; // You need to implement this RTK Query endpoint
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MaintenanceRequestCard from "./MaintenanceRequestCard";
import { useAppSelector } from "@/store/hooks";

const TenantMaintenanceDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const {
    data: requests,
    isLoading,
    isError,
  } = useGetUserMaintenanceRequestsQuery(user.id, { skip: !user.id });

  if (isError)
    return <p className="alert alert-danger">Error loading requests.</p>;

  return (
    <section className="col-lg-12">
      {!isLoading && requests?.length === 0 ? (
        <p>No maintenance requests found.</p>
      ) : (
        <div className="row">
          {isLoading && <LoadingSpinner />}
          {!isLoading && !isError
            ? requests.map((request) => (
                <div key={request.id} className="col-md-6">
                  <MaintenanceRequestCard request={request} />
                </div>
              ))
            : null}
        </div>
      )}
    </section>
  );
};

export default TenantMaintenanceDashboard;
