import type { Property } from "./property.interface";
import type { User } from "./user.interface";

export interface InquiryMessage {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  sender: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
  isRead: boolean;
}

export interface InquiryReply {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  sender: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
  inquiryId: number;
}

export interface Inquiry {
  id: number;
  propertyId: number;
  property?: Property;
  userId: number;
  user?: User;
  message: string; // The initial inquiry message
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  messages: InquiryMessage[];
  replies: InquiryReply[];
  createdAt: string;
  updatedAt: string;
  phoneNumber?: string; // For backward compatibility
  email?: string; // For backward compatibility
  name?: string; // For backward compatibility
}

export interface CreateInquiryDto {
  propertyId: number;
  message: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
}

export interface SendReplyDto {
  content: string;
  inquiryId: number;
  userId: number;
}

export interface UpdateInquiryStatusDto {
  status: Inquiry['status'];
}
