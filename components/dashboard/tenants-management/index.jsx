"use client";

import Header from "@/components/common/header/dashboard/Header";
import SidebarMenu from "@/app/[locale]/(admin)/dashboard/SidebarMenu";
import MobileMenu from "@/components/common/header/MobileMenu";
import {
  useDeleteTenantMutation,
  useGetTenantsQuery,
} from "@/features/api/tenants.api";
import PropertyCard from "@/components/PropertyCard";
import UserCard from "@/components/common/cards/UserCard";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import TenantCard from "@/components/TenantCard";

const TenantManagement = () => {
  const pathname = usePathname();
  const { data: tenants, isLoading, isError } = useGetTenantsQuery({});
  const [deleteTenant] = useDeleteTenantMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter tenants based on search and status
  const filteredTenants = tenants?.filter((tenant) => {
    const matchesSearch =
      tenant.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? tenant?.lease?.leaseStatus === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Tenant Management</h2>
        <Link href={`${pathname}/create`} className="btn btn-primary">
          + Add Tenant
        </Link>
      </div>
      {/* Filters & Search */}
      <div className="row mb-3 ">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by tenant, email, or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="terminated">Terminated</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Tenant List */}
      {isLoading && <p>Loading tenants...</p>}
      {isError && <p className="text-danger">Failed to load tenants.</p>}

      {filteredTenants?.length > 0 ? (
        <div className="row  col-lg-12">
          {filteredTenants.map((tenant) => (
            <div key={tenant.id} className="col-md-12">
              <TenantCard tenant={tenant} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No tenants found.</p>
      )}
    </section>
  );
};

export default TenantManagement;

//old Tenancies Table
/* <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Property</th>
                  <th>Lease Start</th>
                  <th>Lease End</th>
                  <th>Rent</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants?.map((tenant) => (
                  <tr key={tenant.id}>
                    <td>{tenant.id}</td>
                    <td>
                      <UserCard user={tenant.user} />
                    </td>
                    <td>
                      <PropertyCard item={tenant.property} />
                    </td>
                    <td>{tenant.leaseStartDate}</td>
                    <td>{tenant.leaseEndDate}</td>
                    <td>{tenant.monthlyRent} FCFA</td>
                    <td>{tenant.leaseStatus}</td>
                    <td>
                      <Link
                        href={`tenants/edit/${tenant.id}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTenant(tenant.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */
