import { useTranslations } from "next-intl";
import Link from "next/link";
import Swal from "sweetalert2";

const InvoiceList = ({ invoices }) => {
  const t = useTranslations("dashboard.invoiceList");

  if (!invoices.length) return <p>{t("noInvoicesFound")}</p>;

  const handleDelete = (invoiceId) => {
    Swal.fire({
      title: t("confirmDeleteTitle"),
      text: t("confirmDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("delete"),
      cancelButtonText: t("cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        // Appeler l'API pour supprimer la facture (à implémenter)
        Swal.fire(t("deleted"), t("invoiceDeleted"), "success");
      }
    });
  };

  return (
    <div className="card shadow-sm p-3 mt-4">
      <h4>{t("invoices")}</h4>
      <table className="table">
        <thead>
          <tr>
            <th>{t("invoiceNumber")}</th>
            <th>{t("amount")}</th>
            <th>{t("amountPaid")}</th>
            <th>{t("remainingBalance")}</th>
            <th>{t("type")}</th>
            <th>{t("status")}</th>
            <th>{t("dueDate")}</th>
            <th>{t("notes")}</th>
            <th>{t("issuedBy")}</th>
            <th>{t("actions")}</th>
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
                  {t(invoice.status)}
                </span>
              </td>
              <td>{invoice.dueDate}</td>
              <td>{invoice.notes}</td>
              <td className="col">
                <ul>
                  <li>{invoice?.issuedBy?.name}</li>
                  <li>{invoice?.issuedBy?.phone}</li>
                  <li>{invoice?.issuedBy?.email}</li>
                </ul>
              </td>
              <td>
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="btn btn-primary btn-sm"
                >
                  {t("view")}
                </Link>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(invoice.id)}
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
