import Link from "next/link";

const InvoiceTable = ({ data }) => {
  if (!data || data.length === 0) return <p>No invoices found.</p>;

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
        {data.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice.tenant.name}</td>
            <td>{invoice.property.title}</td>
            <td>{invoice.amount}</td>
            <td>{invoice.dueDate}</td>
            <td>{invoice.status}</td>
            <td>
              <Link href={`/invoices/${invoice.id}`}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
