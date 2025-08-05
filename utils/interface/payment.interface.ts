export interface Payment {
  id: number;
  tenantId: number;
  invoiceId: number;
  amount: number;
  amountPaid?: number;
  paymentDate?: string;
  type?: string; // Rent, Maintenance, Penalty, etc.
  status: "pending" | "completed" | "failed";
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
}

export interface Invoice {
  id: number;
  tenantId: number;
  amount: number;
  status: "unpaid" | "paid" | "overdue";
  dueDate: string;
}
