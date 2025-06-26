import "photoswipe/dist/photoswipe.css";
import React from "react";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";

function layout({ children }) {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />
      {/* <!--  Mobile Menu --> */}
      <MobileMenu />
      {/* <!-- Modal --> */}
      <PopupSignInUp />
      {children}
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

export default layout;
