export interface Payment {
  id: number;
  tenantId: number;
  amount: number;
  type: string; // Rent, Maintenance, etc.
  status: "pending" | "completed" | "failed";
  paymentMethod: string;
  createdAt: string;
}

export interface Invoice {
  id: number;
  tenantId: number;
  amount: number;
  status: "unpaid" | "paid" | "overdue";
  dueDate: string;
}
