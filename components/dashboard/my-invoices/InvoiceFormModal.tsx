import { useEffect, useState, useMemo, ChangeEvent, FormEvent } from "react";
import {
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
} from "@/features/api/invoices.api";
import { useGetTenantsQuery } from "@/features/api/tenants.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import type { Invoice as BaseInvoice } from "@/utils/interface/payment.interface";
import type { RootState } from "@/store/store";
``
interface InvoiceFormData {
  tenantId: string;
  amount: string;
  dueDate: string;
  status: "unpaid" | "paid" | "overdue";
  issuedBy: string;
  totalAmount: string;
  type: string;
  tax: string;
  discount: string;
  notes: string;
  attachments: string[];
}

interface InvoiceFormModalProps {
  invoice?: Partial<BaseInvoice> & {
    id?: number | string;
    tenantId?: number | string;
    amount?: number | string;
    totalAmount?: number | string;
    tax?: number | string;
    discount?: number | string;
    notes?: string;
    status?: string;
    type?: string;
    dueDate?: string;
  };
  onClose: () => void;
}

const InvoiceFormModal: React.FC<InvoiceFormModalProps> = ({
  invoice,
  onClose,
}) => {
  const isEditing = Boolean(invoice);
  const user = useAppSelector((state: import("@/store/store").RootState) => state.auth.user);
  const t = useTranslations("dashboard.invoiceList");

  const initialFormData = useMemo<InvoiceFormData>(
    () => ({
      tenantId: invoice?.tenantId?.toString() || "",
      amount: (typeof invoice?.amount === "number"
        ? invoice.amount
        : 0
      ).toString(),
      dueDate: invoice?.dueDate?.toString() || "",
      status: invoice?.status || "unpaid",
      issuedBy: user?.id?.toString() || "",
      totalAmount: (typeof invoice?.amount === "number"
        ? invoice.amount
        : 0
      ).toString(),
      type: "rent", // Default type
      tax: (typeof invoice?.tax === "number" ? invoice.tax : 0).toString(),
      discount: (typeof invoice?.discount === "number"
        ? invoice.discount
        : 0
      ).toString(),
      notes: invoice?.notes?.toString() || "",
      attachments: [],
    }),
    [invoice, user?.id]
  );

  const [formData, setFormData] = useState<InvoiceFormData>(initialFormData);

  const { data: tenants } = useGetTenantsQuery({});
  const [createInvoice, { isLoading: creating }] = useCreateInvoiceMutation();
  const [updateInvoice, { isLoading: updating }] = useUpdateInvoiceMutation();
  // Used to disable form controls during submission
  const isSubmitting = creating || updating;

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const fileUrls = files
      .filter((file): file is File => file instanceof File)
      .map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...fileUrls],
    }));
  };

  // Using BaseInvoice type from the interface with Omit to exclude auto-generated fields

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.tenantId || !formData.amount || !formData.dueDate) {
      alert(t("pleaseFillRequiredFields"));
      return;
    }

    try {
      const invoiceData: Omit<BaseInvoice, "id" | "createdAt" | "updatedAt"> = {
        tenantId: Number(formData.tenantId),
        amount: Number(formData.amount),
        dueDate: formData.dueDate,
        status: formData.status,
        type: formData.type,
        tax: Number(formData.tax) || 0,
        discount: Number(formData.discount) || 0,
        notes: formData.notes,
      };

      if (isEditing && invoice?.id) {
        await updateInvoice({
          id: Number(invoice.id),
          data: invoiceData,
        }).unwrap();
      } else {
        await createInvoice(invoiceData).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditing ? t("editInvoice") : t("createInvoice")}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label={t("close")}
              title={t("close")}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label>{t("tenant")}</label>
              <select
                className="form-control"
                value={formData.tenantId}
                onChange={(e) =>
                  setFormData({ ...formData, tenantId: e.target.value })
                }
                required
                aria-label={t("selectTenant")}
                title={t("selectTenant")}
              >
                <option value="">{t("selectTenant")}</option>
                {tenants?.map(
                  (tenant: {
                    id: number | string;
                    user?: { name?: string };
                    property?: { title?: string };
                  }) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.user?.name} - {tenant.property?.title}
                    </option>
                  )
                )}
              </select>

              <div className="mb-3">
                <div className="form-group">
                  <label htmlFor="totalAmount" className="form-label">
                    {t("totalAmount")}
                  </label>
                  <input
                    type="number"
                    id="totalAmount"
                    className="form-control"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-label={t("totalAmount")}
                    title={t("totalAmount")}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">{t("invoiceType")}</label>
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  aria-label={t("invoiceType")}
                  title={t("invoiceType")}
                >
                  <option value="rent">Rent</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="utility">Utility</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">{t("status")}</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  aria-label={t("status")}
                  title={t("status")}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">{t("tax")}</label>
                    <input
                      type="number"
                      className="form-control"
                      name="tax"
                      value={formData.tax}
                      onChange={handleChange}
                      aria-label={t("tax")}
                      placeholder={t("tax")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">{t("discount")}</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      aria-label={t("discount")}
                      placeholder={t("discount")}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">{t("dueDate")}</label>
                <input
                  type="date"
                  className="form-control"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  aria-label={t("dueDate")}
                  title={t("dueDate")}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">{t("notes")}</label>
                <textarea
                  className="form-control"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  aria-label={t("notes")}
                  placeholder={t("enterNotes")}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">{t("attachments")}</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleFileUpload}
                  aria-label={t("attachments")}
                  title={t("selectFiles")}
                />
                <div className="mt-2">
                  {formData?.attachments?.map((file, index) => (
                    <div key={index} className="d-flex align-items-center">
                      <a href={file} target="_blank" rel="noopener noreferrer">
                        View File {index + 1}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                  aria-label={
                    isEditing ? t("updateInvoice") : t("createInvoice")
                  }
                >
                  {isSubmitting ? (
                    <LoadingSpinner />
                  ) : isEditing ? (
                    t("updateInvoice")
                  ) : (
                    t("createInvoice")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormModal;
