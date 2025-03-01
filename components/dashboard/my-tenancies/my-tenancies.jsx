"use client";
import Link from "next/link";
import { useGetUserTenanciesQuery } from "@/features/api/tenants.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const UserTenanciesPage = () => {
  const { data: tenancies, isLoading, isError } = useGetUserTenanciesQuery();

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="alert alert-danger">Error loading tenancies.</p>;

  return (
    <div className="container mt-4">
      <h2>My Tenancies</h2>
      <p>Manage your current and past leases here.</p>

      <div className="card mt-3">
        <div className="card-body">
          {tenancies.length === 0 ? (
            <p className="text-muted">You have no active or past tenancies.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Lease Period</th>
                  <th>Rent</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenancies.map((tenancy) => (
                  <tr key={tenancy.id}>
                    <td>
                      <Link href={`/listing-details-v2/${tenancy.property.id}`}>
                        {tenancy.property.title}
                      </Link>
                    </td>
                    <td>
                      {tenancy.leaseStartDate} → {tenancy.leaseEndDate}
                    </td>
                    <td>${tenancy.monthlyRent}/month</td>
                    <td>
                      <span
                        className={`badge ${
                          tenancy.leaseStatus === "active"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {tenancy.leaseStatus}
                      </span>
                    </td>
                    <td>
                      {tenancy.leaseStatus === "active" && (
                        <>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => console.log("Request Extension")}
                          >
                            Request Extension
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => console.log("Request Termination")}
                          >
                            Request Termination
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTenanciesPage;
