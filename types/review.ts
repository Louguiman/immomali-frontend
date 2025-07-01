// Frontend Review interface aligned with backend entity
import { Agency } from "./agency";
import { Property } from "./property";
import { User } from "./user";

export interface Review {
  id: number;
  comment: string;
  rating: number;
  user: User;
  property?: Property;
  agent?: User;
  agency?: Agency;
  createdAt: Date;
  updatedAt: Date;
}
