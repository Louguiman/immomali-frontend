import Link from "next/link";
import Social from "./Social";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
              <a href="mailto:info@ikasow.com">info@ikasow.com</a>
            </li>
            <li>
              <a href="#">{t("address")}</a>
            </li>
            <li>
              <a href="#">{t("addressCityCountry")}</a>
            </li>
            <li>
              <a href="tel:+212655555555">+212655555555</a>
            </li>
            <li>
              <a href="tel:+212655555555">+212655555555</a>
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
          <div className="mt-8 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="p-4 bg-white/90 rounded-xl border border-gray-100 w-full flex justify-center items-center">
                  <Image
                    width={400} 
                    height={400}
                    className="max-w-full h-auto object-contain mx-auto"
                    src="/assets/images/logo/logo-ikasow.webp"
                    alt="Ikasow Logo"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
