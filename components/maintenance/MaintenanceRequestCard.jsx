"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MaintenanceRequestCard = ({ request }) => {
  const pathname = usePathname();

  // Assume request has tenant, property, and status information
  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        {/* Left Side: Property Image as Background */}
        <div
          className="col-md-5 position-relative"
          style={{ minHeight: "200px" }}
        >
          {request.property?.images && request.property.images[0]?.imageUrl ? (
            <Image
              src={request.property.images[0].imageUrl}
              alt={request.property.title}
              fill
              className="img-fluid rounded-start object-fit-cover"
            />
          ) : (
            <div className="bg-secondary w-100 h-100"></div>
          )}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          ></div>
        </div>
        {/* Right Side: Request Details */}
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{request.title}</h5>
            <p className="card-text">{request.description}</p>
            <p className="card-text">
              <small className="text-muted">Category: {request.category}</small>
            </p>
            <p className="card-text">
              <strong>Priority:</strong> {request.priority}
            </p>
            <p className="card-text">
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  request.status === "resolved"
                    ? "bg-success"
                    : request.status === "in-progress"
                    ? "bg-warning"
                    : "bg-danger"
                }`}
              >
                {request.status.toUpperCase()}
              </span>
            </p>
            <Link
              href={`${pathname}/maintenance-requests/${request.id}`}
              className="btn btn-primary btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequestCard;
