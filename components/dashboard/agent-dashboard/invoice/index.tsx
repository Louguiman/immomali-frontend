"use client";
import { useState } from "react";
import {
  useDeleteInvoiceMutation,
  useGetInvoicesByAgentQuery,
} from "@/features/api/invoices.api";
import { useAppSelector } from "@/store/store";
import Pagination from "../../my-properties/Pagination";
import AgencyInvoiceTable from "../../my-invoices/AgencyInvoiceTable";
import InvoiceFormModal from "../../my-invoices/InvoiceFormModal";
import { AgencyInvoice } from "@/components/dashboard/my-invoices/AgencyInvoiceTable";

export const AgentInvoicesPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<AgencyInvoice | null>(null);

  const { data, isLoading } = useGetInvoicesByAgentQuery(
    {
      agentId: user?.id,
      status,
      page,
      limit: 10,
    },
    { skip: !user?.id }
  );

  const [deleteInvoice] = useDeleteInvoiceMutation();

  // if (isLoading) return <LoadingSpinner />;

  const handleDelete = (invoiceId: string | number): void => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoice(invoiceId).catch(console.error);
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
                  aria-label="Filter invoices by status"
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
                    onEdit={(invoice: AgencyInvoice) => {
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
          invoice={editingInvoice ? {
            id: Number(editingInvoice.id), // Ensure id is a number
            tenantId: Number(editingInvoice.tenantId),
            amount: editingInvoice.amount,
            totalAmount: editingInvoice.totalAmount,
            status: (editingInvoice.status === 'paid' || editingInvoice.status === 'overdue') 
              ? editingInvoice.status 
              : 'unpaid', // Default to 'unpaid' for any other status
            type: editingInvoice.type,
            dueDate: editingInvoice.dueDate,
            // Set default values for required fields
            tax: 0,
            discount: 0,
            notes: editingInvoice.tenant?.user?.name ? `Tenant: ${editingInvoice.tenant.user.name}` : ''
          } : undefined}
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
