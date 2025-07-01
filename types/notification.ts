// Frontend Notification interface aligned with backend entity
import { User } from "./user";

export enum NotificationType {
  PAYMENT = "payment",
  MAINTENANCE = "maintenance",
  LEASE = "lease",
  GENERAL = "general",
  PASSWORD_RESET = "password_reset",
  INVOICE_NOTIFICATION = "INVOICE_NOTIFICATION",
  INQUIRY_RECEIVED_CONFIRMATION = "INQUIRY_RECEIVED_CONFIRMATION",
  NEW_INQUIRY_RECEIVED = "NEW_INQUIRY_RECEIVED",
}

export interface Notification {
  id: number;
  recipient: User;
  message: string;
  type: NotificationType;
  isRead: boolean;
  archived: boolean;
  createdAt: Date;
}
