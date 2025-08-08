// Frontend Tenant interface aligned with backend entity

import { Agency } from "./agency";
import { Agent } from "./agent";
import { Invoice } from "./invoice";
import { Lease } from "./lease";
import { MaintenanceRequest } from "./maintenance-request";
import { Property } from "./property";
import { User } from "./user";

export interface Tenant {
  id: number;
  user: User;
  property: Property;
  agent: Agent;
  agency?: Agency;
  maintenanceRequests: MaintenanceRequest[];
  outstandingBalance: number;
  totalPaid: number;
  autoRenewal: boolean;
  invoices: Invoice[];
  lease: Lease;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
