"use client";

import {
  useDeleteTenantMutation,
  useGetTenantsQuery,
} from "@/features/api/tenants.api";
import Link from "next/link";
import { useState } from "react";
import TenantCard from "@/components/TenantCard";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";

const TenantManagement = () => {
  const user = useSelector((state) => state.auth.user);

  // Determine if the logged-in user is allowed to update (agent, agency, admin)
  const canEdit = user?.roles.some((role) =>
    ["agent", "agency", "admin"].includes(role.name)
  );
  const createQueryString = () => {
    const params = new URLSearchParams();
    if (user?.agency?.id) params.set("agencyId", user?.agency?.id);
    else params.set("agentId", user?.id);
    return params.toString();
  };

  const pathname = usePathname();
  const {
    data: tenants,
    isLoading,
    isError,
  } = useGetTenantsQuery(createQueryString(), {
    skip: !createQueryString,
  });
  const [deleteTenant] = useDeleteTenantMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const t = useTranslations("dashboard.myTenancies");
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
        <h2 className="mb-0">{t("SectionTitle")}</h2> {/* Translated Title */}
        <Link href={`${pathname}/create`} className="btn btn-primary">
          {t("addTenant")} {/* Translated Button Text */}
        </Link>
      </div>
      {/* Filters & Search */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder={t("searchPlaceholder")}
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
            <option value="">{t("allStatuses")}</option>{" "}
            {/* Translated "All Statuses" */}
            <option value="active">{t("active")}</option>{" "}
            {/* Translated "Active" */}
            <option value="pending">{t("pending")}</option>{" "}
            {/* Translated "Pending" */}
            <option value="terminated">{t("terminated")}</option>{" "}
            {/* Translated "Terminated" */}
            <option value="expired">{t("expired")}</option>{" "}
            {/* Translated "Expired" */}
          </select>
        </div>
      </div>
      {/* Tenant List */}
      {isLoading && <p>{t("loading")}</p>} {/* Translated Loading Text */}
      {isError && <p className="text-danger">{t("error")}</p>}{" "}
      {/* Translated Error Text */}
      {filteredTenants?.length > 0 ? (
        <div className="row col-lg-12">
          {filteredTenants.map((tenant) => (
            <div key={tenant.id} className="col-md-12">
              <TenantCard tenant={tenant} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">{t("noTenants")}</p>
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
