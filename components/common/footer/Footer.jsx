import Link from "next/link";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0">
        <div className="footer_about_widget">
          <h4>{t("aboutSite")}</h4>
          <p>{t("aboutSiteDescription")}</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_qlink_widget">
          <h4>{t("quickLinks")}</h4>
          <ul className="list-unstyled">
            <li>
              <Link href="/">{t("aboutUs")}</Link>
            </li>
            <li>
              <Link href="/">{t("termsConditions")}</Link>
            </li>
            <li>
              <Link href="/">{t("usersGuide")}</Link>
            </li>
            <li>
              <Link href="/">{t("supportCenter")}</Link>
            </li>
            <li>
              <Link href="/">{t("pressInfo")}</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h4>{t("contactUs")}</h4>
          <ul className="list-unstyled">
            <li>
              <a href="mailto:info@findhouse.com">info@findhouse.com</a>
            </li>
            <li>
              <a href="#">{t("address")}</a>
            </li>
            <li>
              <a href="#">{t("addressCityCountry")}</a>
            </li>
            <li>
              <a href="tel:+4733378901">+1 246-345-0699</a>
            </li>
            <li>
              <a href="tel:+4733378901">+1 246-345-0695</a>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_social_widget">
          <h4>{t("followUs")}</h4>
          <ul className="mb30">
            <Social />
          </ul>
          <h4>{t("subscribe")}</h4>
          <SubscribeForm />
        </div>
      </div>
    </>
  );
};

export default Footer;
