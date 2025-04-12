import { useEffect, useState } from "react";
import {
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
} from "@/features/api/invoices.api";
import { useGetTenantsQuery } from "@/features/api/tenants.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";

const InvoiceFormModal = ({ invoice, onClose }) => {
  const isEditing = Boolean(invoice);
  const user = useAppSelector((state) => state.auth.user);
  const t = useTranslations("dashboard.invoiceList");

  const [formData, setFormData] = useState({
    tenantId: invoice?.tenant?.id || "",
    amount: invoice?.amount || "",
    dueDate: invoice?.dueDate || "",
    status: invoice?.status || "pending",
    issuedBy: user?.id || "",
    status: "pending",
    totalAmount: invoice?.totalAmount || "",
    type: "rent",
    tax: "",
    discount: "",
    notes: "",
    attachments: [],
  });

  const { data: tenants, isLoading: tenantsLoading } = useGetTenantsQuery({});
  const [createInvoice, { isLoading: creating }] = useCreateInvoiceMutation();
  const [updateInvoice, { isLoading: updating }] = useUpdateInvoiceMutation();

  useEffect(() => {
    if (invoice) {
      setFormData({
        tenantId: invoice.tenant?.id || "",
        amount: invoice.amount || "",
        dueDate: invoice.dueDate || "",
        status: invoice.status || "pending",
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...fileUrls],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tenantId || !formData.totalAmount || !formData.dueDate) {
      alert(t("pleaseFillRequiredFields"));
      return;
    }

    try {
      if (isEditing) {
        await updateInvoice({
          id: invoice.id,
          data: {
            ...formData,
            totalAmount: parseInt(formData.totalAmount),
            tax: formData.tax ? parseInt(formData.tax) : 0,
            discount: formData.discount ? parseInt(formData.discount) : 0,
          },
        });
      } else {
        await createInvoice({
          ...formData,
          tenantId: parseInt(formData.tenantId),
          totalAmount: parseInt(formData.totalAmount),
          tax: formData.tax ? parseInt(formData.tax) : 0,
          discount: formData.discount ? parseInt(formData.discount) : 0,
        });
      }
      onClose();
    } catch (error) {
      console.log("Error creating invoice:", error);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
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
              >
                <option value="">{t("selectTenant")}</option>
                {tenants?.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.user?.name} - {tenant.property?.title}
                  </option>
                ))}
              </select>

              <div className="mb-3">
                <label className="form-label">{t("totalAmount")}</label>
                <input
                  type="number"
                  className="form-control"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">{t("invoiceType")}</label>
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
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
                />
              </div>

              <div className="mb-3">
                <label className="form-label">{t("notes")}</label>
                <textarea
                  className="form-control"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">{t("attachments")}</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleFileUpload}
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
                  disabled={creating || updating}
                >
                  {creating || updating ? (
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
