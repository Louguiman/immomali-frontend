import { useTranslations } from "next-intl";
import Image from "next/image";

const PropertyLocation = ({ latitude, longitude }) => {
  const t = useTranslations("property");

  if (!latitude || !longitude) {
    return (
      <div className="alert alert-danger">{t("errors.locationUnvailable")}</div>
    );
  }
  if (isNaN(latitude) || isNaN(longitude)) {
    return <div className="alert alert-danger">Invalid coordinates</div>;
  }
  if (latitude === 0 && longitude === 0) {
    return <div className="alert alert-danger">Coordinates are zero</div>;
  }
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return <div className="alert alert-danger">Coordinates out of range</div>;
  }
  if (latitude === null || longitude === null) {
    return <div className="alert alert-danger">Coordinates are null</div>;
  }
  if (latitude === undefined || longitude === undefined) {
    return <div className="alert alert-danger">Coordinates are undefined</div>;
  }
  if (latitude === "" || longitude === "") {
    return <div className="alert alert-danger">Coordinates are empty</div>;
  }

  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div className="thumb">
      <div className="h400" id="map-canvas">
        <div className="gmap_canvas">
          <iframe
            title="map"
            className="gmap_iframe"
            src={mapUrl}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className="overlay_icon">
        <a href="#">
          <Image
            width={40}
            height={45}
            className="map_img_icon"
            src="/assets/images/header-logo.png"
            alt="header-logo.png"
          />
        </a>
      </div>
    </div>
  );
};

export default PropertyLocation;
