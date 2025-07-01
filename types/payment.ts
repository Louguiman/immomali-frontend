import { Invoice } from "./invoice";
import { Tenant } from "./tenant";
// Payment interface matching backend entity for frontend use
export interface Payment {
  id: number;
  tenant: Tenant;
  invoice: Invoice;
  type: string;
  reference?: string;
  amountPaid: number;
  paymentDate: Date;
  receiptUrl?: string;
  amount: number;
  status: string;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
  ads?: unknown;
}
