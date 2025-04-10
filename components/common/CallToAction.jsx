import { useTranslations } from "next-intl";
import Link from "next/link";

const CallToAction =  () => {
  const t =  useTranslations("home.cta");
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="start_partner tac-smd">
          <h2> {t("title")}</h2>
          <p>{t("description")}</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4">
        <div className="parner_reg_btn text-right tac-smd">
          <Link href="/register" className="btn btn-thm2">
            {t("button")}
          </Link>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CallToAction;
