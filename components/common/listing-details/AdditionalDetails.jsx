import { useTranslations } from "next-intl";

const AdditionalDetails = () => {
  const t = useTranslations("property");

  return (
    <>
      <div className="col-md-6 col-lg-6">
        <ul className="list-inline-item">
          <li>
            <p>
              {t("deposit")} : <span>20%</span>
            </p>
          </li>
          <li>
            <p>
              {t("poolSize")} : <span>300 pieds carrés</span>
            </p>
          </li>
          <li>
            <p>
              {t("additionalRooms")} : <span>{t("guestBath")}</span>
            </p>
          </li>
        </ul>
      </div>
      <div className="col-md-6 col-lg-6">
        <ul className="list-inline-item">
          <li>
            <p>
              {t("lastRemodelYear")} : <span>1987</span>
            </p>
          </li>
          <li>
            <p>
              {t("details.amenities")} : <span>Clubhouse</span>
            </p>
          </li>
          <li>
            <p>
              {t("equipment")} : <span>Grill - Gaz</span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdditionalDetails;
