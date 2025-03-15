"use client";
import { useRouter, usePathname } from "@/i18n/navigation";

const InvoiceTable = ({ invoices }) => {
  const router = useRouter();
  const pathname = usePathname();
  if (!invoices || invoices.length === 0) return <p>No invoices found.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tenant</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Paid</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Issued By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice.tenant.user.name}</td>
            <td>{invoice?.type}</td>
            <td>{invoice.totalAmount} FCFA</td>
            <td>{invoice.paidAmount} FCFA</td>
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
              <ul>
                <li> {invoice?.issuedBy?.name}</li>
                <li>{invoice?.issuedBy?.phone}</li>
                <li> {invoice?.issuedBy?.email}</li>
              </ul>
            </td>

            <td>
              <button
                onClick={() => router.push(`${pathname}/${invoice.id}`)}
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
