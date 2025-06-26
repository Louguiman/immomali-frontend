import React from 'react';
import { useFormatter, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

type InvoiceStatus = 'unpaid' | 'paid' | 'overdue' | 'pending' | string;

interface TenantUser {
  name?: string;
}

interface TenantProperty {
  title?: string;
}

interface InvoiceTenant {
  user?: TenantUser;
  property?: TenantProperty;
}

interface IssuedByUser {
  name?: string;
  phone?: string;
  email?: string;
}

export interface AgencyInvoice {
  id: number | string;
  ref: string;
  tenantId: number;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  tenant?: InvoiceTenant;
  type: string;
  totalAmount: number;
  paidAmount: number;
  remainingBalance: number;
  issuedBy?: IssuedByUser;
}

interface AgencyInvoiceTableProps {
  invoices: AgencyInvoice[];
  onEdit: (invoice: AgencyInvoice) => void;
  onDelete: (id: number | string) => void;
}

const AgencyInvoiceTable: React.FC<AgencyInvoiceTableProps> = ({ 
  invoices = [], 
  onEdit, 
  onDelete 
}) => {
  const t = useTranslations("dashboard.invoiceList");
  const { number: formatNumber } = useFormatter(); // Hook for number formatting

  const pathname = usePathname();
  const router = useRouter();
  if (invoices.length === 0) {
    return <p className="text-muted">{t("noInvoicesFound")}</p>;
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
                aria-label={t('viewInvoice')}
              >
                {t("view")}
              </button>

              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(invoice)}
                aria-label={t('editInvoice')}
              >
                {t("edit")}
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(invoice.id)}
                aria-label={t('deleteInvoice')}
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
