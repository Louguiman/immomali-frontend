import { Invoice } from "src/modules/invoices/entities/invoice.entity";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.id, {
    onDelete: "CASCADE",
  })
  tenant: Tenant;

  @ManyToOne(() => Invoice, (invoice) => invoice.payments, { eager: true })
  invoice: Invoice;

  @Column()
  type: string; // Rent, maintenance, penalty, etc.

  @Column({ nullable: true, default: "Manual Entry" })
  reference: string;

  @Column("decimal", { precision: 15, scale: 2 })
  amountPaid: number;

  @Column({ type: "date" })
  paymentDate: Date;

  @Column({ nullable: true })
  receiptUrl?: string; //

  @Column("decimal", { precision: 15, scale: 2 })
  amount: number;

  @Column({ default: "pending" }) // 'pending', 'completed', 'failed'
  status: string;

  @Column({ nullable: true })
  paymentMethod?: string; // e.g., cash, card, bank transfer

  @Column({ nullable: true })
  transactionId?: string; // Reference for external gateways

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  ads: any;
}

import { User } from "src/modules/users/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

export enum NotificationType {
  PAYMENT = "payment",
  MAINTENANCE = "maintenance",
  LEASE = "lease",
  GENERAL = "general",
  PASSWORD_RESET = "password_reset",
  INVOICE_NOTIFICATION = "INVOICE_NOTIFICATION",
  INQUIRY_RECEIVED_CONFIRMATION = "INQUIRY_RECEIVED_CONFIRMATION",
  NEW_INQUIRY_RECEIVED = "NEW_INQUIRY_RECEIVED",
}

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  recipient: User;

  @Column()
  message: string;

  @Column({
    type: "enum",
    enum: NotificationType,
    default: NotificationType.GENERAL,
  })
  type: NotificationType;

  @Column({ default: false })
  isRead: boolean;

  @Column({ default: false })
  archived: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

import { User } from "src/modules/users/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from "typeorm";

@Entity("notification_preferences")
export class NotificationPreferenceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column({ default: true })
  receiveWebsocket: boolean;

  @Column({ default: true })
  receiveEmail: boolean;

  @Column({ default: false })
  receiveSMS: boolean;
}

import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Agency } from "src/modules/agencies/entities/agency.entity";

export enum RequestStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  RESOLVED = "resolved",
  CANCELLED = "cancelled",
}

export enum RequestPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

@Entity("maintenance_requests")
export class MaintenanceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.maintenanceRequests, {
    onDelete: "CASCADE",
    eager: true,
  })
  tenant: Tenant;

  @ManyToOne(() => Property, (property) => property.maintenanceRequests, {
    onDelete: "CASCADE",
  })
  property: Property;

  @ManyToOne(() => User, (user) => user.assignedMaintenanceRequests, {
    nullable: true,
    eager: true,
  })
  assignedTo: User;

  @ManyToOne(() => Agency, (agency) => agency.maintenanceRequests, {
    nullable: true,
    eager: true,
  })
  agency: Agency; // ✅ New field: Tracks maintenance requests managed by the agency

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column({
    type: "enum",
    enum: RequestPriority,
    default: RequestPriority.MEDIUM,
  })
  priority: RequestPriority;

  @Column({ default: "general" }) // Plumbing, Electrical, Structural
  category: string;

  @Column({
    type: "enum",
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 2 })
  estimatedCost?: number;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 2 })
  actualCost?: number;

  @Column("text", { nullable: true })
  resolutionNotes?: string;

  @Column("simple-array", { nullable: true })
  attachments?: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { v4 as uuidv4 } from "uuid";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "src/modules/properties/entities/property.entity";

export enum InvoiceStatus {
  PENDING = "pending",
  PAID = "paid",
  OVERDUE = "overdue",
  PARTIALLY_PAID = "partially_paid",
}

