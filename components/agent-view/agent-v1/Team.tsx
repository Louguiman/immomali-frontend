"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  addAgentItemLength,
  setPage,
} from "../../../features/agent/agentSlice";
import { useGetAllAgentsQuery } from "@/features/api/agents.api";
import Pagination from "./Pagination"; // Import Pagination component

const Team = () => {
  const t = useTranslations("home.agents");
  const dispatch = useDispatch();
  const { name, category, city, page, pageSize } =
    useSelector((state) => state.agent) || {};

  const { data: agents, isLoading, isError } = useGetAllAgentsQuery();

  useEffect(() => {
    if (!isLoading && agents) {
      dispatch(addAgentItemLength(agents.length));
    }
  }, [isLoading, agents]);

  // Filtering logic
  const filteredAgents = agents?.filter((agent) =>
    agent.name.toLowerCase().includes(name.toLowerCase())
  );

  // Pagination logic
  const totalAgents = filteredAgents?.length || 0;
  const paginatedAgents = useMemo(
    () => filteredAgents?.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize, filteredAgents]
  );

  console.log("filtered: ", filteredAgents);
  console.log("paginated: ", paginatedAgents);

  if (isLoading) return <p>{t("loading_agents")}</p>;
  if (isError)
    return <p className="text-danger">{t("error_fetching_agents")}</p>;

  return (
    <>
      <div className="row">
        {paginatedAgents.length > 0 ? (
          paginatedAgents.map((item) => (
            <div className="col-md-6 col-lg-6" key={item.id}>
              <div className="feat_property home7 agent">
                <div className="thumb">
                  <Link href={`/agent-details/${item.id}`}>
                    <Image
                      width={342}
                      height={262}
                      className="img-whp w-100 h-100 cover"
                      src={item.img || "/assets/images/team/10.jpg"}
                      alt={item.name}
                    />
                  </Link>
                  <div className="thmb_cntnt">
                    <ul className="tag mb0">
                      <li className="list-inline-item">
                        <a href="#">
                          {item.noOfListings} {t("listings")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="details">
                  <div className="tc_content">
                    <h4>
                      <Link href={`/agent-details/${item.id}`}>
                        {item.name}
                      </Link>
                    </h4>
                    <p className="text-thm">{item.type}</p>
                    <ul className="prop_details mb0">
                      <li>
                        <a href="#">Office: {item.office}</a>
                      </li>
                      <li>
                        <a href="#">Mobile: {item.mobile}</a>
                      </li>
                      <li>
                        <a href="#">Fax: {item.fax}</a>
                      </li>
                      <li>
                        <a href="#">Email: {item.email}</a>
                      </li>
                    </ul>
                  </div>

                  <div className="fp_footer">
                    <ul className="fp_meta float-start mb0">
                      {item?.socialList?.map((social, i) => (
                        <li className="list-inline-item" key={i}>
                          <a
                            href={social.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className={`fa ${social.icon}`}></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="fp_pdate float-end">
                      <Link
                        href={`/agent-details/${item.id}`}
                        className="text-thm"
                      >
                        {t("view_my_listings")}{" "}
                        <i className="fa fa-angle-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-danger">{t("no_agents_found")}</p>
        )}
      </div>

      {/* Pagination Component */}
      <div className="row">
        <div className="col-lg-12 mt20">
          <div className="mbp_pagination">
            {/* <Pagination /> */}
            <Pagination totalItems={totalAgents} />
          </div>
        </div>
        {/* End paginaion .col */}
      </div>
    </>
  );
};

export default Team;
