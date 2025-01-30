"use client";
import { useState } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import {
  useGetTenantLeasesQuery,
  useGetTenantPaymentsQuery,
  useGetTenantsQuery,
  useSendPaymentReminderMutation,
} from "@/features/api/tenants.api";

// import TableData from "./TableData";
// import Filtering from "./Filtering";
// import Pagination from "./Pagination";
// import SearchBox from "./SearchBox";

const index = () => {
  const [search, setSearch] = useState("");
  const { data: tenants, isLoading } = useGetTenantsQuery({ search });
  const [selectedTenant, setSelectedTenant] = useState(null);
  const { data: leases } = useGetTenantLeasesQuery(selectedTenant?.id, {
    skip: !selectedTenant,
  });
  const { data: payments } = useGetTenantPaymentsQuery(selectedTenant?.id, {
    skip: !selectedTenant,
  });
  const [sendReminder] = useSendPaymentReminderMutation();

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
                    <p>Here, you can create, edit or delete users!</p>
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
              <div className="container mt-0">
                {/* Search */}
                <div className="d-flex justify-content-between mb-3">
                  <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search tenants..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Tenant Table */}
                <div className="table-responsive shadow-sm rounded">
                  <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenants?.map((tenant) => (
                        <tr key={tenant.id}>
                          <td>{tenant.id}</td>
                          <td>{tenant.name}</td>
                          <td>{tenant.email}</td>
                          <td>
                            <span
                              className={`badge ${
                                tenant.isActive ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {tenant.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-info me-2"
                              onClick={() => setSelectedTenant(tenant)}
                            >
                              <i className="bi bi-eye"></i> View
                            </button>
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => sendReminder(tenant.id)}
                            >
                              <i className="bi bi-bell"></i> Send Reminder
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tenant Details Modal */}
                {selectedTenant && (
                  <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">
                            Tenant Details - {selectedTenant.name}
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setSelectedTenant(null)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          {/* Lease Details */}
                          <h5>Leases</h5>
                          <ul className="list-group mb-3">
                            {leases?.map((lease) => (
                              <li
                                key={lease.id}
                                className="list-group-item d-flex justify-content-between"
                              >
                                {lease.property.title} - {lease.status}
                                <span className="badge bg-secondary">
                                  {lease.endDate}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* Payment History */}
                          <h5>Payment History</h5>
                          <ul className="list-group">
                            {payments?.map((payment) => (
                              <li
                                key={payment.id}
                                className="list-group-item d-flex justify-content-between"
                              >
                                {payment.amount} FCFA - {payment.status}
                                <span
                                  className={`badge bg-${
                                    payment.status === "completed"
                                      ? "success"
                                      : "danger"
                                  }`}
                                >
                                  {payment.status}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="modal-footer">
                          <button
                            className="btn btn-secondary"
                            onClick={() => setSelectedTenant(null)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
