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
import SidebarMenu from "@/app/[locale]/(admin)/dashboard/SidebarMenu";
import AgencyInvoiceTable from "../../my-invoices/AgencyInvoiceTable";
import InvoiceFormModal from "../../my-invoices/InvoiceFormModal";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useTranslations } from "next-intl"; // Import useTranslations hook

export const AgencyInvoicesPage = () => {
  const t = useTranslations("dashboard.invoiceList"); // Initialize useTranslations hook for accessing translations
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

  // Function to handle invoice deletion with SweetAlert2
  const handleDelete = async (invoiceId) => {
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
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">{t("filter")}</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>
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

      {showModal && (
        <InvoiceFormModal
          invoice={editingInvoice}
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
