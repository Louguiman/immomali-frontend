// Frontend Agency interface aligned with backend entity

import { Property } from "./property";
import { Tenant } from "./tenant";
import { Review } from "./review";
import { MaintenanceRequest } from "./maintenance-request";
import { Agent } from "./agent";

export interface Agency {
  id: number;
  name: string;
  logoUrl?: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  agents: Agent[];
  properties: Property[];
  tenancies: Tenant[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  maintenanceRequests: MaintenanceRequest[];
}
