"use client";
import { useState } from "react";
import {
  useDeleteInvoiceMutation,
  useGetInvoicesByAgentQuery,
} from "@/features/api/invoices.api";
import { useSelector } from "react-redux";
import InvoiceTable from "../../my-invoices/InvoiceTable";
import Pagination from "../../my-properties/Pagination";
import Header from "@/components/common/header/dashboard/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import SidebarMenu from "@/app/[locale]/(admin)/dashboard/SidebarMenu";
import AgencyInvoiceTable from "../../my-invoices/AgencyInvoiceTable";
import InvoiceFormModal from "../../my-invoices/InvoiceFormModal";
import { usePathname } from "next/navigation";

export const AgentInvoicesPage = () => {
  const pathname = usePathname();
  const user = useSelector((state) => state.auth.user);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const { data, isLoading } = useGetInvoicesByAgentQuery(
    {
      agentId: user?.id,
      status,
      page,
      limit: 10,
    },
    { skip: !user.id }
  );

  const [deleteInvoice] = useDeleteInvoiceMutation();

  // if (isLoading) return <LoadingSpinner />;

  const handleDelete = async (invoiceId) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoice(invoiceId);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 ">
            <div className=" mb30-991">
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
      {/* Invoice Form Modal */}
      {showModal && (
        <InvoiceFormModal
          invoice={editingInvoice}
          onClose={() => {
            setShowModal(false);
            setEditingInvoice(null);
          }}
        />
      )}
    </>
  );
};

export default AgentInvoicesPage;
