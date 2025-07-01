"use client";

import { useAppSelector } from "@/store/hooks";
import FavouritProducts from "./FavouritProducts";
import Filtering from "./Filtering";
import { Pagination } from "./Pagination";
import SearchBox from "./SearchBox";
import { useTranslations } from "next-intl";
import { setCurrentPage } from "@/features/properties/propertiesSlice";
import { useAppDispatch } from "@/store/store";
import { useMemo, useCallback, useState } from "react";

// Define the shape of a favorite item
interface FavoriteItem {
  id: string | number;
  title?: string;
  description?: string;
  createdAt: string;
  // Add other properties as needed
}

// Define the shape of the Redux state
interface RootState {
  properties: {
    favorites: FavoriteItem[];
    currentPage: number;
    itemsPerPage: number;
  };
}

const FavoritesPage: React.FC = () => {
  const t = useTranslations("dashboard.favourite");
  const dispatch = useAppDispatch();
  
  // Get data from Redux store
  const { 
    favorites, 
    currentPage, 
    itemsPerPage 
  } = useAppSelector((state: import("@/store/store").RootState) => state.properties);

  // Local state for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('featured');

  // Handle page change action
  const handlePageChange = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    dispatch(setCurrentPage(1)); // Reset to first page on new search
  }, [dispatch]);

  // Handle filter change
  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
    dispatch(setCurrentPage(1)); // Reset to first page on filter change
  }, [dispatch]);

  // Filter and paginate favorites
  const { paginatedFavorites, totalFiltered } = useMemo(() => {
    // Apply search filter
    let filtered = [...favorites];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        String(item.title || '').toLowerCase().includes(query) || 
        String(item.description || '').toLowerCase().includes(query)
      );
    }

    // Apply additional filters
    if (filter === 'recent') {
      filtered.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    } else if (filter === 'oldest') {
      filtered.sort((a, b) => 
        new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
      );
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      paginatedFavorites: filtered.slice(startIndex, endIndex),
      totalFiltered: filtered.length
    };
  }, [favorites, currentPage, itemsPerPage, searchQuery, filter]);

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
                        <SearchBox 
                          onSearch={handleSearch}
                          placeholder={t('searchPlaceholder')}
                        />
                      </div>
                    </li>
                    {/* End li */}

                    <li className="list-inline-item">
                      <Filtering 
                        onChange={handleFilterChange}
                        value={filter}
                      />
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
                      favouritesProperties={paginatedFavorites.map(item => item.id)}
                    />

                    <div className="mbp_pagination">
                      <Pagination
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        totalItems={totalFiltered}
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

export default FavoritesPage;
