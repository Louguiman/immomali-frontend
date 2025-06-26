import React from "react";
import { useTranslations, useFormatter } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

type InvoiceStatus = 'unpaid' | 'paid' | 'overdue' | 'pending' | string;

interface TenantUser {
  name: string;
}

interface InvoiceTenant {
  user: TenantUser;
}

interface IssuedByUser {
  name?: string;
  phone?: string;
  email?: string;
}

// Define the complete Invoice interface with all required fields
export interface Invoice {
  id: number | string;
  tenantId: number;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  tenant: InvoiceTenant;
  type: string;
  totalAmount: number;
  paidAmount: number;
  remainingBalance: number;
  issuedBy?: IssuedByUser;
  // Include any other fields that might be present in the API response
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices = [] }) => {
  const t = useTranslations("dashboard.invoiceList"); // Use the namespace 'invoiceList'
  const { number: formatNumber } = useFormatter(); // Hook for number formatting
  const router = useRouter();
  const pathname = usePathname();

  if (invoices.length === 0) {
    return <p>{t("noInvoicesFound")}</p>; // Use localized 'No invoices found' message
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>{t("invoiceNumber")}</th> {/* Localized 'Invoice #' */}
          <th>{t("tenant")}</th> {/* Localized 'Tenant' */}
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
            <td>{invoice.id}</td>
            <td>{invoice.tenant.user.name}</td>
            <td>{invoice?.type}</td>
            <td>
              {formatNumber(invoice.totalAmount, {
                style: "currency",
                currency: "XOF",
              })}
            </td>
            {/* Currency formatted */}
            <td>
              {formatNumber(invoice.paidAmount, {
                style: "currency",
                currency: "XOF",
              })}
            </td>{" "}
            {/* Currency formatted */}
            <td>
              {formatNumber(invoice.remainingBalance, {
                style: "currency",
                currency: "XOF",
              })}
            </td>{" "}
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
                aria-label={t(`status.${invoice.status}`) || invoice.status}
              >
                {t(`status.${invoice.status}`) || invoice.status}
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
                {t("view")} {/* Localized 'View' */}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