@Entity("invoices")
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: true,
    // default: `IMO-ML-${uuidv4()}`,
  })
  ref: string;

  @BeforeInsert()
  setRefIfMissing() {
    if (!this.ref) {
      this.ref = `IMO-ML-${uuidv4()}`;
    }
  }

  // 🔹 Linked to the tenant
  @ManyToOne(() => Tenant, (tenant) => tenant.invoices, { eager: true })
  tenant: Tenant;

  @ManyToOne(() => Property, (property) => property.invoices, { eager: true })
  property: Property;
  // 🔹 Linked to payments
  @OneToMany(() => Payment, (payment) => payment.invoice, { cascade: true })
  payments: Payment[];

  // 🔹 Linked to the agent/owner who created the invoice
  @ManyToOne(() => User, (user) => user.issuedInvoices, { eager: true })
  issuedBy: User;

  @Column("decimal", { precision: 15, scale: 2, default: 0 })
  totalAmount: number; // 🔹 Full invoice amount

  @Column("decimal", { precision: 15, scale: 2, default: 0 })
  paidAmount: number; // 🔹 Amount paid so far

  @Column("decimal", { precision: 15, scale: 2, default: 0 })
  remainingBalance: number; // 🔹 Unpaid amount (calculated as total - paid)

  @Column({ type: "date" })
  dueDate: string;

  @Column({ type: "date", nullable: true })
  paymentDate: string;

  @Column({ default: "rent" }) // 🔹 Types: 'rent', 'maintenance', 'utility', 'other'
  type: string;

  @Column({ type: "enum", enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  status: InvoiceStatus;

  @Column({ type: "jsonb", nullable: true })
  statusHistory: { date: string; status: string }[]; // 🔹 Keeps a log of status changes

  @Column("decimal", { precision: 15, scale: 2, default: 0 })
  tax?: number;

  @Column("decimal", { precision: 15, scale: 2, default: 0 })
  discount?: number;

  @Column({ nullable: true })
  notes: string; // 🔹 Optional notes for the invoice

  @Column({ type: "jsonb", nullable: true })
  attachments: string[]; // 🔹 URLs of invoice-related documents

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Property } from "src/modules/properties/entities/property.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Agency } from "src/modules/agencies/entities/agency.entity";
import { InquiryReply } from "./InquiryReply.entity";

@Entity("inquiries")
export class Inquiry {
  @ApiProperty({ description: "Unique ID of the inquiry", example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Name of the person making the inquiry" })
  @Column()
  name: string;

  @ApiProperty({
    description: "Email address of the person making the inquiry",
  })
  @Column()
  email: string;

  @ApiProperty({ description: "Phone number (if provided)" })
  @Column({ nullable: true })
  phoneNumber?: string;

  @ApiProperty({ description: "Message content of the inquiry" })
  @Column("text")
  message: string;

  @ApiProperty({
    description: "Property inquiry (if applicable)",
    type: () => Property,
    required: false,
  })
  @ManyToOne(() => Property, (property) => property.id, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "propertyId" })
  property?: Property;

  @ApiProperty({
    description: "Agent inquiry (if applicable)",
    type: () => User,
    required: false,
  })
  @ManyToOne(() => User, (user) => user.id, { eager: true, nullable: true })
  @JoinColumn({ name: "agentId" })
  agent?: User;

  @ApiProperty({
    description: "Agency inquiry (if applicable)",
    type: () => Agency,
    required: false,
  })
  @ManyToOne(() => Agency, (agency) => agency.id, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "agencyId" })
  agency?: Agency;

  @ApiProperty({ description: "Status of the inquiry", example: "pending" })
  @Column({ default: "pending" }) // 'pending', 'reviewed', 'closed'
  status: string;

  @OneToMany(() => InquiryReply, (reply) => reply.inquiry, {
    cascade: true,
  })
  replies: InquiryReply[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Inquiry } from "./inquiry.entity";
import { User } from "src/modules/users/entities/user.entity";

@Entity("inquiry_replies")
export class InquiryReply {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Reply message content",
    example: "Thank you for your inquiry. We will contact you shortly.",
  })
  @Column({ type: "text" })
  message: string;

  @ApiProperty({
    description: "Inquiry associated with this reply",
    type: () => Inquiry,
  })
  @ManyToOne(() => Inquiry, (inquiry) => inquiry.replies, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "inquiryId" })
  inquiry: Inquiry;

  @ApiProperty({ description: "User who sent the reply", type: () => User })
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import { Review } from "src/modules/reviews/entities/review.entity";
import { MaintenanceRequest } from "src/modules/maintenance-request/entities/maintenance-request.entity";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";

