"use client";
import { useState } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import {
  useCreateTenantMutation,
  useDeleteTenantMutation,
  useGetTenantLeasesQuery,
  useGetTenantPaymentsQuery,
  useGetTenantsQuery,
  useSendPaymentReminderMutation,
  useUpdateTenantMutation,
} from "@/features/api/tenants.api";
import TenantModal from "./TenantModal";

// import TableData from "./TableData";
// import Filtering from "./Filtering";
// import Pagination from "./Pagination";
// import SearchBox from "./SearchBox";

const index = () => {
  const [search, setSearch] = useState("");
  const { data: tenants, isLoading } = useGetTenantsQuery({ search });
  const [selectedTenant, setSelectedTenant] = useState(null);

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

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

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">Tenant Management</h2>
                    <p>Here, you can manage the tenants in your properties!</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          {/* <SearchBox /> */}
                        </div>
                      </li>
                      {/* End li */}

                      <li className="list-inline-item">
                        {/* <Filtering /> */}
                      </li>
                      {/* End li */}
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                {/* End .col */}
                {/* //TODO ADd USER table here */}
              </div>
              {/* End .row */}
              <div className="container">
                {/* Search & Add Tenant */}
                <div className="d-flex justify-content-between mb-3">
                  <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search tenants..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn btn-success"
                    onClick={() => setSelectedTenant({})}
                  >
                    <i className="bi bi-plus-circle"></i> Add Tenant
                  </button>
                </div>

                {/* Tenant Table */}
                <div className="table-responsive shadow-sm rounded">
                  <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Property ID</th>
                        <th>Lease Start</th>
                        <th>Lease End</th>
                        <th>Rent</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenants?.map((tenant) => (
                        <tr key={tenant.id}>
                          <td>{tenant.id}</td>
                          <td>{tenant.userId}</td>
                          <td>{tenant.propertyId}</td>
                          <td>{tenant.leaseStartDate}</td>
                          <td>{tenant.leaseEndDate}</td>
                          <td>{tenant.monthlyRent} FCFA</td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-info me-2"
                              onClick={() => setSelectedTenant(tenant)}
                            >
                              <i className="bi bi-pencil-square"></i> Edit
                            </button>
                            <button className="btn btn-sm btn-danger">
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Open Tenant Modal */}
                {selectedTenant !== null && (
                  <TenantModal
                    tenant={selectedTenant}
                    onClose={() => setSelectedTenant(null)}
                  />
                )}
              </div>

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
