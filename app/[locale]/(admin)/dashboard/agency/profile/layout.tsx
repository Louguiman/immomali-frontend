import React from "react";

function layout({ children }) {
  return (
    <section className="our-dashbord dashbord bgc-f7 pb50">
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12 maxw100flex-992"></div>
          {/* End .col */}
          <div className="col-lg-12 mb10">
            <div className="breadcrumb_content style2">
              <h2 className="breadcrumb_title">Agency Profile</h2>
            </div>
          </div>
          {/* End .col */}
          <div className="col-lg-12">
            <div className="my_dashboard_review mt30">
              <div className="row">
                <div className="col-xl-2">
                  <h4>Agency Profile</h4>
                </div>
                <div className="col-xl-10">
                  <p>Agency Profile Content</p>
                </div>
              </div>
            </div>
          </div>
          {children}
          {/* End .col */}
        </div>
      </div>
    </section>
  );
}

export default layout;
