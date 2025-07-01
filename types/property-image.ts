import { Property } from "./property";

export interface PropertyImage {
  id: number;
  property: Property | number;
  imageUrl: string;
}
