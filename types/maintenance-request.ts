// Frontend MaintenanceRequest interface aligned with backend entity
import { Tenant } from "./tenant";
import { Property } from "./property";
import { User } from "./user";
import { Agency } from "./agency";

export enum RequestStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  RESOLVED = "resolved",
  CANCELLED = "cancelled",
}

export enum RequestPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface MaintenanceRequest {
  id: number;
  tenant: Tenant;
  property: Property;
  assignedTo?: User;
  agency?: Agency;
  title: string;
  description: string;
  priority: RequestPriority;
  category: string;
  status: RequestStatus;
  estimatedCost?: number;
  actualCost?: number;
  resolutionNotes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}
