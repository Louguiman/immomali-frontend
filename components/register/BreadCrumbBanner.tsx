import { useTranslations } from "next-intl";
import BreadCrumb from "../common/BreadCrumb";

const BreadCrumbBanner = () => {
  const t = useTranslations("BreadCrumb");

  return (
    <section className="inner_page_breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              {/* Use translation for the breadcrumb title */}
              <BreadCrumb title={t("register")} />
              <h4 className="breadcrumb_title">{t("register")}</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
