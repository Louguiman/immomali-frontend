import { Property } from "./property";

export interface PropertyImage {
  id: number;
  originalName: string;
  name: string;
  url: string;
  file?: File;
  property?: Property | number;
  imageUrl?: string;
}
