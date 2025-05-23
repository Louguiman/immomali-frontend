
import GlobalHeroFilter from "../common/GlobalHeroFilter";
import MobileMenu from "../common/header/MobileMenu";

// import Header from "./Header";
import HeroSlider from "./HeroSlider";
import LookingItem from "./LookingItem";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import PopupSignInUp from "../common/PopupSignInUp";
import TrendingProperties from "./TrendingProperties";
import RentalProperties from "./RentalProperties";
import SaleProperties from "./SaleProperties";
import DiscoverAgents from "./DiscoverAgents";
import DiscoverAgencies from "./DiscoverAgencies";
import CallToAction from "../common/CallToAction";
import Header from "./Header";
import { getTranslations } from "next-intl/server";
import CitiesSection from "./CitiesSection";

const index = async () => {
  const t = await getTranslations("home");

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />
      {/* <Header2 /> */}
      {/* <Header3 /> */}
      {/* <Header4 /> */}

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
                  <h2 className="fz55">{t("banner.title")}</h2>
                  <p className="fz18 color-white">{t("banner.description")}</p>
                </div>
                <GlobalHeroFilter className="home4" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h4 className="text-center color-white fw600 mb25 mb0-520">
                {t("categorySearchHeader")}
              </h4>
              <ul className="home4_iconbox mb0">
                <LookingItem />
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Trending--> */}
      <TrendingProperties />

      {/* <!-- For Rent--> */}
      <RentalProperties />

      {/* <!-- Sale--> */}

      <SaleProperties />

      {/* <!-- Property Cities --> */}
      <section id="property-city" className="property-city pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>{t("section.location.title")}</h2>
                <p>{t("section.location.description")}</p>
              </div>
            </div>
          </div>
          <CitiesSection />
        </div>
      </section>

      {/* <!-- Our Team --> */}
      <DiscoverAgents />

      {/* <!-- Start Call to Action --> */}
      <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section>

      <DiscoverAgencies />

      {/* <!-- Our Team --> */}

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
