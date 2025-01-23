export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  location: string;
  photos: string[];
  status: "available" | "rented" | "sold";
}

export interface PropertyQueryParams {
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
