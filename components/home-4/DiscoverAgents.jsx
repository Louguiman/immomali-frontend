"use client";
import { useGetAllAgentsQuery } from "@/features/api/agents.api";
import React from "react";
import Team from "./Team";

function DiscoverAgents() {
  const { data, isLoading, isError } = useGetAllAgentsQuery();

  console.log("agents: ", data);

  return (
    <section className="our-team">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="main-title text-center">
              <h2>Discover Agents</h2>
              <p>Some of the best agents on our platform</p>
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
