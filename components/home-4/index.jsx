import Blogs from "../common/Blogs";
import GlobalHeroFilter from "../common/GlobalHeroFilter";
import MobileMenu from "../common/header/MobileMenu";
import FeaturedProperties from "./FeaturedProperties";
import FindProperties from "./FindProperties";
import Header from "./Header";
import HeroSlider from "./HeroSlider";
import LookingItem from "./LookingItem";
import Team from "./Team";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumb from "../common/BreadCrumb";
import GridListButton from "../common/listing/GridListButton";
import ShowFilter from "../common/listing/ShowFilter";
import FilterTopBar from "../common/listing/FilterTopBar";
import FeaturedItem from "../listing-grid/grid-v1/FeaturedItem";
import Pagination from "../blog-details/Pagination";
import SidebarListing3 from "../common/listing/SidebarListing3";

const fetchProperties = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters, // Spread filters into query
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/properties?${queryParams}`,
    {
      cache: "no-store", // Ensure fresh data every request
    }
  );

  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};

const index = async ({ searchParams }) => {
  const page = searchParams?.page || 1;
  const limit = searchParams?.limit || 10;
  const filters = searchParams || {};

  const { data: properties } = await fetchProperties(page, limit, filters);

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- 4th Home Slider --> */}
      <div className="home-four ">
        <div className="container-fluid p0">
          <div className="main-banner-wrapper">
            <div className="arrow-style-2 banner-style-one ">
              <HeroSlider />
            </div>
          </div>
          {/* <!-- /.main-banner-wrapper --> */}
        </div>
        {/* End .container-fluid */}

        <div className="container home_iconbox_container">
          <div className="row posr">
            <div className="col-lg-12">
              <div className="home_content home4">
                <div className="home-text text-center">
                  <h2 className="fz55">Find Your Dream Home</h2>
                  <p className="fz18 color-white">
                    From as low as $10 per day with limited time offer
                    discounts.
                  </p>
                </div>
                <GlobalHeroFilter className="home4" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h4 className="text-center color-white fw600 mb25 mb0-520">
                What are you looking for?
              </h4>
              <ul className="home4_iconbox mb0">
                <LookingItem />
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">{/* <BreadCrumb /> */}</div>
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
            <div className="col-md-12 col-lg-8">
              <div className="grid_list_search_result ">
                <div className="row align-items-center">
                  <FilterTopBar />
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <FeaturedItem initialData={properties} />
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination />
                  </div>
                </div>
                {/* End paginaion .col */}
              </div>
              {/* End .row */}
            </div>
            {/* End  .col */}

            <div className="col-lg-4 col-xl-4">
              <div className="sidebar-listing-wrapper">
                <SidebarListing3 />
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
                  <SidebarListing3 />
                </div>
              </div>
              {/* End mobile sidebar listing  */}
            </div>
            {/* End sidebar conent */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Property Cities --> */}
      <section id="best-property" className="best-property bgc-f7">
        <div className="container ovh">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>Featured Properties</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="best_property_slider gutter-x15">
                <FeaturedProperties />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Property Cities --> */}
      <section id="property-city" className="property-city pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Find Properties in These Cities</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <FindProperties />
          </div>
        </div>
      </section>

      {/* <!-- Our Blog --> */}
      {/* <section className="our-blog bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Articles & Tips</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Blogs />
          </div>
        </div>
      </section> */}

      {/* <!-- Our Team --> */}
      {/* <section className="our-team">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Our Team</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="team_slider gutter-x15">
                <Team />
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
};

export default index;
