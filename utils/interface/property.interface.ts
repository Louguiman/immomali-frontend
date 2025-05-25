export interface Property {
  id: number | string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "sale" | "rent";
  status: "available" | "sold" | "rented";
  images?: string[];
  attachments?: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  agentId?: number | string;
  agencyId?: number | string;
  // Add any other relevant fields
}

export interface PropertyQueryParams {
  page?: number;
  limit?: number;
  type?: "sale" | "rent";
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sortBy?: "price" | "date" | "area";
  sortOrder?: "asc" | "desc";
  // Add any other relevant query parameters
}
