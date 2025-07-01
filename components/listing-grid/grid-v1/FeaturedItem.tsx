"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useSelector } from "@/store/store";
import { addLength } from "../../../features/properties/propertiesSlice";
import Image from "next/image";
import FavoriteButton from "@/components/common/FavoriteBtn";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useFormatter } from "next-intl";
import CompareButton from "@/components/common/CompareBtn";

const FeaturedItem = ({ properties }) => {
  const dispatch = useAppDispatch();
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );

  // Translation hook
  const t = useTranslations("property");
  const { number: formatNumber } = useFormatter(); // Hook for number formatting

  // Status handler
  let content = properties?.map((item) => (
    <div
      className={`${
        isGridOrList ? "col-12 feature-list" : "col-md-6 col-lg-6"
      } `}
      key={item.id}
    >
      <div
        className={`feat_property home7 style4 ${
          isGridOrList ? "d-flex align-items-center" : undefined
        }`}
      >
        <div className="thumb">
          <Image
            width={342}
            height={220}
            className="img-whp w-100 h-100 cover"
            src={item?.images[0]?.imageUrl}
            alt="fp1.jpg"
          />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              <li className="list-inline-item">
                <a href="#">{t("featured")}</a> {/* Translation */}
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-capitalize">
                  {t(item?.type)} {/* Translation for 'For' */}
                </a>
              </li>
            </ul>
            <ul className="icon mb0">
              <li className="list-inline-item">
                <CompareButton propertyId={item.id} />
              </li>
              <li className="list-inline-item">
                <FavoriteButton propertyId={item.id} />
              </li>
            </ul>

            <Link href={`/listing-details-v2/${item.id}`} className="fp_price">
              {formatNumber(item.price, {
                style: "currency",
                currency: "XOF",
              })}
              {item.type !== "sale" && <small>/ {t("month")}</small>}
              {/* Translation for "/mois" */}
            </Link>
          </div>
        </div>
        <div className="details">
          <div className="tc_content">
            <p className="text-thm"> {t(`categories.${item?.category}`)}</p>
            <h4>
              <Link href={`/listing-details-v2/${item.id}`}>{item.title}</Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {item.address} {item.neighborhood}, {item.city}, {item.country}
            </p>

            <ul className="prop_details mb0">
              <li className="list-inline-item">
                {t("beds")}: {item?.beds} &nbsp; {/* Translation for 'Beds' */}
              </li>
              <li className="list-inline-item">
                {t("baths")}: {item?.baths} &nbsp;{" "}
                {/* Translation for 'Baths' */}
              </li>
              <li className="list-inline-item">
                {t("sqft")}: {item?.sqFt} &nbsp; {/* Translation for 'SqFt' */}
              </li>
            </ul>
          </div>
          {/* End .tc_content */}

          <div className="fp_footer">
            <ul className="fp_meta float-start mb0">
              <li className="list-inline-item">
                <Link href={`/agent-details/${item?.owner?.id}`}>
                  <Image
                    width={40}
                    height={40}
                    src={item?.owner?.img || "/assets/images/team/e1.png"}
                    alt="pposter1.png"
                  />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`/agent-details/${item?.owner?.id}`}>
                  {item?.owner?.name || t("unknown")}{" "}
                  {/* Translation for "Inconnu" */}
                </Link>
              </li>
            </ul>
            <div className="fp_pdate float-end">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  ));

  // Add length of filter items
  useEffect(() => {
    dispatch(addLength(content?.length || 0));
  }, [dispatch, content]);

  return <>{content}</>;
};

export default FeaturedItem;
