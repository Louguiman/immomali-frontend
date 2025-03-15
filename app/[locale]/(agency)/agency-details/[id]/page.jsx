"use client";

import React, { use } from "react";
import BreadCrumb2 from "@/components/agent-details/BreadCrumb2";
import SidebarListings from "@/components/agency-details/SidebarListings";
import TabDetailsContent from "@/components/agency-details/TabDetailsContent";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";

import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import { useGetAgencyByIdQuery } from "@/features/api/agencies.api";

const AgencyDetailsDynamic = ({ params }) => {
  const { id } = use(params);
  const { data: agency, isLoading, error } = useGetAgencyByIdQuery(id);
  const router = useRouter();

  if (isLoading)
    return <p className="text-center mt-5">Loading agency details...</p>;
  if (error)
    return (
      <p className="text-center mt-5 text-danger">
        Error loading agency details.
      </p>
    );

  // Redirect if agency is not found
  if (!agency) {
    router.push("/404");
    return null;
  }

  return (
    <>
      {/* Header & Mobile Menu */}
      <Header />
      <MobileMenu />
      <PopupSignInUp />

      {/* Agency Details Section */}
      <section className="our-agent-single bgc-f7 pb30-991 mt85 md-mt0">
        <div className="container">
          <div className="row">
            {/* Left Content */}
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <BreadCrumb2 />
                </div>

                <div className="col-lg-12">
                  <div className="feat_property list agency">
                    <div className="thumb">
                      <Image
                        width={265}
                        height={232}
                        className="img-fluid"
                        src={
                          agency?.logoUrl || "/assets/images/default-agency.jpg"
                        }
                        alt={agency?.name}
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item">
                            <a href="#">
                              {agency?.properties?.length || 0} Listings
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="details">
                      <div className="tc_content">
                        <h4>{agency?.name}</h4>
                        <p className="text-thm">
                          {agency?.description || "No description available"}
                        </p>
                        <ul className="prop_details mb0">
                          <li>
                            <a href="#">Office: {agency?.office || "N/A"}</a>
                          </li>
                          <li>
                            <a href="#">
                              Mobile: {agency?.phoneNumber || "N/A"}
                            </a>
                          </li>
                          <li>
                            <a href="#">Website: {agency?.website || "N/A"}</a>
                          </li>
                          <li>
                            <a href={`mailto:${agency?.email}`}>
                              Email: {agency?.email || "N/A"}
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="fp_footer">
                        <ul className="fp_meta float-start mb0">
                          {agency?.socialLinks?.map((social, i) => (
                            <li className="list-inline-item" key={i}>
                              <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className={`fa ${social.icon}`}></i>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="shop_single_tab_content style2 mt30">
                    <TabDetailsContent
                      agency={agency}
                      isLoading={isLoading}
                      error={error}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-lg-4 col-xl-4">
              <SidebarListings agencyId={agency.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default AgencyDetailsDynamic;
