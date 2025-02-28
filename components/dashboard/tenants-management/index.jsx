"use client";

import Header from "@/components/common/header/dashboard/Header";
import SidebarMenu from "@/app/(admin)/dashboard/SidebarMenu";
import MobileMenu from "@/components/common/header/MobileMenu";
import {
  useDeleteTenantMutation,
  useGetTenantsQuery,
} from "@/features/api/tenants.api";
import PropertyCard from "@/components/PropertyCard";
import UserCard from "@/components/common/cards/UserCard";
import Link from "next/link";

const TenantManagement = () => {
  const { data: tenants, isLoading } = useGetTenantsQuery({});
  const [deleteTenant] = useDeleteTenantMutation();

  if (isLoading) return <div>Loading tenants...</div>;

  console.log("tenants: ", tenants);

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="breadcrumb_title">Tenant Management</h2>
              <p>Manage all tenant leases and rent information.</p>

              <Link className="btn btn-success" href={"tenants/create"}>
                <i className="bi bi-plus-circle"></i> Add Tenant
              </Link>

              <table className="table table-striped">
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
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TenantManagement;
