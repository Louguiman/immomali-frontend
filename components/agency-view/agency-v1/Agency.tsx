"use client";

import Link from "next/link";
import { useEffect } from "react";
import { addAgentItemLength } from "../../../features/agent/agentSlice";
import Image from "next/image";
import { useGetAllAgenciesQuery } from "@/features/api/agencies.api";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/store/store";
import type { Agency } from "@/types/agency";

const Agency = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("home.agents");

  const {
    data: agencies,
    isLoading,
    isError,
  } = useGetAllAgenciesQuery({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (!isLoading && agencies !== null) {
      dispatch(addAgentItemLength(agencies.length));
    }
  }, [agencies, dispatch, isLoading]);

  if (isLoading) return <p>{t("loading_agents")}</p>;
  if (isError) return <p>{t("error_fetching_agents")}</p>;

  const content = agencies.map((item: Agency) => (
    <div className="col-md-6 col-lg-6" key={item.id}>
      <div className="feat_property home7 agency">
        <div className="thumb">
          <Link
            href={`/agency-details/${item.id}`}
            className="d-block mx-auto text-center"
          >
            <Image
              width={251}
              height={220}
              className="contain"
              src={item?.logoUrl || "/assets/images/team/6.jpg"}
              alt="bh1.jpg"
            />
          </Link>
          {/* <div className="thmb_cntnt">
            <ul className="tag mb0">
              <li className="list-inline-item dn"></li>
              <li className="list-inline-item">
                <a href="#">{item?.noOfListings} Listings</a>
              </li>
            </ul>
          </div> */}
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <h4>
              <Link href={`/agency-details/${item.id}`}>{item.name}</Link>
            </h4>
            <p className="text-thm">
              {new Date(item?.createdAt)?.toLocaleDateString()}
            </p>
            <ul className="prop_details mb0">
              <li>
                <a href="#">
                  <i className="fa fa-mobile"></i> {item.phoneNumber}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-envelope-o"></i> {item.email}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-globe"></i> {item.website}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-map-marker"></i> {item.address}
                </a>
              </li>
            </ul>
          </div>
          {/* End .tc_content */}

          <div className="fp_footer">
            {/* <ul className="fp_meta float-start mb0">
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
            </ul> */}
            <div className="fp_pdate float-end text-thm">
              <Link href={`/agency-details/${item.id}`} className="text-thm">
                {t("view_my_listings")} <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  ));

  return <>{content}</>;
};

export default Agency;
