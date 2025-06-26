import { PropertyType, PropertyCategory } from './property-enums';

export interface PropertyImage {
  id?: string;
  url: string;
  file?: File;
  isNew?: boolean;
  isMarkedForDeletion?: boolean;
  originalName?: string;
  name?: string;
  imageUrl?: string; // Alias for url for backward compatibility
}

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

