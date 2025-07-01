// Frontend User interface aligned with backend entity
import { Agency } from "./agency";
import { Property } from "./property";
import { Review } from "./review";
import { Tenant } from "./tenant";

export interface User {
  id: number;
  email: string;
  agency?: Agency;
  properties?: Property[];
  reviews?: Review[];
  tenancies?: Tenant[];
  // Add other user fields as needed
}
