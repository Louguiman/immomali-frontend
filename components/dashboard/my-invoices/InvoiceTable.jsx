import Link from "next/link";
import { useRouter } from "next/navigation";

const InvoiceTable = ({ invoices }) => {
  const router = useRouter();
  if (!invoices || invoices.length === 0) return <p>No invoices found.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tenant</th>
          <th>Property</th>
          <th>Amount</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice.tenant.name}</td>
            <td>{invoice?.property?.title}</td>
            <td>{invoice.amount} FCFA</td>
            <td>{invoice.dueDate}</td>
            <td>
              <span
                className={`badge ${
                  invoice.status === "paid"
                    ? "bg-success"
                    : invoice.status === "overdue"
                    ? "bg-danger"
                    : "bg-warning"
                }`}
              >
                {invoice.status}
              </span>
            </td>
            <td>
              <button
                onClick={() => router.push(`/invoices/${invoice.id}`)}
                className="btn btn-sm btn-primary me-2"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
