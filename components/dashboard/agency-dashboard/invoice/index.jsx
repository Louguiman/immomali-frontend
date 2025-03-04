"use client";
import { useState } from "react";
import {
  useDeleteInvoiceMutation,
  useGetInvoicesByAgencyQuery,
} from "@/features/api/invoices.api";
import { useSelector } from "react-redux";
import InvoiceTable from "../../my-invoices/InvoiceTable";
import Pagination from "../../my-properties/Pagination";
import Header from "@/components/common/header/dashboard/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import SidebarMenu from "@/app/(admin)/dashboard/SidebarMenu";
import AgencyInvoiceTable from "../../my-invoices/AgencyInvoiceTable";
import InvoiceFormModal from "../../my-invoices/InvoiceFormModal";
import { usePathname } from "next/navigation";

export const AgencyInvoicesPage = () => {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const { data, isLoading } = useGetInvoicesByAgencyQuery({
    agencyId: user?.agency?.id,
    status,
    page,
    limit: 10,
  });

  const [deleteInvoice] = useDeleteInvoiceMutation();

  // if (isLoading) return <LoadingSpinner />;

  const handleDelete = async (invoiceId) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoice(invoiceId);
    }
  };

  return (
    <section className="our-dashbord dashbord bgc-f7 pb50">
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12 maxw100flex-992">
            <div className="breadcrumb_content style2 mb30-991">
              <h2 className="breadcrumb_title">Invoices</h2>
              <p>Manage your invoices here.</p>
              <div className="container">
                {/* Add Invoice Button */}
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setShowModal(true)}
                >
                  + Add Invoice
                </button>
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
                  <AgencyInvoiceTable
                    invoices={data}
                    onEdit={(invoice) => {
                      setEditingInvoice(invoice);
                      setShowModal(true);
                    }}
                    onDelete={handleDelete}
                  />
                )}

                {/* Pagination */}
                {/* <Pagination
                    currentPage={page}
                    totalPage={data?.totalPage}
                    onPageChange={setPage}
                  /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <InvoiceFormModal
          invoice={editingInvoice}
          onClose={() => {
            setShowModal(false);
            setEditingInvoice(null);
          }}
        />
      )}
    </section>
  );
};

export default AgencyInvoicesPage;
