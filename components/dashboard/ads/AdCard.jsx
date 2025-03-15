import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";

const AdCard = ({ ad, onManage }) => {
  const pathname = usePathname();
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card shadow-sm">
        <div className="position-relative">
          <Image
            src={ad.property.images[0]?.imageUrl}
            alt={ad.property.title}
            width={350}
            height={200}
            className="card-img-top"
          />
          <div className="position-absolute top-0 start-0 bg-dark text-light px-2 py-1">
            {ad.adType.toUpperCase()}
          </div>
        </div>

        <div className="card-body">
          <h5 className="card-title">{ad.property.title}</h5>
          <p className="card-text">Owner: {ad.owner.name}</p>
          <p
            className={`badge bg-${
              ad.status === "active"
                ? "success"
                : ad.status === "pending"
                ? "warning"
                : "danger"
            }`}
          >
            {ad.status}
          </p>
          <p>
            Views: {ad.views} | Clicks: {ad.clicks}
          </p>
          <button className="btn btn-primary btn-sm" onClick={onManage}>
            Manage
          </button>
          <Link
            href={`${pathname}/${ad.id}`}
            className="btn btn-info btn-sm ms-2"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
