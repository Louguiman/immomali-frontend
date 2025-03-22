"use client";

import { useTranslations } from "next-intl";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../../app/[locale]/(admin)/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import SocialMedia from "./SocialMedia";

const Index = () => {
  const t = useTranslations("dashboard.profile"); // Charge les traductions du namespace "profile"

  return (
    <section className="our-dashbord dashbord bgc-f7 pb50">
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12 maxw100flex-992">
            <div className="row">
              {/* Start Dashboard Navigation */}
              <div className="col-lg-12">
                <div className="dashboard_navigationbar dn db-1024">
                  <div className="dropdown">
                    <button
                      className="dropbtn"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#DashboardOffcanvasMenu"
                      aria-controls="DashboardOffcanvasMenu"
                    >
                      <i className="fa fa-bars pr10"></i>{" "}
                      {t("dashboardNavigation")}
                    </button>
                  </div>
                </div>
              </div>
              {/* End Dashboard Navigation */}

              <div className="col-lg-12 mb10">
                <div className="breadcrumb_content style2">
                  <h2 className="breadcrumb_title">{t("myProfile")}</h2>
                  <p>{t("welcomeMessage")}</p>
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-12">
                <div className="my_dashboard_review">
                  <div className="row">
                    <div className="col-xl-2">
                      <h4>{t("profileInfo")}</h4>
                    </div>
                    <div className="col-xl-10">
                      <ProfileInfo />
                    </div>
                  </div>
                </div>
                {/* End profile info wrapper */}

                <div className="my_dashboard_review mt30">
                  <div className="row">
                    <div className="col-xl-2">
                      <h4>{t("socialMedia")}</h4>
                    </div>
                    <div className="col-xl-10">
                      <SocialMedia />
                    </div>
                  </div>
                </div>
                {/* End .SocialMedia */}

                <div className="my_dashboard_review mt30">
                  <div className="row">
                    <div className="col-xl-2">
                      <h4>{t("changePassword")}</h4>
                    </div>
                    <div className="col-xl-10">
                      <ChangePassword />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="row mt50">
              <div className="col-lg-12">
                <div className="copyright-widget text-center">
                  <p>{t("copyright", { year: new Date().getFullYear() })}</p>
                </div>
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default Index;
