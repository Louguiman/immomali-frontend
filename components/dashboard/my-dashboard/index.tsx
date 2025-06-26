import React from 'react';
import Activities from "./Activities";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import UserBanner from "./UserBanner";

const Dashboard: React.FC = () => {
  const offcanvasId = 'dashboard-offcanvas-menu';
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
                      data-bs-target={`#${offcanvasId}`}
                      aria-expanded="false"
                      aria-controls={offcanvasId}
                    >
                      <i className="fa fa-bars pr10"></i> Dashboard Navigation
                    </button>
                  </div>
                </div>
              </div>
              {/* End Dashboard Navigation */}

              {/* userBanner */}
              <UserBanner />
            </div>
            {/* End .row */}

            <div className="row">
              <AllStatistics />
            </div>
            {/* End .row Dashboard top statistics */}

            <div className="row">
              <div className="col-xl-7">
                <div className="application_statics">
                  <StatisticsChart />
                </div>
              </div>
              {/* End statistics chart */}

              <div className="col-xl-5">
                <div className="recent_job_activity">
                  <h4 className="title mb-4">Recent Activities</h4>
                  <Activities />
                </div>
              </div>
            </div>
            {/* End .row  */}

            <div className="row mt50">
              <div className="col-lg-12">
                <div className="copyright-widget text-center">
                  <p>© 2020 Find House. Made with love.</p>
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

export default Dashboard;
