"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import FavoriteButton from "../common/FavoriteBtn";
import type { Property } from "@/types/property";
import type { PropertyImage } from "@/types/property-image";

export default function ListingOne({ property }: { property: Property }) {
  return (
    <section className="listing-title-area mt85 md-mt0">
      <div className="container">
        <Gallery>
          <div className="row mb30">
            <div className="col-lg-7 col-xl-8">
              <div className="single_property_title mt30-767">
                <h2>{property?.title}</h2>
                <h6>{property?.address}</h6>

                <span> {property?.neighborhood},</span>
                <h6> {property?.city},</h6>
                <h6> {property?.state},</h6>
                <h6> {property?.country}</h6>
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              <div className="single_property_social_share position-static transform-none">
                <div className="price float-start fn-400">
                  <h2>
                    ${property?.price}
                    <small>/mo</small>
                  </h2>
                </div>

                <div className="spss style2 mt20 text-end tal-400">
                  <ul className="mb0">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-transfer-1"></span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <FavoriteButton propertyId={property.id} />
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
                {/* End activity and social sharing */}
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-sm-7 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <div className="spls_style_two mb30-520">
                    {property.images && property.images.length > 0 && (
                      <Item
                        original={property.images[0]?.imageUrl}
                        thumbnail={property.images[0]?.imageUrl}
                        width={752}
                        height={450}
                      >
                        {({
                          ref,
                          open,
                        }: {
                          ref: React.Ref<HTMLDivElement>;
                          open: (
                            e: React.MouseEvent<Element, MouseEvent>
                          ) => void;
                        }) => (
                          <div role="button" ref={ref} onClick={open}>
                            <Image
                              width={752}
                              height={450}
                              className="img-fluid w100 cover lds-1"
                              src={property.images[0]?.imageUrl || ""}
                              alt={property.title}
                            />
                          </div>
                        )}
                      </Item>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* End .col-sm-7 .col-lg-8 */}

            <div className="col-sm-5 col-lg-4">
              <div className="row">
                {property.images
                  ?.slice(1)
                  .map((img: PropertyImage, i: number) => (
                    <div className="col-6" key={img.id || i}>
                      <div className="spls_style_two img-gallery-box mb24">
                        <Item
                          original={img.imageUrl}
                          thumbnail={img.imageUrl}
                          width={752}
                          height={450}
                        >
                          {({
                            ref,
                            open,
                          }: {
                            ref: React.Ref<HTMLDivElement>;
                            open: (
                              e: React.MouseEvent<Element, MouseEvent>
                            ) => void;
                          }) => (
                            <div role="button" ref={ref} onClick={open}>
                              <Image
                                width={170}
                                height={133}
                                className="img-fluid w100 cover"
                                src={img.imageUrl}
                                alt={property.title}
                              />
                            </div>
                          )}
                        </Item>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* End  col-sm-5 col-lg-4 */}
          </div>
          {/* End .row */}
        </Gallery>
      </div>
    </section>
  );
}
