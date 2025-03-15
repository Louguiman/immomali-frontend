"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useExportInvoiceToPDFQuery,
  useGetInvoiceByIdQuery,
} from "@/features/api/invoices.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import ManualPaymentModal from "@/components/payments/ManualPaymentModal";
import { useAppSelector } from "@/store/hooks";

const InvoiceDetailsPage = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  // Get the invoice ID from the URL
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

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
    return (
      <p className="alert alert-danger">Error fetching invoice details.</p>
    );

  const isPaid = invoice.status === "paid";
  const isOverdue = invoice.status === "overdue";

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        {/* 🔹 Invoice Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold text-primary">Invoice #{invoice.id}</h2>
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
            <h5 className="fw-bold">Tenant Information</h5>
            <p>
              <strong>Name:</strong> {invoice.tenant.user.name}
            </p>
            <p>
              <strong>Email:</strong> {invoice.tenant.user.email}
            </p>
            <p>
              <strong>Phone:</strong> {invoice.tenant.user.phone}
            </p>
          </div>

          <div className="col-md-6">
            <h5 className="fw-bold">Invoice Details</h5>
            <p>
              <strong>Issued By:</strong> {invoice.issuedBy.name}
            </p>
            <p>
              <strong>Due Date:</strong> {invoice.dueDate}
            </p>
            <p>
              <strong>Payment Date:</strong>{" "}
              {invoice.paymentDate ? invoice.paymentDate : "Not Paid Yet"}
            </p>
          </div>
        </div>

        {/* 🔹 Financial Breakdown */}
        <div className="row mt-3">
          <div className="col-md-6">
            <h5 className="fw-bold">Financial Overview</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Total Amount:</strong>{" "}
                <span className="float-end">{invoice.totalAmount} FCFA</span>
              </li>
              <li className="list-group-item">
                <strong>Paid Amount:</strong>{" "}
                <span className="float-end text-success">
                  {invoice.paidAmount} FCFA
                </span>
              </li>
              <li className="list-group-item">
                <strong>Remaining Balance:</strong>{" "}
                <span className="float-end text-danger">
                  {invoice.remainingBalance} FCFA
                </span>
              </li>
              {invoice.tax > 0 && (
                <li className="list-group-item">
                  <strong>Tax:</strong>{" "}
                  <span className="float-end">{invoice.tax} FCFA</span>
                </li>
              )}
              {invoice.discount > 0 && (
                <li className="list-group-item">
                  <strong>Discount:</strong>{" "}
                  <span className="float-end">-{invoice.discount} FCFA</span>
                </li>
              )}
            </ul>
          </div>

          {/* 🔹 Status History */}
          <div className="col-md-6">
            <h5 className="fw-bold">Status History</h5>
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
          <h5 className="fw-bold">Payment Transactions</h5>
          {invoice?.payments?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Paid</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                {invoice.payments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment?.type}</td>
                    <td>{payment.paymentDate}</td>
                    <td>{payment.amount} FCFA</td>
                    <td className="text-success">{payment.amountPaid} FCFA</td>
                    <td>{payment.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No payments recorded yet.</p>
          )}
        </div>

        {/* 🔹 Attachments */}
        {invoice.attachments?.length > 0 && (
          <div className="mt-4">
            <h5 className="fw-bold">Attachments</h5>
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
              Record Payment
            </button>
          )}
          {isAdminOrAgent && (
            <Link
              href={`/invoices/${invoice.id}/edit`}
              className="btn btn-warning"
            >
              Edit Invoice
            </Link>
          )}

          <button
            className="btn btn-outline-secondary"
            onClick={exportToPDF}
            disabled={isExporting}
          >
            {isExporting ? "Exporting..." : "Export as PDF"}
          </button>

          <button
            onClick={() => router.back()}
            className="btn btn-outline-secondary"
          >
            Back to Invoices
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
