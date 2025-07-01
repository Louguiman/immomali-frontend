// Frontend Inquiry interface aligned with backend entity
import { Property } from "./property";
import { User } from "./user";
import { Agency } from "./agency";
import { InquiryReply } from "./inquiry-reply";

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
  property?: Property;
  agent?: User;
  agency?: Agency;
  status: string;
  replies: InquiryReply[];
  createdAt: Date;
  updatedAt: Date;
}
