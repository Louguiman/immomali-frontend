"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetInvoiceByIdQuery } from "@/features/api/invoices.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Link from "next/link";
import { use } from "react";

const InvoiceDetailsPage = ({}) => {
  const params = useParams();
  const { id } = use(params); // Get the invoice ID from the URL
  const router = useRouter();

  const { data: invoice, isLoading, isError } = useGetInvoiceByIdQuery(id);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="alert alert-danger">Error fetching invoice details.</p>
    );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Invoice Details</h2>
        <button onClick={() => router.back()} className="btn btn-secondary">
          Back to Invoices
        </button>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h4 className="card-title">Invoice #{invoice.id}</h4>
          <p className="card-text">
            <strong>Status:</strong>{" "}
            <span
              className={`badge bg-${
                invoice.status === "paid" ? "success" : "warning"
              }`}
            >
              {invoice.status.toUpperCase()}
            </span>
          </p>
          <p className="card-text">
            <strong>Type:</strong> {invoice.type}
          </p>
          <p className="card-text">
            <strong>Total Amount:</strong> ${invoice.totalAmount}
          </p>
          <p className="card-text">
            <strong>Due Date:</strong> {invoice.dueDate}
          </p>

          {/* Tenant Info */}
          <h5 className="mt-3">Tenant Information</h5>
          <p>
            <strong>Name:</strong> {invoice.tenant?.user?.name}
            <br />
            <strong>Email:</strong> {invoice.tenant?.user?.email}
            <br />
            <strong>Phone:</strong> {invoice.tenant?.user?.phoneNumber}
          </p>

          {/* Issued By */}
          <h5 className="mt-3">Issued By</h5>
          <p>
            <strong>Name:</strong> {invoice.issuedBy?.name}
            <br />
            <strong>Email:</strong> {invoice.issuedBy?.email}
          </p>

          {/* Attachments */}
          {invoice.attachments?.length > 0 && (
            <>
              <h5 className="mt-3">Attachments</h5>
              <ul>
                {invoice?.attachments?.map((file, index) => (
                  <li key={index}>
                    <a href={file} target="_blank" rel="noopener noreferrer">
                      View File {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Edit/Delete Actions */}
          <div className="mt-4">
            <Link
              href={`/invoices/edit/${invoice.id}`}
              className="btn btn-primary me-2"
            >
              Edit Invoice
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => console.log("Delete Invoice")}
            >
              Delete Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;
