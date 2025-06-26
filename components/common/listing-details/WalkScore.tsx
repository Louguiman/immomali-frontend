import Image from "next/image";
import { useTranslations } from "next-intl";

const WalkScore = () => {
  const t = useTranslations("property.WalkScore");

  return (
    <>
      <h4 className="mb30">
        {t("walkscore")}{" "}
        <span className="float-end">
          <Image
            width={117}
            height={19}
            src="/assets/images/resource/wscore.png"
            alt="walkscore"
          />
        </span>
      </h4>
      <div className="iba_container">
        <div className="icon_box_area">
          <div className="score">
            <span>70</span>
          </div>
          <div className="details">
            <h5>{t("walkScore")}</h5>
            <p>{t("walkDesc")}</p>
          </div>
        </div>
        <div className="icon_box_area">
          <div className="score">
            <span>40</span>
          </div>
          <div className="details">
            <h5>{t("bikeScore")}</h5>
            <p>{t("bikeDesc")}</p>
          </div>
        </div>
      </div>
      <a className="more_info" href="#">
        {t("moreDetails")}
      </a>
    </>
  );
};

export default WalkScore;
