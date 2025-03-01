"use client";

import Image from "next/image";
import Link from "next/link";
// import { Tenant } from "@/types"; // adjust import to your tenant type

// interface TenantCardProps {
//   tenant: Tenant;
// }

const TenantCard = ({ tenant }) => {
  const isGridOrList = false;
  // Get the property image (fallback if not available)
  const propertyImage =
    tenant.property?.images && tenant.property.images.length > 0
      ? tenant.property.images[0].imageUrl
      : "/assets/images/default-property.jpg";

  // Format lease dates (assuming leaseStartDate and leaseEndDate are strings)
  const leaseStart = new Date(
    tenant?.lease?.leaseStartDate
  ).toLocaleDateString();
  const leaseEnd = new Date(tenant?.lease?.leaseEndDate).toLocaleDateString();

  return (
    <Link
      href={`tenants/${tenant?.id}`}
      className={`feat_property home7 style4 card shadow-sm ${
        isGridOrList ? "d-flex align-items-center" : undefined
      }`}
    >
      {/* Left Side: Property Image */}
      <div className="thumb" style={{ minHeight: "220px" }}>
        <Image
          src={propertyImage}
          alt={tenant.property.title}
          fill
          className="img-fluid rounded-start object-fit-cover img-whp w-100 h-100 cover"
        />
        <div className="thmb_cntnt">
          <ul className="tag mb0">
            <li className="list-inline-item">
              <a href="#">{tenant.property.title}</a>
            </li>
            {/* <li className="list-inline-item">
              <a href="#" className="text-capitalize">
                {item?.featured}
              </a>
            </li> */}
          </ul>
          <ul className="icon mb0">
            <li className="list-inline-item">
              <a href="#">
                <span className="flaticon-transfer-1"></span>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <span className="flaticon-heart"></span>
              </a>
            </li>
          </ul>

          <Link
            href={`/listing-details-v2/${tenant.property.id}`}
            className="fp_price"
          >
            {tenant.property.price} FCFA
            <small>/mo</small>
          </Link>
        </div>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        ></div>
      </div>
      {/* Right Side: Tenant & Lease Details */}
      <div className="col-md-7">
        <div className="card-body">
          {/* Property Title */}
          <h5 className="card-title">
            <Link href={`/properties/${tenant.property.id}`}>
              {tenant.property.title}
            </Link>
          </h5>
          {/* Tenant Info */}
          <p className="card-text mb-1">
            <strong>Tenant:</strong> {tenant.user.name}
          </p>{" "}
          <p className="card-text mb-1">
            <strong>Tenant email:</strong> {tenant.user.email}
          </p>
          <p className="card-text mb-1">
            <strong>Tenant Phone:</strong> {tenant.user.phone}
          </p>
          <p className="card-text mb-1">
            <strong>Lease Period:</strong> {leaseStart} - {leaseEnd}
          </p>
          <p className="card-text mb-1">
            <strong>Monthly Rent:</strong> {tenant?.lease?.monthlyRent} FCFA
          </p>
          <p className="card-text mb-1">
            <strong>Outstanding Balance:</strong> {tenant.outstandingBalance}{" "}
            FCFA
          </p>
          <p className="card-text">
            <strong>Lease Status:</strong>{" "}
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
    </Link>
  );
};

export default TenantCard;
