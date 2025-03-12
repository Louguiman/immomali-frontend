import { fetchProperties } from "@/features/api/Serverside";
import React from "react";
import FeaturedProperties from "./FeaturedProperties";
import { getTranslations } from "next-intl/server";

async function TrendingProperties() {
  const t = await getTranslations("home.section");
  const { data: properties } = await fetchProperties();

  return (
    <section id="best-property" className="best-property bgc-f7">
      <div className="container ovh">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="main-title text-center mb40">
              <h2>{t("trending.title")}</h2>
              <p>{t("trending.description")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="best_property_slider gutter-x15">
              <FeaturedProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendingProperties;
