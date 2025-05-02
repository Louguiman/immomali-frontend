import { useTranslations } from "next-intl";
import Image from "next/image";

const SingleUser = ({ isSelected, inquiry, onClick }) => {
  const t = useTranslations("dashboard.message"); // Hook de traduction

  return (
    <li
      className={`contact  ${isSelected ? "active-inquiry" : ""}`}
      onClick={onClick}
    >
      <div className="wrap pl-8  d-flex align-items-center">
        {/* Image de l'utilisateur */}
        <Image
          width={50}
          height={50}
          className="img-fluid rounded-circle"
          src={inquiry?.user?.img || "/assets/images/team/s8.jpg"}
          alt={t("user.image_alt")}
        />
        <div className="meta ml-5">
          {/* Nom */}
          <h5 className="name">
            {/* <span className="flaticon-user pr-2"></span> */}
            {inquiry?.name || t("user.unknown")}
          </h5>

          {/* Email */}
          <h6 className="email">
            {/* <span className="flaticon-mail pr-2"></span> */}
            {inquiry?.email || t("user.unknown")}
          </h6>

          {/* Téléphone */}
          <h6 className="phone">
            {/* <span className="flaticon-phone-call pr-2"></span> */}
            {inquiry?.phoneNumber || t("user.unknown")}
          </h6>

          {/* Aperçu du message */}
          <p className="preview">
            {inquiry?.message?.slice(0, 50) || t("user.no_message")}...
          </p>
        </div>
      </div>
    </li>
  );
};

export default SingleUser;
