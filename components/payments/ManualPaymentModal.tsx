"use client";

import { useState } from "react";
import { useCreateManualPaymentMutation } from "@/features/api/payments.api";
import { toast } from "react-toastify";

const ManualPaymentModal = ({ invoiceId, onClose }) => {
  const [formData, setFormData] = useState({
    amount: "",
    method: "Cash",
    reference: "",
    paymentDate: new Date().toISOString().split("T")[0], // Default to today
  });

  const [createPayment, { isLoading }] = useCreateManualPaymentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPayment({
        ...formData,
        invoiceId,
      }).unwrap();
      toast.success("Payment recorded successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to record payment.");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Record Manual Payment</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
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
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select
                  name="method"
                  className="form-select"
                  value={formData.method}
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
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Date</label>
                <input
                  type="date"
                  name="paymentDate"
                  className="form-control"
                  value={formData.paymentDate}
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
