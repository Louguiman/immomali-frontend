import { useFormatter } from "next-intl";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const AgencyInvoiceTable = ({ invoices, onEdit, onDelete }) => {
  const t = useTranslations("dashboard.invoiceList");
  const { number: formatNumber } = useFormatter(); // Hook for number formatting

  const pathname = usePathname();
  const router = useRouter();
  if (!invoices || invoices.length === 0) {
    return <p>{t("noInvoicesFound")}</p>; // Use localized 'No invoices found' message
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>{t("invoiceNumber")}</th> {/* Localized 'Invoice #' */}
          <th>{t("tenant")}</th> {/* Localized 'Tenant' */}
          <th>Property</th>
          <th>{t("type")}</th> {/* Localized 'Type' */}
          <th>{t("amount")}</th> {/* Localized 'Amount' */}
          <th>{t("amountPaid")}</th> {/* Localized 'Amount Paid' */}
          <th>{t("remainingBalance")}</th> {/* Localized 'Remaining Balance' */}
          <th>{t("dueDate")}</th> {/* Localized 'Due Date' */}
          <th>{t("status")}</th> {/* Localized 'Status' */}
          <th>{t("issuedBy")}</th> {/* Localized 'Issued By' */}
          <th>{t("actions")}</th> {/* Localized 'Actions' */}
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.ref}</td>
            <td>{invoice?.tenant?.user?.name}</td>
            <td>{invoice?.tenant?.property?.title}</td>
            <td>{invoice?.type}</td>
            <td>
              {formatNumber(invoice.totalAmount, {
                style: "currency",
                currency: "XOF",
              })}
            </td>
            <td>
              {formatNumber(invoice.paidAmount, {
                style: "currency",
                currency: "XOF",
              })}
            </td>
            {/* Currency formatted */}
            <td>
              {formatNumber(invoice.remainingBalance, {
                style: "currency",
                currency: "XOF",
              })}
            </td>
            {/* Currency formatted */}
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
                {t(invoice.status)}
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
                {t("view")}
              </button>

              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(invoice)}
              >
                {t("edit")}
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(invoice.id)}
              >
                {t("delete")}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AgencyInvoiceTable;
