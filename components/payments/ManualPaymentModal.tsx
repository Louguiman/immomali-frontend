"use client";

import { useState } from "react";
import { useCreateManualPaymentMutation } from "@/features/api/payments.api";
import { toast } from "react-toastify";
import { Payment } from "@/types/payment";

const ManualPaymentModal = ({
  invoiceId,
  onClose,
}: {
  invoiceId: string;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<Payment>({
    amount: 0,
    paymentDate: new Date(),
    tenant: {
      id: 0,
    },
    invoice: {
      id: invoiceId,
    },
    type: "Manual",
    amountPaid: 0,
    reference: "",
    paymentMethod: "",
  });

  const [createPayment, { isLoading }] = useCreateManualPaymentMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPayment({
        ...formData,
        invoiceId: invoiceId.toString(),
        tenant: {
          id: 0,
        },
        invoice: {
          id: Number(invoiceId),
        },
        type: "Manual",
        amountPaid: Number(formData.amount),
        paymentDate: new Date(),
        reference: formData.reference,
        paymentMethod: formData.paymentMethod,
      }).unwrap();
      toast.success("Payment recorded successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to record payment.");
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Record Manual Payment</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            >
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Amount Paid</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={formData.amount}
                  placeholder="Amount Paid"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select
                  name="paymentMethod"
                  className="form-select"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Mobile Money">Mobile Money</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Reference (Optional)</label>
                <input
                  type="text"
                  name="reference"
                  className="form-control"
                  value={formData.reference}
                  placeholder="Reference"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Date</label>
                <input
                  type="date"
                  placeholder="Payment Date"
                  name="paymentDate"
                  className="form-control"
                  value={formData.paymentDate.toISOString().split("T")[0]}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success"
                disabled={isLoading}
              >
                {isLoading ? "Recording..." : "Record Payment"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManualPaymentModal;
