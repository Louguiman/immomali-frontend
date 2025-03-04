import React from "react";

function layout({ children }) {
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
                      <i className="fa fa-bars pr10"></i> Dashboard Navigation
                    </button>
                  </div>
                </div>
              </div>
              {/* End Dashboard Navigation */}

              {/* Breadcrumb and Greeting */}
              <div className="col-lg-4 col-xl-4 mb10">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">My Properties</h2>
                  <p>We are glad to see you again!</p>
                </div>
              </div>

              {children}
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
}

export default layout;
