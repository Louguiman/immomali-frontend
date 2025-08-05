"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetTenantByIdQuery,
  useUpdateLeaseStatusMutation,
} from "@/features/api/tenants.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useState } from "react";

const ManageLeasePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: tenant, isLoading } = useGetTenantByIdQuery(id);
  const [manageLease, { isLoading: isUpdating }] =
    useUpdateLeaseStatusMutation();
  const [leaseStatus, setLeaseStatus] = useState(tenant?.lease?.leaseStatus);

  if (isLoading) return <LoadingSpinner />;

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  interface ManageLeaseArgs {
    id: string | string[] | undefined;
    leaseStatus: string | undefined;
  }

  const handleSubmit = async (e: HandleSubmitEvent) => {
    e.preventDefault();
    await manageLease({ id, leaseStatus } as ManageLeaseArgs);
    router.push(`/tenants/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Manage Lease</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Lease Status</label>
          <select
            className="form-select"
            value={leaseStatus}
            onChange={(e) => setLeaseStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="terminated">Terminated</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ManageLeasePage;
