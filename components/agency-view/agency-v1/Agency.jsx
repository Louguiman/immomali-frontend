"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAgentItemLength } from "../../../features/agent/agentSlice";
import Image from "next/image";
import { useGetAllAgenciesQuery } from "@/features/api/agencies.api";

const Agency = () => {
  const dispath = useDispatch();
  const { data: agencies, isLoading, isError } = useGetAllAgenciesQuery();

  if (isLoading) return <p>Loading agencies...</p>;
  if (isError) return <p>Error fetching agencies.</p>;

  let content = agencies.map((item) => (
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
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              <li className="list-inline-item dn"></li>
              <li className="list-inline-item">
                <a href="#">{item?.noOfListings} Listings</a>
              </li>
            </ul>
          </div>
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <h4>
              <Link href={`/agency-details/${item.id}`}>{item.name}</Link>
            </h4>
            <p className="text-thm">{item.type}</p>
            <ul className="prop_details mb0">
              <li>
                <a href="#">Office: {item.office}</a>
              </li>
              <li>
                <a href="#">Mobile: {item.phoneNumber}</a>
              </li>
              <li>
                <a href="#">Email: {item.email}</a>
              </li>
              <li>
                <a href="#">Web: {item.website}</a>
              </li>
              <li>
                <a href="#">Address: {item.address}</a>
              </li>
            </ul>
          </div>
          {/* End .tc_content */}

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
            <div className="fp_pdate float-end text-thm">
              <Link href={`/agency-details/${item.id}`} className="text-thm">
                View My Listings <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  ));

  // useEffect(() => {
  //   if (!isLoading && agencies !== null) {
  //     dispath(addAgentItemLength(agencies.length));
  //   }
  // }, [agencies]);
  return <>{content}</>;
};

export default Agency;
