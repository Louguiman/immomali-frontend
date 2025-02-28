"use client";
import { useState } from "react";
import { useGetInvoicesByAgencyQuery } from "@/features/api/invoices.api";
import { useSelector } from "react-redux";
import InvoiceTable from "../../my-invoices/InvoiceTable";
import Pagination from "../../my-properties/Pagination";

export const AgencyInvoicesPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  const { data, isLoading } = useGetInvoicesByAgencyQuery({
    agencyId: user?.agency?.id,
    status,
    page,
    limit: 10,
  });

  return (
    <>
      <Header />
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

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="breadcrumb_content style2 mb30-991">
                <h2 className="breadcrumb_title">Invoices</h2>
                <p>Manage your invoices here.</p>
                <div className="container">
                  <h2>Invoices</h2>

                  {/* Filter */}
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>

                  {/* Table */}
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <InvoiceTable data={data?.invoices} />
                  )}

                  {/* Pagination */}
                  <Pagination
                    currentPage={page}
                    totalPage={data?.totalPage}
                    onPageChange={setPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvoicesPage;