@Entity("agencies")
export class Agency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  logoUrl: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  address: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  website: string;

  @OneToMany(() => User, (user) => user.agency)
  agents: User[];

  @OneToMany(() => Property, (property) => property.agency)
  properties: Property[];

  @OneToMany(() => Tenant, (tenant) => tenant.agency)
  tenancies: Tenant[];

  @OneToMany(() => Review, (review) => review.agency) // 👈 **Fix: Added this**
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MaintenanceRequest, (request) => request.agency)
  maintenanceRequests: MaintenanceRequest[];
}
  
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";

export enum AdStatus {
  ACTIVE = "active",
  PENDING = "pending",
  EXPIRED = "expired",
  REJECTED = "rejected",
}

export enum AdType {
  STANDARD = "standard", // Free listing
  FEATURED = "featured", // Premium ad placement
  BOOSTED = "boosted", // Top priority ad
}

@Entity("advertisements")
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ads, { eager: true })
  @JoinColumn({ name: "advertiserId" })
  advertiser: User;

  @ManyToOne(() => Property, (property) => property.ads, { eager: true })
  property: Property;

  @Column()
  visibility: boolean;

  @Column({ type: "enum", enum: AdType, default: AdType.STANDARD })
  adType: AdType;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  price: number; // Cost of ad placement

  @Column({ default: false })
  isPaid: boolean; // Whether the ad payment is completed

  @Column({ type: "enum", enum: AdStatus, default: AdStatus.PENDING })
  status: AdStatus;

  @Column({ type: "timestamp", nullable: true })
  expirationDate: Date; // Expiry date of the ad

  @Column({ type: "boolean", default: false })
  autoRenew: boolean; // Auto-renewal enabled?

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @ManyToOne(() => Payment, (payment) => payment.ads, { nullable: true })
  payment: Payment; // Payment details if premium ad

  @Column({ type: "text", nullable: true })
  rejectionReason: string; // If an ad is rejected

  @Column({ type: "int", default: 0 })
  views: number; // Number of times the ad was seen

  @Column({ type: "int", default: 0 })
  clicks: number; // Number of user interactions

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  expiresAt: Date;
}
  

import { Column } from "typeorm";

export class BaseProfile {
  @Column({ type: "varchar", length: 255, nullable: true })
  img?: string; // Profile image

  @Column({ type: "varchar", length: 50, nullable: true })
  type?: string; // e.g., Agent, Agency, User

  @Column({ type: "float", default: 0 })
  ratings?: number;

  @Column({ type: "int", default: 0 })
  noOfListings?: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  position?: string; // Job Position (e.g., Manager, Real Estate Agent)

  @Column({ type: "varchar", length: 50, nullable: true })
  license?: string; // License Number

  @Column({ type: "varchar", length: 50, nullable: true })
  taxNumber?: string; // Tax Identification Number

  @Column({ type: "varchar", length: 50, nullable: true })
  office?: string; // Office Number

  @Column({ type: "varchar", length: 50, nullable: true })
  mobile?: string; // Mobile Number

  @Column({ type: "varchar", length: 50, nullable: true })
  fax?: string; // Fax Number

  @Column({ type: "varchar", length: 100, nullable: true })
  email?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phone?: string; // Alternative Contact Number

  @Column({ type: "varchar", length: 50, nullable: true })
  language?: string; // Preferred Language

  @Column({ type: "varchar", length: 100, nullable: true })
  companyName?: string; // Company Name

  @Column({ type: "text", nullable: true })
  address?: string; // Physical Address

  @Column({ type: "text", nullable: true })
  aboutMe?: string; // Short Biography or Description

  @Column({ type: "jsonb", nullable: true })
  socialList?: { name: string; liveLink: string }[];
}

import { Agency } from "src/modules/agencies/entities/agency.entity";
import { MaintenanceRequest } from "src/modules/maintenance-request/entities/maintenance-request.entity";
import { Review } from "src/modules/reviews/entities/review.entity";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  Relation,
} from "typeorm";

