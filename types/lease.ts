// Frontend Lease interface aligned with backend entity
import { Tenant } from "./tenant";

export enum LeaseStatus {
  ACTIVE = "active",
  TERMINATED = "terminated",
  PENDING = "pending",
  EXPIRED = "expired",
}

export enum LeaseType {
  FIXED = "fixed-term",
  MONTHLY = "month-to-month",
}

export interface Lease {
  id: number;
  tenant: Tenant;
  monthlyRent: number;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseType: LeaseType;
  autoRenewal: boolean;
  renewalDate?: string;
  securityDeposit: number;
  leaseStatus: LeaseStatus;
  terminationDate?: string;
  terminationReason?: string;
  evicted: boolean;
  contractUrl?: string;
  additionalTerms?: string;
  createdAt: Date;
  updatedAt: Date;
}
