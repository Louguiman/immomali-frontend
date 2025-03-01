"use client";

import { useState } from "react";
import { useRecordPaymentMutation } from "@/features/api/payments.api";
import { toast } from "react-toastify";

const PaymentForm = ({ tenant, invoice, onClose }) => {
  const [amountPaid, setAmountPaid] = useState(
    invoice.totalAmount - invoice.paidAmount
  );
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [recordPayment, { isLoading }] = useRecordPaymentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await recordPayment({
      tenantId: tenant.id,
      invoiceId: invoice.id,
      amountPaid,
      paymentDate,
    });
    toast.success("Payment recorded successfully!");
    onClose();
  };

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Record Payment</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Amount Paid</label>
                <input
                  type="number"
                  className="form-control"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Payment Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Record Payment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
