// Frontend Invoice interface aligned with backend entity
import { Tenant } from "./tenant";
import { Property } from "./property";
import { Payment } from "./payment";
import { User } from "./user";

export enum InvoiceStatus {
  PENDING = "pending",
  PAID = "paid",
  OVERDUE = "overdue",
  PARTIALLY_PAID = "partially_paid",
}

export interface Invoice {
  id: number;
  ref: string;
  tenant: Tenant;
  property: Property;
  payments: Payment[];
  issuedBy: User;
  totalAmount: number;
  paidAmount: number;
  remainingBalance: number;
  dueDate: string;
  paymentDate?: string;
  type: string;
  status: InvoiceStatus;
  statusHistory?: { date: string; status: string }[];
  tax?: number;
  discount?: number;
  notes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}
