"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useFormatter } from "next-intl";

const TenantCard = ({
  tenant,
  isUser = false,
  onRequestMaintenance = null,
  onRequestExtension = null,
  onRequestTermination = null,
}) => {
  const pathname = usePathname();
  const format = useFormatter();

  const t = useTranslations("dashboard.myTenancies");
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
                {format.number(tenant.property.price, {
                  style: "currency",
                  currency: "XOF",
                })}
                <small>/mo</small>
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
                <p className="text-muted">
                  {tenant.property.address}
                  {tenant.property?.neighborhood},{tenant.property?.city}{" "}
                  {tenant.property?.state}, {tenant.property?.country}
                </p>
                <p></p>
                <p>
                  <strong>{t("tenant")}:</strong> {tenant.user.name}
                </p>
                <p>
                  <strong>{t("email")}:</strong> {tenant.user.email}
                </p>
                <p>
                  <strong>{t("phone")}:</strong> {tenant.user.phone}
                </p>
                <p>
                  <strong>{t("lease_period")}:</strong> {leaseStart} -{" "}
                  {leaseEnd}
                </p>
              </div>

              {/* Right Column: Lease & Financial Details */}
              <div className="col-md-6">
                <p>
                  <strong>{t("rent")}:</strong>{" "}
                  {format.number(tenant?.lease?.monthlyRent, {
                    style: "currency",
                    currency: "XOF",
                  })}
                </p>
                <p>
                  <strong>{t("deposit")}:</strong>{" "}
                  {format.number(tenant?.lease?.securityDeposit, {
                    style: "currency",
                    currency: "XOF",
                  })}
                </p>
                <p>
                  <strong>{t("auto_renewal")}:</strong>{" "}
                  {tenant?.lease?.autoRenewal ? t("enabled") : t("disabled")}
                </p>
                <p>
                  <strong>{t("balance")}:</strong>{" "}
                  {format.number(tenant.outstandingBalance, {
                    style: "currency",
                    currency: "XOF",
                  })}
                </p>
                <p>
                  <strong>{t("status")}:</strong>{" "}
                  <span
                    className={`badge ${
                      tenant?.lease?.leaseStatus === "active"
                        ? "bg-success"
                        : tenant?.lease?.leaseStatus === "terminated"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {t(`status_${tenant?.lease?.leaseStatus}`)}
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
                {t("view")}
              </Link>
              {!isUser && (
                <Link
                  href={`${pathname}/${tenant.id}/edit`}
                  className="btn btn-sm btn-warning"
                >
                  {t("edit")}
                </Link>
              )}
              {!isUser && (
                <Link
                  href={`${pathname}/${tenant.id}/manage-lease`}
                  className="btn btn-sm btn-dark"
                >
                  {t("manage_lease")}
                </Link>
              )}
              {isUser && (
                <button
                  onClick={() => onRequestMaintenance(tenant)}
                  className="btn btn-sm btn-secondary"
                >
                  {t("send_request")}
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
