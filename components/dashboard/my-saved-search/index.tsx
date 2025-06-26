import { FC } from 'react';
import { useTranslations } from 'next-intl';
import SearchData from "./SearchData";
import SearchBox from "./SearchBox";

/**
 * SavedSearches component displays the user's saved property searches
 */
const SavedSearches: FC = () => {
  const t = useTranslations('dashboard.savedSearches');
  const commonT = useTranslations('common');
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
                      type="button"
                      className="dropbtn"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#DashboardOffcanvasMenu"
                      aria-label="Toggle dashboard navigation"
                      aria-expanded="false"
                      aria-controls="dashboard-offcanvas"
                    >
                      <i className="fa fa-bars pr10" aria-hidden="true"></i>
                      <span>Dashboard Navigation</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* End Dashboard Navigation */}
            </div>
            {/* End .row */}

            <div className="row align-items-center">
              <div className="col-md-8 col-lg-8 col-xl-9 mb20">
                <div className="breadcrumb_content style2 mb30-991">
                  <h1 className="breadcrumb_title">{t('pageTitle')}</h1>
                  <p>{t('welcomeMessage')}</p>
                </div>
              </div>
              {/* End .col */}
              <div className="col-md-4 col-lg-4 col-xl-3 mb20">
                <ul className="sasw_list mb0">
                  <li className="search_area">
                    <SearchBox />
                  </li>
                </ul>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}

            <div className="row">
              <div className="col-lg-12">
                <div className="my_dashboard_review mb40">
                  <div className="col-lg-12">
                    <div className="savesearched_table">
                      <div className="table-responsive mt0">
                        <SearchData />
                      </div>
                    </div>
                    {/* End .packages_table */}
                  </div>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="row mt50">
              <div className="col-lg-12">
                <div className="copyright-widget text-center">
                  <p>{commonT('copyright', { year: new Date().getFullYear() })}</p>
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

export default SavedSearches;
