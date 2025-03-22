"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

// Définition des classes de badge pour les statuts
const STATUS_COLORS = {
  resolved: "bg-success",
  "in-progress": "bg-warning",
  pending: "bg-danger",
};

const MaintenanceRequestCard = ({ request }) => {
  const t = useTranslations("dashboard.maintenance");
  const pathname = usePathname();
  const imageUrl = request.property?.images?.[0]?.imageUrl;

  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        {/* ✅ Image de la propriété avec fallback */}
        <div
          className="col-md-5 position-relative"
          style={{ minHeight: "200px" }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={request.property.title}
              fill
              className="img-fluid rounded-start object-fit-cover"
            />
          ) : (
            <div className="bg-secondary w-100 h-100 d-flex align-items-center justify-content-center">
              <span className="text-white">{t("noImage")}</span>
            </div>
          )}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          ></div>
        </div>

        {/* ✅ Détails de la demande */}
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{request.title}</h5>
            <p className="card-text">{request.description}</p>
            <p className="card-text">
              <small className="text-muted">
                {t("category")}: {request.category}
              </small>
            </p>
            <p className="card-text">
              <strong>{t("priority")}:</strong> {request.priority}
            </p>
            <p className="card-text">
              <strong>{t("status")}:</strong>{" "}
              <span
                className={`badge ${
                  STATUS_COLORS[request.status] || "bg-secondary"
                }`}
              >
                {t(`Status.${request.status}`)}
              </span>
            </p>
            <Link
              href={`${pathname}/${request.id}`}
              className="btn btn-primary btn-sm"
            >
              {t("viewDetails")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequestCard;
