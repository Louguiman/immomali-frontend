"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useSearchPropertiesQuery } from "@/features/api/properties.api";
import Pagination from "@/components/dashboard/my-properties/Pagination";
import SidebarListing from "@/components/common/listing/SidebarListing";
import FilterTopBar from "@/components/common/listing/FilterTopBar";
import ShowFilter from "@/components/common/listing/ShowFilter";
import GridListButton from "@/components/common/listing/GridListButton";

import BreadCrumb2 from "@/components/listing-grid/grid-v1/BreadCrumb2";
import { getValidParams } from "@/utils/getValidParams";
import FeaturedItem from "@/components/listing-grid/grid-v1/FeaturedItem";
import { useTranslations } from "next-intl";

export default function PropertiesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("property"); // Hook pour récupérer les traductions

  // Local state for pagination & filtering
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // ✅ Extract only params with values
  const validParams = getValidParams(searchParams);
  const {
    data: properties,
    isLoading,
    refetch,
    isError,
    error,
  } = useSearchPropertiesQuery(validParams);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(pathname + "?" + createQueryString("page", newPage));
  };

  if (isError) {
    console.log("Error fetching properties:", error);
    return <div>{error?.data?.message}</div>; // Display an error message
  }
  // if (isLoading) {
  //   return <div>{t("Loading")}</div>; // Display a loading message
  // }
  if (!properties) {
    return <div>{t("No search results")}</div>; // Display a message when no data is available
  }

  {
    /* <!-- Listing Grid View --> */
  }
  return (
    <section className="our-listing bgc-f7 pb30-991 mt0 md-mt0">
      <div className="container">
        <div className="row">
          <div className="col-lg-6"></div>

          <div className="col-lg-6 position-relative">
            <div className="listing_list_style mb20-xsd tal-991">
              <GridListButton />
            </div>

            <div className="dn db-991 mt30 mb0">
              <ShowFilter />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-xl-4">
            <div className="sidebar-listing-wrapper">
              <SidebarListing />
            </div>

            <div
              className="offcanvas offcanvas-start offcanvas-listing-sidebar"
              tabIndex="-1"
              id="sidebarListing"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title">{t("Advanced Search")}</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>

              <div className="offcanvas-body">
                <SidebarListing />
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-8">
            <div className="grid_list_search_result ">
              <div className="row align-items-center">
                <FilterTopBar />
              </div>
            </div>

            <div className="row">
              {!properties && isLoading ? (
                <div className="text-center">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                  <p>{t("Loading")}</p>
                </div>
              ) : properties?.data?.length === 0 ? (
                <div className="text-center">
                  <h2>{t("No search results")}</h2>
                </div>
              ) : (
                <FeaturedItem properties={properties?.data} />
              )}
            </div>

            <div className="row">
              <div className="col-lg-12 mt20">
                <div className="mbp_pagination">
                  <Pagination
                    currentPage={page}
                    onPageChange={handlePageChange}
                    totalPages={properties?.totalPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
