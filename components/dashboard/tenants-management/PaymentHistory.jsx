import { useGetPaymentsByTenantQuery } from "@/features/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const PaymentHistory = ({ tenantId }) => {
  const { data: payments, isLoading } = useGetPaymentsByTenantQuery(tenantId);

  if (isLoading) return <LoadingSpinner />;
  if (!payments || payments.length === 0) return <p>No payments found.</p>;

  return (
    <div className="card shadow-sm p-3 mt-4">
      <h4>Payment History</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount Paid</th>
            <th>Invoice #</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.paymentDate}</td>
              <td>${payment.amountPaid}</td>
              <td>{payment.invoice.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
