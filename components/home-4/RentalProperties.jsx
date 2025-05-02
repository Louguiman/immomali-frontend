"use client";
import { useGetRentalPropertiesQuery } from "@/features/api/properties.api";
import React from "react";
import FeaturedProperties from "./FeaturedProperties";
import { useTranslations } from "next-intl";
import SkeletonSectionLoader from "../common/SkeletonSectionLoader";

function RentalProperties() {
  const t = useTranslations("home");
  const { data: properties, isLoading } = useGetRentalPropertiesQuery();

  if (isLoading) {
    return <SkeletonSectionLoader />;
  }

  return (
    <section id="best-property" className="best-property bgc-f7">
      <div className="container ovh">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="main-title text-center mb40">
              <h2>{t("section.rent.title")}</h2>
              <p>{t("section.rent.description")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          {!properties && isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : properties?.data?.length === 0 ? (
            <div className="text-center">
              <h2>
                No rental properties yet! Please try anothher keywork or
                filters!
              </h2>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="best_property_slider gutter-x15">
                <FeaturedProperties properties={properties?.data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RentalProperties;
