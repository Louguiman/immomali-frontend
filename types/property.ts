import { PropertyType, PropertyCategory } from "./property-enums";
import { Tenant } from "./tenant";
import { MaintenanceRequest } from "./maintenance-request";
import { User } from "./user";
import { Agency } from "./agency";
import { Review } from "./review";
import { Amenities } from "./amenities";
import { PropertyImage } from "./property-image";

export interface PropertyAttachment {
  id?: string;
  name: string;
  url?: string;
  file?: File;
  size?: number;
  type?: string;
  isNew?: boolean;
  isMarkedForDeletion?: boolean;
}

// Base form data type
export type PropertyFormData = {
  title: string;
  description: string;
  type: PropertyType;
  category: PropertyCategory;
  price: string; // Always use string for price in forms
};

export type CreateListProps = {
  activeStep?: number;
  onNext: () => void;
  onPrevious?: () => void;
};

// Redux state types
export type CreateListingState = {
  title: string;
  description: string;
  type: PropertyType;
  category: PropertyCategory;
  price: string; // Store price as string to match the Redux store
  propertyImages: PropertyImage[];
  newImages: File[];
  attachments: PropertyAttachment[];
};

export type PropertiesState = {
  createListing: CreateListingState;
};

// Removed local placeholder interfaces for related entities

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  category: string;
  address: string;
  city: string;
  state: string;
  country: string;
  longitude?: number;
  latitude?: number;
  tenants: Tenant[];
  neighborhood: string;
  maintenanceRequests: MaintenanceRequest[];
  attachments: string[];
  saleTag: string[];
  garages: number | string;
  builtYear?: number;
  isFeatured: boolean;
  isRented: boolean;
  beds: number;
  baths: number;
  sqFt: number;
  images: PropertyImage[];
  amenities: Amenities;
  owner: User;
  reviews: Review[];
  agency?: Agency;
  createdAt: Date;
  updatedAt: Date;
  invoices?: Record<string, unknown>;
  ads?: Record<string, unknown>;
}
