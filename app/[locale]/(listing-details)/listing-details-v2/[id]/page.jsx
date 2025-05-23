"use client";

import properties from "@/data/properties";
import DetailsContent from "@/components/listing-details-v1/DetailsContent";
import Sidebar from "@/components/listing-details-v1/Sidebar";
import ListingTwo from "@/components/listing-single/ListingTwo";
import { useParams } from "next/navigation";
import { useFetchPropertyByIdQuery } from "@/features/api/properties.api";
import { useDispatch } from "react-redux";
import { addToRecentlyViewed } from "@/features/properties/propertiesSlice";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";

const ListingDynamicDetailsV2 = () => {
  const t = useTranslations("property");
  const format = useFormatter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: property, isLoading, isError } = useFetchPropertyByIdQuery(id);

  useEffect(() => {
    if (!isLoading) dispatch(addToRecentlyViewed(id));
  }, [dispatch, id, isLoading]);

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">{t("propertyNotFound")}</h2>
      </div>
    );
  }

  return (
    <>
      {/* <!-- {t("listingSingleProperty")} --> */}

      <ListingTwo property={property} />

      {/* <!-- {t("agentSingleGridView")} --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="listing_single_description2 mt30-767 mb30-767">
                <div className="single_property_title">
                  <h2>{property?.title}</h2>
                  <p>{t(`categories.${property?.category}`)}</p>
                  <p>
                    {property?.address}
                    <span> {property?.neighborhood},</span>
                    <span> {property?.state},</span>
                    <span> {property?.country}</span>
                  </p>
                </div>
                <div className="single_property_social_share style2 static-title">
                  <div className="price">
                    <h2>
                      {format.number(property.price, {
                        style: "currency",
                        currency: "XOF",
                      })}
                      {property.type === "rent" && (
                        <small>/{t("perMonth")}</small>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              {/* End .listing_single_description2 */}

              <DetailsContent property={property} />
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar agent={property?.owner} propertyId={property.id} />
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
      </section>
    </>
  );
};

export default ListingDynamicDetailsV2;
