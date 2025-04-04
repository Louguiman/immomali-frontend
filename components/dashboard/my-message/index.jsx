"use client";
import { useTranslations } from "next-intl";
import ChatBox from "./ChatBox";

const Index = () => {
  const t  = useTranslations("dashboard.message"); // Hook pour gérer les traductions

  return (
    <section className="our-dashbord dashbord bgc-f7 pb50">
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12 maxw100flex-992">
            <div className="row">
              {/* Début de la navigation du dashboard */}
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
                      {t("dashboard.navigation")}
                    </button>
                  </div>
                </div>
              </div>
              {/* Fin de la navigation du dashboard */}

              <div className="col-lg-12 mb10">
                <div className="breadcrumb_content style2">
                  <h2 className="breadcrumb_title">{t("message.title")}</h2>
                  <p>{t("message.welcome_back")}</p>
                </div>
              </div>
            </div>
            {/* Fin .row */}

            <ChatBox />
            {/* Boîte de discussion */}

            <div className="row mt50">
              <div className="col-lg-12">
                <div className="copyright-widget text-center">
                  <p>
                    © {new Date().getFullYear()} Find House.{" "}
                    {t("footer.made_with_love")}
                  </p>
                </div>
              </div>
            </div>
            {/* Fin .row */}
          </div>
          {/* Fin .col */}
        </div>
      </div>
    </section>
  );
};

export default Index;
