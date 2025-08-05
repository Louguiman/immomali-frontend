// Frontend User interface aligned with backend entity
import { Agency } from "./agency";
import { Property } from "./property";
import { Review } from "./review";
import { Tenant } from "./tenant";

export interface User {
  img: string;
  name: string;
  id: number;
  phoneNumber: string;
  email: string;
  agency?: Agency;
  properties?: Property[];
  reviews?: Review[];
  tenancies?: Tenant[];
}
