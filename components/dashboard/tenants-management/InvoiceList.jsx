import Link from "next/link";

const InvoiceList = ({ invoices }) => {
  if (!invoices.length) return <p>No invoices found.</p>;

  return (
    <div className="card shadow-sm p-3 mt-4">
      <h4>Invoices</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Amount</th>
            <th>Amount Paid</th>
            <th>Remaining Balance </th>
            <th>Type</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Notes</th>
            <th>issuedBy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.totalAmount} FCFA</td>
              <td>{invoice.paidAmount} FCFA</td>
              <td>{invoice.remainingBalance} FCFA</td>
              <td>{invoice.type}</td>
              <td>
                <span
                  className={`badge ${
                    invoice.status === "paid" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>

              <td>{invoice.dueDate}</td>
              <td>{invoice.notes}</td>
              <td className="col">
                {invoice.issuedBy.name}
                {invoice.issuedBy.email}
                {invoice.issuedBy.phone}
              </td>

              <td>
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
