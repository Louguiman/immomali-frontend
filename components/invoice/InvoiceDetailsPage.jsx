"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useExportInvoiceToPDFQuery,
  useGetInvoiceByIdQuery,
} from "@/features/api/invoices.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Link from "next/link";
import { useState } from "react";
import ManualPaymentModal from "@/components/payments/ManualPaymentModal";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";

const InvoiceDetailsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const { number: formatNumber } = useFormatter(); // Hook for number formatting

  const t = useTranslations("dashboard.invoiceList"); // Hook to fetch translations

  // Determine if the logged-in user is allowed to update (agent, agency, admin)
  const isAdminOrAgent = user?.roles.some((role) =>
    ["agent", "agency", "admin"].includes(role.name)
  );
  const { data: invoice, isLoading, isError } = useGetInvoiceByIdQuery(id);
  const { refetch: exportToPDF, isExporting } = useExportInvoiceToPDFQuery(
    invoice?.id,
    { skip: true }
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="alert alert-danger">{t("error_fetching_invoice")}</p>;

  const isPaid = invoice.status === "paid";
  const isOverdue = invoice.status === "overdue";

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        {/* 🔹 Invoice Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold text-primary">
            {t("invoice")} #{invoice.id}
          </h2>
          <span
            className={`badge ${
              isPaid ? "bg-success" : isOverdue ? "bg-danger" : "bg-warning"
            }`}
          >
            {invoice.status.toUpperCase()}
          </span>
        </div>

        {/* 🔹 Invoice Metadata */}
        <div className="row">
          <div className="col-md-6">
            <h5 className="fw-bold">{t("tenant_info")}</h5>
            <p>
              <strong>{t("name")}:</strong> {invoice.tenant.user.name}
            </p>
            <p>
              <strong>{t("email")}:</strong> {invoice.tenant.user.email}
            </p>
            <p>
              <strong>{t("phone")}:</strong> {invoice.tenant.user.phone}
            </p>
          </div>

          <div className="col-md-6">
            <h5 className="fw-bold">{t("invoice_details")}</h5>
            <p>
              <strong>{t("issued_by")}:</strong> {invoice.issuedBy.name}
            </p>
            <p>
              <strong>{t("due_date")}:</strong> {invoice.dueDate}
            </p>
            <p>
              <strong>{t("payment_date")}:</strong>{" "}
              {invoice.paymentDate || t("not_paid_yet")}
            </p>
          </div>
        </div>

        {/* 🔹 Financial Breakdown */}
        <div className="row mt-3">
          <div className="col-md-6">
            <h5 className="fw-bold">{t("financial_overview")}</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>{t("total_amount")}:</strong>{" "}
                <span className="float-end">
                  {formatNumber(invoice.totalAmount, {
                    style: "currency",
                    currency: "XOF",
                  })}
                </span>
              </li>
              <li className="list-group-item">
                <strong>{t("paid_amount")}:</strong>{" "}
                <span className="float-end text-success">
                  {formatNumber(invoice.paidAmount, {
                    style: "currency",
                    currency: "XOF",
                  })}
                </span>
              </li>
              <li className="list-group-item">
                <strong>{t("remaining_balance")}:</strong>{" "}
                <span className="float-end text-danger">
                  {formatNumber(invoice.remainingBalance, {
                    style: "currency",
                    currency: "XOF",
                  })}
                </span>
              </li>
              {invoice.tax > 0 && (
                <li className="list-group-item">
                  <strong>{t("tax")}:</strong>{" "}
                  <span className="float-end">{invoice.tax} FCFA</span>
                </li>
              )}
              {invoice.discount > 0 && (
                <li className="list-group-item">
                  <strong>{t("discount")}:</strong>{" "}
                  <span className="float-end">-{invoice.discount} FCFA</span>
                </li>
              )}
            </ul>
          </div>

          {/* 🔹 Status History */}
          <div className="col-md-6">
            <h5 className="fw-bold">{t("status_history")}</h5>
            <ul className="list-group">
              {invoice?.statusHistory?.map((entry, index) => (
                <li key={index} className="list-group-item">
                  <strong>{entry.status.toUpperCase()}</strong>{" "}
                  <span className="float-end">{entry.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🔹 Payment Records */}
        <div className="mt-4">
          <h5 className="fw-bold">{t("payment_transactions")}</h5>
          {invoice?.payments?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>{t("type")}</th>
                  <th>{t("date")}</th>
                  <th>{t("amount")}</th>
                  <th>{t("paid")}</th>
                  <th>{t("payment_method")}</th>
                </tr>
              </thead>
              <tbody>
                {invoice.payments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment?.type}</td>
                    <td>{payment.paymentDate}</td>
                    <td>
                      {formatNumber(payment.amount, {
                        style: "currency",
                        currency: "XOF",
                      })}
                    </td>
                    <td className="text-success">{payment.amountPaid} FCFA</td>
                    <td>{payment.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">{t("no_payments")}</p>
          )}
        </div>

        {/* 🔹 Attachments */}
        {invoice.attachments?.length > 0 && (
          <div className="mt-4">
            <h5 className="fw-bold">{t("attachments")}</h5>
            <ul className="list-group">
              {invoice.attachments.map((url, index) => (
                <li key={index} className="list-group-item">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    View Attachment {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 🔹 Actions */}
        <div className="mt-4 d-flex justify-content-between">
          {isAdminOrAgent && (
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
              disabled={isPaid}
            >
              {t("record_payment")}
            </button>
          )}
          {isAdminOrAgent && (
            <Link
              href={`/invoices/${invoice.id}/edit`}
              className="btn btn-warning"
            >
              {t("edit_invoice")}
            </Link>
          )}
          <button
            className="btn btn-outline-secondary"
            onClick={exportToPDF}
            disabled={isExporting}
          >
            {isExporting ? `${t("exporting")}...` : t("export_as_pdf")}
          </button>
          <button
            onClick={() => router.back()}
            className="btn btn-outline-secondary"
          >
            {t("back_to_invoices")}
          </button>
        </div>
      </div>

      {/* 🔹 Manual Payment Modal */}
      {showModal && (
        <ManualPaymentModal
          invoiceId={invoice.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default InvoiceDetailsPage;