@Entity("amenities")
export class Amenities {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Property, (property) => property.amenities, {
    onDelete: "CASCADE",
  })
  property: Relation<Property>;

  @Column({ type: "boolean", default: false })
  airConditioning: boolean;

  @Column({ type: "boolean", default: false })
  barbeque: boolean;

  @Column({ type: "boolean", default: false })
  dryer: boolean;

  @Column({ type: "boolean", default: false })
  gym: boolean;

  @Column({ type: "boolean", default: false })
  laundry: boolean;

  @Column({ type: "boolean", default: false })
  lawn: boolean;

  @Column({ type: "boolean", default: false })
  microwave: boolean;

  @Column({ type: "boolean", default: false })
  outdoorShower: boolean;

  @Column({ type: "boolean", default: false })
  refrigerator: boolean;

  @Column({ type: "boolean", default: false })
  sauna: boolean;

  @Column({ type: "boolean", default: false })
  swimmingPool: boolean;

  @Column({ type: "boolean", default: false })
  tvCable: boolean;

  @Column({ type: "boolean", default: false })
  washer: boolean;

  @Column({ type: "boolean", default: false })
  wifi: boolean;

  @Column({ type: "boolean", default: false })
  windowCoverings: boolean;
}

@Entity("property_images")
export class PropertyImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property, (property) => property.images, {
    onDelete: "CASCADE",
  })
  property: Relation<Property>;

  @Column("text")
  imageUrl: string; // URL of the image
}

@Entity("properties")
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "integer", default: 0 })
  price: number;

  @Column({ type: "varchar", length: 50, default: "rent" })
  type: string; // 'rent' or 'sale'

  @Column({ type: "varchar", length: 50, default: "apartment" })
  category: string; // 'apartment', 'house', 'condo', land,etc.

  @Column({ type: "varchar", length: 100, default: "" })
  address: string;

  @Column({ type: "varchar", length: 100, default: "Bamako" })
  city: string;

  @Column({ type: "varchar", length: 100, default: "District de Bamako" })
  state: string;

  @Column({ type: "varchar", length: 100, default: "Mali" })
  country: string;

  @Column({ type: "decimal", precision: 9, scale: 6, nullable: true })
  longitude: number; // Longitude of the property (with 6 decimal precision)

  @Column({ type: "decimal", precision: 9, scale: 6, nullable: true })
  latitude: number; // Latitude of the property (with 6 decimal precision)

  @OneToMany(() => Tenant, (tenant) => tenant.property)
  tenants: Tenant[];

  @Column({ type: "varchar", length: 100, default: "" })
  neighborhood: string;

  @OneToMany(() => MaintenanceRequest, (request) => request.property)
  maintenanceRequests: MaintenanceRequest[]; //

  @Column("text", { array: true, default: "{}" })
  attachments: string[];

  @Column("text", { array: true, default: "{}" })
  saleTag: string[];

  @Column({ type: "varchar", length: 50, default: "0" })
  garages: number;

  @Column({ type: "integer", nullable: true })
  builtYear: number;

  @Column({ type: "boolean", default: false })
  isFeatured: boolean;

  @Column({ type: "boolean", default: false })
  isRented: boolean;

  @Column({ type: "integer", default: 0 })
  beds: number;

  @Column({ type: "integer", default: 0 })
  baths: number;

  @Column({ type: "integer", default: 0 })
  sqFt: number;

  @OneToMany(() => PropertyImage, (image) => image.property, {
    cascade: true,
    eager: true,
  })
  images: PropertyImage[];

  @OneToOne(() => Amenities, (amenities) => amenities.property, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  amenities: Amenities;

  @ManyToOne(() => User, (user) => user.properties, { eager: true })
  @JoinColumn({ name: "ownerId" }) // Define foreign key column explicitly
  owner: User;

  @OneToMany(() => Review, (review) => review.property, { cascade: true })
  reviews: Review[];

  @ManyToOne(() => Agency, (agency) => agency.properties, { nullable: true })
  @JoinColumn({ name: "agencyId" })
  agency: Agency;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  invoices: any;

  ads: any;
}

import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import { Agency } from "src/modules/agencies/entities/agency.entity";

