"use client";
import React from "react";
import { useGetAllAgenciesQuery } from "@/features/api/agencies.api";
import AgenciesAsTeam from "./AgenciesAsTeam";
import { useTranslations } from "next-intl";

function DiscoverAgencies() {
  const t = useTranslations("home.section");

  const { data, isLoading, isError } = useGetAllAgenciesQuery();
  console.log("agencies: ", data);

  return (
    <section className="our-team">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="main-title text-center">
              <h2>{t("agency.title")}</h2>
              <p>{t("agency.description")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          {!data && isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : data?.length === 0 ? (
            <div className="text-center">
              <h2>No Agencies results! Please try anothher later!</h2>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="team_slider gutter-x15">
                <AgenciesAsTeam data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DiscoverAgencies;
