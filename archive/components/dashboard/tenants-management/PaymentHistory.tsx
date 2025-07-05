"use client";

import { useParams } from "next/navigation";
import { useGetTenantPaymentsQuery } from "@/features/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export const TenantPaymentHistory = () => {
  const { id } = useParams();
  const { data: payments, isLoading, isError } = useGetTenantPaymentsQuery(id);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="alert alert-danger">Error loading payments.</p>;

  return (
    <div className="container mt-4">
      <h2>Tenant Payment History</h2>
      <p>View all rent payments for this tenant.</p>

      <div className="card mt-3">
        <div className="card-body">
          {payments.length === 0 ? (
            <p className="text-muted">No payment records found.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.invoiceId}</td>
                    <td>{payment.amount} FCFA</td>
                    <td>{payment.paymentDate || "Pending"}</td>
                    <td>
                      <span
                        className={`badge ${
                          payment.status === "paid"
                            ? "bg-success"
                            : payment.status === "pending"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantPaymentHistory;