@Entity("reviews")
export class Review {
  @ApiProperty({ description: "Unique ID of the review", example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Review comment", example: "Great experience!" })
  @Column({ type: "text" })
  comment: string;

  @ApiProperty({ description: "Rating from 1 to 5", example: 4 })
  @Column({ type: "int", default: 0 })
  rating: number;

  @ApiProperty({ description: "User who wrote the review", type: () => User })
  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ApiProperty({
    description: "Property reviewed (if applicable)",
    type: () => Property,
    required: false,
  })
  @ManyToOne(() => Property, (property) => property.reviews, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "propertyId" })
  property?: Property;

  @ApiProperty({
    description: "Agent reviewed (if applicable)",
    type: () => User,
    required: false,
  })
  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "agentId" })
  agent?: User;

  @ApiProperty({
    description: "Agency reviewed (if applicable)",
    type: () => Agency,
    required: false,
  })
  @ManyToOne(() => Agency, (agency) => agency.reviews, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "agencyId" })
  agency?: Agency;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";

// Define Lease Statuses as Enum
export enum LeaseStatus {
  ACTIVE = "active",
  TERMINATED = "terminated",
  PENDING = "pending",
  EXPIRED = "expired",
}
export enum LeaseType {
  FIXED = "fixed-term",
  MONTHLY = "month-to-month",
}

@Entity("leases")
export class Lease {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.id)
  tenant: Tenant;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  monthlyRent: number;

  @Column({ type: "date" })
  leaseStartDate: string;

  @Column({ type: "date" })
  leaseEndDate: string;

  @Column({
    type: "enum",
    enum: LeaseType,
    default: LeaseType.FIXED,
  })
  leaseType: LeaseType;

  @Column({ default: false })
  autoRenewal: boolean;

  @Column({ nullable: true, type: "date" })
  renewalDate?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  securityDeposit: number;

  @Column({ type: "enum", enum: LeaseStatus, default: LeaseStatus.PENDING })
  leaseStatus: LeaseStatus;

  @Column({ nullable: true, type: "date" })
  terminationDate?: string;

  @Column({ nullable: true, type: "text" })
  terminationReason?: string;

  @Column({ type: "boolean", default: false })
  evicted: boolean;

  @Column({ nullable: true })
  contractUrl: string; // Link to uploaded lease contract

  @Column({ type: "text", nullable: true })
  additionalTerms?: string; // New: Any custom lease conditions

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
  
import { Property } from "src/modules/properties/entities/property.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Lease } from "./leases.entity";
import { Invoice } from "src/modules/invoices/entities/invoice.entity";
import { MaintenanceRequest } from "src/modules/maintenance-request/entities/maintenance-request.entity";
import { Agency } from "src/modules/agencies/entities/agency.entity";

// Define Lease Statuses as Enum
export enum LeaseStatus {
  ACTIVE = "active",
  TERMINATED = "terminated",
  PENDING = "pending",
  EXPIRED = "expired",
}

@Entity("tenants")
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tenancies, { eager: true })
  user: User;

  @ManyToOne(() => Property, (property) => property.tenants, { eager: true })
  property: Property;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  agent: User;

  @ManyToOne(() => Agency, (agency) => agency.properties, { nullable: true })
  @JoinColumn({ name: "agencyId" })
  agency: Agency;

  @OneToMany(() => MaintenanceRequest, (request) => request.tenant)
  maintenanceRequests: MaintenanceRequest[];

  @Column("decimal", { precision: 15, scale: 2, default: 0 })
  outstandingBalance: number;

  @Column("decimal", { precision: 15, scale: 2, default: 0 })
  totalPaid: number;

  @Column({ type: "boolean", default: false })
  autoRenewal: boolean; // New: Whether lease auto-renews

  @OneToMany(() => Invoice, (invoice) => invoice.tenant)
  invoices: Invoice[];

  @ManyToOne(() => Lease, (lease) => lease.tenant, { eager: true })
  lease: Lease; // Active lease contract

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date; // New: Soft delete for terminated leases
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Role } from "./role.entity";

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name: string; // E.g., "create_property", "delete_user"

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("refresh_tokens")
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  token: string;

  @Column({ type: "timestamp" })
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";
import { Permission } from "./permission.entity";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  name: string; // E.g., "admin", "agent", "client"

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable() // Linking table between roles and permissions
  permissions: Permission[];
}

