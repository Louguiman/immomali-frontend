// Frontend Advertisement interface aligned with backend entity
import { User } from "./user";
import { Property } from "./property";
import { Payment } from "./payment";

export enum AdStatus {
  ACTIVE = "active",
  PENDING = "pending",
  EXPIRED = "expired",
  REJECTED = "rejected",
}

export enum AdType {
  STANDARD = "standard",
  FEATURED = "featured",
  BOOSTED = "boosted",
}

export interface Advertisement {
  id: number;
  advertiser: User;
  property: Property;
  visibility: boolean;
  adType: AdType;
  price: number;
  isPaid: boolean;
  status: AdStatus;
  expirationDate?: Date;
  autoRenew: boolean;
  startDate: Date;
  endDate: Date;
  payment?: Payment;
  rejectionReason?: string;
  views: number;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}
