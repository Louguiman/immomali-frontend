// Frontend InquiryReply interface aligned with backend entity
import { Inquiry } from "./inquiry";
import { User } from "./user";

export interface InquiryReply {
  id: number;
  message: string;
  inquiry: Inquiry;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
