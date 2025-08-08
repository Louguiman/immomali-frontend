// Frontend User interface aligned with backend entity
import { Agency } from "./agency";
import { Property } from "./property";
import { Review } from "./review";
import { Tenant } from "./tenant";

export interface User {
  id: number;
  img: string;
  name: string;
  roles?: Array<{
    id: string;
    name: string;
    permissions: Array<{
      id: string;
      name: string;
    }>;
  }>;
  phoneNumber: string;
  email: string;
  agency?: Agency;
  properties?: Property[];
  reviews?: Review[];
  tenancies?: Tenant[];
  socialMedia?: {
    skype?: string;
    website?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    googlePlus?: string;
    youtube?: string;
    pinterest?: string;
    vimeo?: string;
  };
}
