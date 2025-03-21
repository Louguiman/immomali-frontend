// components/Layout.js
import React from "react";
import { useTranslations } from "next-intl";

function Layout({ children }) {
  const t = useTranslations("dashboard.invoiceList");

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

              <div className="col-lg-4 col-xl-4 mb10">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">{t("myInvoices")}</h2>
                  <p>{t("manageInvoices")}</p>
                </div>
              </div>
              {/* End .col */}

              {children}
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
}

export default Layout;
