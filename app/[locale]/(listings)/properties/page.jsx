"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useSearchPropertiesQuery } from "@/features/api/properties.api";
import PropertyCard from "@/components/PropertyCard";
import GlobalFilter from "@/components/common/GlobalFilter";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Pagination from "@/components/dashboard/my-properties/Pagination";
import SidebarListing from "@/components/common/listing/SidebarListing";
import FilterTopBar from "@/components/common/listing/FilterTopBar";
import ShowFilter from "@/components/common/listing/ShowFilter";
import GridListButton from "@/components/common/listing/GridListButton";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import MobileMenu from "@/components/common/header/MobileMenu";
import BreadCrumb2 from "@/components/listing-grid/grid-v1/BreadCrumb2";
import { getValidParams } from "@/utils/getValidParams";
import FeaturedItem from "@/components/listing-grid/grid-v1/FeaturedItem";
import Header from "@/components/common/header/dashboard/Header";

export default function PropertiesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Local state for pagination & filtering
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [filters, setFilters] = useState({
  //   keyword: searchParams.get("keyword") || "",
  //   location: searchParams.get("location") || "",
  //   type: searchParams.get("type") || "",
  //   category: searchParams.get("category") || "",
  //   minPrice: searchParams.get("minPrice") || "",
  //   maxPrice: searchParams.get("maxPrice") || "",
  // });

  // ✅ Extract only params with values
  const validParams = getValidParams(searchParams);
  const {
    data: properties,
    isLoading,
    refetch,
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
    // setFilters({
    //   keyword: searchParams.get("keyword") || "",
    //   location: searchParams.get("location") || "",
    //   type: searchParams.get("type") || "",
    //   category: searchParams.get("category") || "",
    //   minPrice: searchParams.get("minPrice") || "",
    //   maxPrice: searchParams.get("maxPrice") || "",
    // });
    refetch();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(pathname + "?" + createQueryString("page", newPage));
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <BreadCrumb2 />
            </div>
            {/* End .col */}

            <div className="col-lg-6 position-relative">
              <div className="listing_list_style mb20-xsd tal-991">
                <GridListButton />
              </div>
              {/* End list grid */}

              <div className="dn db-991 mt30 mb0">
                <ShowFilter />
              </div>
              {/* ENd button for mobile sidebar show  */}
            </div>
            {/* End .col filter grid list */}
          </div>
          {/* End Page Breadcrumb and Grid,List and filter Button */}

          <div className="row">
            <div className="col-lg-4 col-xl-4">
              <div className="sidebar-listing-wrapper">
                <SidebarListing />
              </div>
              {/* End SidebarListing */}

              <div
                className="offcanvas offcanvas-start offcanvas-listing-sidebar"
                tabIndex="-1"
                id="sidebarListing"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title">Advanced Search</h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End .offcanvas-heade */}

                <div className="offcanvas-body">
                  <SidebarListing />
                </div>
              </div>
              {/* End mobile sidebar listing  */}
            </div>
            {/* End sidebar conent */}

            <div className="col-md-12 col-lg-8">
              <div className="grid_list_search_result ">
                <div className="row align-items-center">
                  <FilterTopBar />
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                {!properties && isLoading ? (
                  <div className="text-center">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                ) : properties?.data?.length === 0 ? (
                  <div className="text-center">
                    <h2>
                      No search results! Please try anothher keywork or filters!
                    </h2>
                  </div>
                ) : (
                  <FeaturedItem properties={properties?.data} />
                )}
              </div>
              {/* End .row */}

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
                {/* End paginaion .col */}
              </div>
              {/* End .row */}
            </div>
            {/* End  page conent */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
}
