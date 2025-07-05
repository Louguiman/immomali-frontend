"use client";
import { useState } from "react";
import {
  useDeleteInvoiceMutation,
  useGetInvoicesByAgencyQuery,
} from "@/features/api/invoices.api";
import { useAppSelector } from "@/store/store";
import AgencyInvoiceTable from "../../my-invoices/AgencyInvoiceTable";
import InvoiceFormModal from "../../my-invoices/InvoiceFormModal";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { Invoice, InvoiceStatus } from "@/types/invoice";

export const AgencyInvoicesPage = () => {
  const t = useTranslations("dashboard.invoiceList"); // Initialize useTranslations hook for accessing translations
  const { user } = useAppSelector((state) => state.auth);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<{
    id?: string | number;
    tenantId?: string | number;
    amount?: string | number;
    totalAmount?: string | number;
    tax?: string | number;
    discount?: string | number;
    notes?: string;
    status?: "unpaid" | "paid" | "overdue" | "pending";
    type?: string;
    dueDate?: string;
  } | null>(null);

  const { data, isLoading } = useGetInvoicesByAgencyQuery({
    agencyId: user?.agency?.id,
    status,
    page: 1,
    limit: 10,
  });

  const [deleteInvoice] = useDeleteInvoiceMutation();

  // Function to handle invoice deletion with SweetAlert2
  const handleDelete = async (invoiceId: string | number) => {
    const result = await Swal.fire({
      title: t("deleteInvoice.title"),
      text: t("deleteInvoice.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("deleteInvoice.confirmButton"),
      cancelButtonText: t("deleteInvoice.cancelButton"),
    });

    if (result.isConfirmed) {
      await deleteInvoice(invoiceId);
      Swal.fire(
        t("deleteInvoice.deleted"),
        t("deleteInvoice.successText"),
        "success"
      );
    }
  };

  return (
    <div className="col-lg-12">
      <div className="breadcrumb_content style2 mb30-991">
        <div className="container">
          {/* Add Invoice Button */}
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowModal(true)}
          >
            {t("addInvoice")}
          </button>
          {/* Filter */}
          <div className="d-flex align-items-center ms-3">
            <label htmlFor="status-filter" className="me-2 mb-0">
              {t("filter")}:
            </label>
            <select
              id="status-filter"
              className="form-select form-select-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label={t("filterByStatus")}
            >
              <option value="">{t("all")}</option>
              <option value="pending">{t("pending")}</option>
              <option value="paid">{t("paid")}</option>
              <option value="overdue">{t("overdue")}</option>
            </select>
          </div>
        </div>
      </div>
      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AgencyInvoiceTable
          invoices={data}
          onEdit={(invoice) => {
            // Create a properly typed invoice object
            const editedInvoice = {
              ...invoice,
              id: invoice.id,
              amount: invoice.amount,
              totalAmount: invoice.totalAmount,
              status:
                (invoice.status as "unpaid" | "paid" | "overdue" | "pending") ||
                "unpaid",
              notes: invoice.notes || "",
            };

            setEditingInvoice(editedInvoice);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {showModal && editingInvoice && (
        <InvoiceFormModal
          invoice={
            editingInvoice as Partial<Invoice> & {
              id?: number | string;
              tenantId?: number | string;
              amount?: number | string;
              totalAmount?: number | string;
              tax?: number | string;
              discount?: number | string;
              notes?: string;
              status?: InvoiceStatus;
              type?: string;
              dueDate?: string;
            }
          }
          onClose={() => {
            setShowModal(false);
            setEditingInvoice(null);
          }}
        />
      )}
    </div>
  );
};

export default AgencyInvoicesPage;
