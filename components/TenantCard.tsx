"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useFormatter } from "next-intl";

import type { Tenant } from "@/types/tenant";
import type { Property } from "@/types/property";
import type { User } from "@/types/user";
import type { Lease } from "@/types/lease";
import { LeaseStatus } from "@/types/lease";

// Define property type with optional fields
interface TenantProperty extends Omit<Partial<Omit<Property, 'images'>>, 'id'> {
  id?: string | number;
  images?: Array<{ imageUrl: string }>;
  title?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  price?: number;
}

// Define user type with optional fields
interface TenantUser extends Omit<Partial<User>, 'id'> {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
}

// Define lease type with optional fields
type PartialLease = Omit<Partial<Omit<Lease, 'tenant' | 'id'>>, 'leaseStatus'> & {
  id?: string | number;
  leaseStatus?: LeaseStatus;
  monthlyRent?: number;
  securityDeposit?: number;
  leaseStartDate?: string | Date;
  leaseEndDate?: string | Date;
  autoRenewal?: boolean;
  // Add index signature for additional properties
  [key: string]: unknown;
};

// Extended tenant type for the component
interface ExtendedTenant extends Partial<Omit<Tenant, 'property' | 'user' | 'lease' | 'id'>> {
  id?: string | number;
  property: TenantProperty;
  user: TenantUser;
  lease?: PartialLease;
  outstandingBalance?: number;
  totalPaid?: number;
}

interface TenantCardProps {
  tenant: ExtendedTenant;
  // Action handlers can be added back when needed
  // isUser?: boolean;
  // onRequestMaintenance?: (tenant: ExtendedTenant) => void;
  // onRequestExtension?: (tenant: ExtendedTenant) => void;
  // onRequestTermination?: (tenant: ExtendedTenant) => void;
}

const TenantCard: React.FC<TenantCardProps> = ({
  tenant,
  // Action handlers can be added back when needed
}) => {
  const pathname = usePathname();
  const format = useFormatter();

  const t = useTranslations("dashboard.myTenancies");
  // Get property image (or fallback)
  const propertyImage =
    tenant.property?.images?.[0]?.imageUrl ||
    "/assets/images/default-property.jpg";

  // Format date with proper null/undefined checks
  const formatDate = (dateString?: string | Date | null): string => {
    if (!dateString) return t('not_available');
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? t('invalid_date') : date.toLocaleDateString();
    } catch (e) {
      return t('invalid_date');
    }
  };

  // Format currency with proper null/undefined checks
  const formatCurrency = (amount?: number | null): string => {
    if (typeof amount !== 'number' || isNaN(amount)) return t('not_available');
    try {
      return format.number(amount, {
        style: 'currency',
        currency: 'XOF',
      });
    } catch (error) {
      console.error('Error formatting currency:', error);
      return t('not_available');
    }
  };

  // Get formatted values with fallbacks
  const leaseStart = formatDate(tenant.lease?.leaseStartDate);
  const leaseEnd = formatDate(tenant.lease?.leaseEndDate);
  const monthlyRent = formatCurrency(tenant.lease?.monthlyRent);
  const securityDeposit = formatCurrency(tenant.lease?.securityDeposit);
  const balance = formatCurrency(tenant.outstandingBalance);
  const totalPaid = formatCurrency(tenant.totalPaid);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        {/* Left Side: Property Image with Overlay */}
        <div className="col-md-5 position-relative">
          <Image
            src={propertyImage}
            alt={tenant.property?.title || "Property image"}
            fill
            className="img-fluid rounded-start object-fit-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-40"></div>
          <div className="position-absolute bottom-0 start-0 p-2">
            <Link href={`/listing-details-v2/${tenant.property.id}`}>
              <button className="btn btn-sm btn-light">
                {tenant.property.price !== undefined && !isNaN(tenant.property.price) ? (
                  <>
                    {format.number(tenant.property.price, {
                      style: "currency",
                      currency: "XOF",
                    })}
                    <small>/mo</small>
                  </>
                ) : (
                  <span>{t('price_upon_request')}</span>
                )}
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Tenant & Lease Details */}
        <div className="col-md-7">
          <div className="card-body">
            <div className="row">
              {/* Left Column: Tenant & Property Details */}
              <div className="col-md-6">
                <h5 className="card-title">
                  <Link href={`/listing-details-V2/${tenant.property.id}`}>
                    {tenant.property.title}
                  </Link>
                </h5>
                {tenant.property.address && (
                  <p>
                    <span className="flaticon-placeholder"></span>
                    {[tenant.property.address, 
                      tenant.property.neighborhood, 
                      tenant.property.city, 
                      tenant.property.state, 
                      tenant.property.country]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
                <p>
                  <strong>{t("tenant")}:</strong> {tenant.user?.name || t('not_available')}
                </p>
                <p>
                  <strong>{t("email")}:</strong> {tenant.user?.email || t('not_available')}
                </p>
                <p>
                  <strong>{t("phone")}:</strong> {tenant.user?.phone || t('not_available')}
                </p>
                <p>
                  <strong>{t("lease_period")}:</strong> {leaseStart} -{" "}
                  {leaseEnd}
                </p>
              </div>

              {/* Right Column: Lease & Financial Details */}
              <div className="col-md-6">
                <p>
                  <strong>{t("monthly_rent")}:</strong> {monthlyRent}
                </p>
                <p>
                  <strong>{t("security_deposit")}:</strong> {securityDeposit}
                </p>
                <p>
                  <strong>{t("auto_renewal")}:</strong>{' '}
                  {tenant.lease?.autoRenewal ? t('yes') : t('no')}
                </p>
                <p>
                  <strong>{t("balance")}:</strong> {balance}
                </p>
                <p>
                  <strong>{t("total_paid")}:</strong> {totalPaid}
                </p>
                <p>
                  <strong>{t("status")}:</strong>{" "}
                  {tenant.lease?.leaseStatus === LeaseStatus.ACTIVE && (
                    <span className="badge bg-success">{t('active')}</span>
                  )}
                  {tenant.lease?.leaseStatus === LeaseStatus.PENDING && (
                    <span className="badge bg-warning">{t('pending')}</span>
                  )}
                  {tenant.lease?.leaseStatus === LeaseStatus.TERMINATED && (
                    <span className="badge bg-danger">{t('terminated')}</span>
                  )}
                  {tenant.lease?.leaseStatus === LeaseStatus.EXPIRED && (
                    <span className="badge bg-secondary">{t('expired')}</span>
                  )}
                  {!tenant.lease?.leaseStatus && (
                    <span className="badge bg-secondary">{t('not_available')}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex align-items-end justify-content-between mt-3">
              <Link
                href={`${pathname}/${tenant.id}`}
                className="btn btn-sm btn-primary"
              >
                {t("view")}
              </Link>
              <Link
                href={`${pathname}/${tenant.id}/edit`}
                className="btn btn-sm btn-warning"
              >
                {t("edit")}
              </Link>
              <Link
                href={`${pathname}/${tenant.id}/manage-lease`}
                className="btn btn-sm btn-dark"
              >
                {t("manage_lease")}
              </Link>
              {/* Action buttons can be added back when needed */}
              {/* {isUser && onRequestMaintenance && (
                <button
                  onClick={() => onRequestMaintenance(tenant)}
                  className="btn btn-sm btn-secondary"
                >
                  {t("send_request")}
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;
