"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import { cleanUrl } from "@/utils/splitDescription";
import { getSignedUrl } from "@/features/api/Serverside";
import SignedImage from "../common/header/SignedImage";

export default function ListingTwo({ property }) {
  return (
    <section className="single_page_listing_style p0 mt85 md-mt0">
      <div className="container-fluid p0">
        <Gallery>
          <div className="row g-0" key={property?.id}>
            <div className="col-md-6 col-lg-6 ">
              <div className="row g-0">
                <div className="col-lg-12 ">
                  <div className="spls_style_one pr1 1px position-relative">
                    <Item
                      original={getSignedUrl(
                        cleanUrl(property?.images[0]?.imageUrl)
                      )}
                      thumbnail={getSignedUrl(
                        cleanUrl(property?.images[0]?.imageUrl)
                      )}
                      width={752}
                      height={450}
                    >
                      {({ ref, open }) => (
                        <>
                          <div className="single_property_title position-static">
                            <div
                              className="upload_btn popup-img"
                              ref={ref}
                              onClick={open}
                            >
                              <span className="flaticon-photo-camera"></span>{" "}
                              View Photos
                            </div>
                          </div>
                          <SignedImage
                            width={951}
                            height={569}
                            priority
                            className="img-fluid w100 cover lds-2"
                            src={cleanUrl(property?.images[0]?.imageUrl)}
                            alt={cleanUrl(property?.images[0]?.imageUrl)}
                          />
                        </>
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}

            <div className="col-md-6 col-lg-6 position-relative">
              <div className="row g-0 gx-0">
                {property?.images?.map((img, i) => (
                  <div className="col-6 col-lg-6 " key={i}>
                    <div className="spls_style_one">
                      <Item
                        original={getSignedUrl(cleanUrl(img.imageUrl))}
                        thumbnail={getSignedUrl(cleanUrl(img.imageUrl))}
                        width={752}
                        height={450}
                      >
                        {({ ref, open }) => (
                          <div role="button" ref={ref} onClick={open}>
                            <SignedImage
                              width={476}
                              height={285}
                              className="img-fluid w100 cover"
                              src={cleanUrl(img.imageUrl)}
                              alt={cleanUrl(img.imageUrl)}
                            />
                          </div>
                        )}
                      </Item>
                    </div>
                  </div>
                ))}
              </div>
              {/* End .row */}

              <div className="single_property_social_share">
                <div className="spss style2 mt10 text-right tal-400">
                  <ul className="mb0">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-transfer-1"></span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-heart"></span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-share"></span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-printer"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* End .single_property_social_share */}
            </div>
            {/* End .col */}
          </div>
        </Gallery>
      </div>
    </section>
  );
}
