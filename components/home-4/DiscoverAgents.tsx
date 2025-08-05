"use client";
import { useGetAllAgentsQuery } from "@/features/api/agents.api";
import React from "react";
import Team from "./Team";
import { useTranslations } from "next-intl";
import SkeletonSectionLoader from "../common/SkeletonSectionLoader";

function DiscoverAgents() {
  const t = useTranslations("home");

  const { data, isLoading, isError } = useGetAllAgentsQuery({
    page: 1,
    limit: 10,
  });

  console.log("agents: ", data);
  if (isLoading) {
    return <SkeletonSectionLoader />;
  }

  if (isError || !data) {
    return <p>Unable to load agents at the moment.</p>;
  }

  return (
    <section className="our-team">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="main-title text-center">
              <h2>{t("section.agent.title")}</h2>
              <p>{t("section.agent.description")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : data?.length === 0 ? (
            <div className="text-center">
              <h2>No Agent results! Please try anothher later!</h2>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="team_slider gutter-x15">
                <Team data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DiscoverAgents;
