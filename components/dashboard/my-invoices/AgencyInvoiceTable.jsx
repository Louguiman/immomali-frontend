"use client";
import { useRouter, usePathname } from "@/i18n/navigation";
const AgencyInvoiceTable = ({ invoices, onEdit, onDelete }) => {
  const pathname = usePathname();
  const router = useRouter();
  if (!invoices || invoices.length === 0) return <p>No invoices found.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tenant</th>
          <th>Property</th>
          <th>Type</th>
          <th>Total Amount</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice?.tenant?.user?.name}</td>
            <td>{invoice?.tenant?.property?.title}</td>
            <td>{invoice.type} </td>
            <td>{invoice.totalAmount} FCFA</td>
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
            <td>{invoice?.notes}</td>

            <td>
              <button
                onClick={() => router.push(`${pathname}/${invoice.id}`)}
                className="btn btn-sm btn-primary me-2"
              >
                View
              </button>

              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(invoice)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(invoice.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AgencyInvoiceTable;
