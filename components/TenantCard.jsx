"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";

const TenantCard = ({
  tenant,
  isUser = false,
  onRequestMaintenance = null,
  onRequestExtension = null,
  onRequestTermination = null,
}) => {
  const pathname = usePathname();

  // Get property image (or fallback)
  const propertyImage =
    tenant.property?.images?.[0]?.imageUrl ||
    "/assets/images/default-property.jpg";

  // Format lease dates
  const leaseStart = new Date(
    tenant?.lease?.leaseStartDate
  ).toLocaleDateString();
  const leaseEnd = new Date(tenant?.lease?.leaseEndDate).toLocaleDateString();

  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        {/* Left Side: Property Image with Overlay */}
        <div className="col-md-5 position-relative">
          <Image
            src={propertyImage}
            alt={tenant.property.title}
            fill
            className="img-fluid rounded-start object-fit-cover"
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          ></div>
          <div className="position-absolute bottom-0 start-0 p-2">
            <Link href={`/listing-details-v2/${tenant.property.id}`}>
              <button className="btn btn-sm btn-light">
                {tenant.property.price} FCFA <small>/mo</small>
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
                  <Link href={`/properties/${tenant.property.id}`}>
                    {tenant.property.title}
                  </Link>
                </h5>
                <p className="text-muted">
                  {tenant.property.address}
                  {tenant.property?.neighborhood},{tenant.property?.city}{" "}
                  {tenant.property?.state}, {tenant.property?.country}
                </p>
                <p></p>
                <p>
                  <strong>Tenant:</strong> {tenant.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {tenant.user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {tenant.user.phone}
                </p>
                <p>
                  <strong>Lease Period:</strong> {leaseStart} - {leaseEnd}
                </p>
              </div>

              {/* Right Column: Lease & Financial Details */}
              <div className="col-md-6">
                <p>
                  <strong>Rent:</strong> {tenant?.lease?.monthlyRent} FCFA
                </p>
                <p>
                  <strong>Deposit:</strong> {tenant?.lease?.securityDeposit}{" "}
                  FCFA
                </p>
                <p>
                  <strong>Auto-Renewal:</strong>{" "}
                  {tenant?.lease?.autoRenewal ? "Enabled" : "Disabled"}
                </p>
                <p>
                  <strong>Balance:</strong> {tenant.outstandingBalance} FCFA
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      tenant?.lease?.leaseStatus === "active"
                        ? "bg-success"
                        : tenant?.lease?.leaseStatus === "terminated"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {tenant?.lease?.leaseStatus.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex align-items-end justify-content-between mt-3">
              <Link
                href={`${pathname}/${tenant.id}`}
                className="btn btn-sm btn-primary"
              >
                View
              </Link>
              {!isUser && (
                <Link
                  href={`${pathname}/${tenant.id}/edit`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </Link>
              )}
              {!isUser && (
                <Link
                  href={`${pathname}/${tenant.id}/manage-lease`}
                  className="btn btn-sm btn-dark"
                >
                  Manage Lease
                </Link>
              )}
              {isUser && (
                <button
                  onClick={() => onRequestMaintenance(tenant)}
                  className="btn btn-sm btn-secondary"
                >
                  Send in a Request
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;
