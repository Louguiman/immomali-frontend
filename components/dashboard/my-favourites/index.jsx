"use client";

import { useAppSelector } from "@/store/hooks";
import FavouritProducts from "./FavouritProducts";
import Filtering from "./Filtering";
import { Pagination } from "./Pagination";
import SearchBox from "./SearchBox";
import { useTranslations } from "next-intl";
import { setCurrentPage } from "@/features/properties/propertiesSlice";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

const Index = () => {
  const t = useTranslations("dashboard.favourite");
  const dispatch = useDispatch();
  const { favorites, currentPage, itemsPerPage } = useAppSelector(
    (state) => state.properties
  );

  // Handle page change action
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const paginatedFavorites = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return favorites.slice(startIndex, endIndex);
  }, [currentPage, favorites, itemsPerPage]);

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
                  <h2 className="breadcrumb_title">{t("myFavorites")}</h2>
                  <p>{t("welcomeBack")}</p>
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-8 col-xl-8">
                <div className="candidate_revew_select style2 text-end mb30-991">
                  <ul className="mb0">
                    <li className="list-inline-item">
                      <div className="candidate_revew_search_box course fn-520">
                        <SearchBox />
                      </div>
                    </li>
                    {/* End li */}

                    <li className="list-inline-item">
                      <Filtering />
                    </li>
                    {/* End li */}
                  </ul>
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-12">
                <div className="my_dashboard_review mb40">
                  <div className="favorite_item_list">
                    <FavouritProducts
                      favouritesProperties={paginatedFavorites}
                    />

                    <div className="mbp_pagination">
                      <Pagination
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        totalItems={favorites.length}
                        itemsPerPage={itemsPerPage}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col */}
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
