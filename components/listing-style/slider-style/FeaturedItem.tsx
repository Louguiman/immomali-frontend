"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addLength } from "../../../features/properties/propertiesSlice";

import Image from "next/image";
import { Property } from "@/types/property";

const FeaturedItem = () => {
  const {
    keyword,
    location,
    status,
    type,
    price,
    bathrooms,
    bedrooms,
    garages,
    yearBuilt,
  } = useAppSelector(
    (state: import("@/store/store").RootState) => state.properties
  );
  const { statusType, featured, isGridOrList } = useAppSelector(
    (state: import("@/store/store").RootState) => state.filter
  );

  const dispatch = useAppDispatch();

  // keyword filter

  const keywordHandler = (item: Property): boolean =>
    item.title.toLowerCase().includes(keyword?.toLowerCase() ?? "");

  // location handler
  const locationHandler = (item: Property): boolean => {
    return (item.address ?? "")
      .toLowerCase()
      .includes(location?.toLowerCase() ?? "");
  };

  // status handler
  const statusHandler = (item: Property): boolean =>
    item.type.toLowerCase().includes(status?.toLowerCase() ?? "");

  // properties handler
  const propertiesHandler = (item: Property): boolean =>
    item.type.toLowerCase().includes(type?.toLowerCase() ?? "");

  // price handler
  const priceHandler = (item: Property): boolean =>
    Number(item.price) < Number(price?.max ?? Infinity) &&
    Number(item.price) > Number(price?.min ?? 0);

  // bathroom handler
  const bathroomHandler = (item: Property): boolean => {
    if (bathrooms !== "") {
      return String(item.baths ?? "") === String(bathrooms);
    }
    return true;
  };

  // bedroom handler
  const bedroomHandler = (item: Property): boolean => {
    if (bedrooms !== "") {
      return String(item.beds ?? "") === String(bedrooms);
    }
    return true;
  };

  // garages handler
  const garagesHandler = (item: Property): boolean =>
    garages !== ""
      ? String(item.garages ?? "")
          .toLowerCase()
          .includes(garages?.toLowerCase() ?? "")
      : true;

  // built years handler
  const builtYearsHandler = (item: Property): boolean =>
    yearBuilt !== ""
      ? String(item?.builtYear ?? "") === String(yearBuilt)
      : true;

  // status filter
  const statusTypeHandler = (a: Property, b: Property): number => {
    if (statusType === "recent") {
      return (
        (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
        (a.createdAt ? new Date(a.createdAt).getTime() : 0)
      );
    } else if (statusType === "old") {
      return (
        (a.createdAt ? new Date(a.createdAt).getTime() : 0) -
        (b.createdAt ? new Date(b.createdAt).getTime() : 0)
      );
    } else {
      return 0;
    }
  };

  // featured handler
  const featuredHandler = (item: Property): boolean => {
    if (featured !== "") {
      return String(item.isFeatured) === String(featured);
    }
    return true;
  };

  // status handler
  const properties = useAppSelector(
    (state: import("@/store/store").RootState) =>
      ((state.properties as any).items as Property[]) || []
  );
  const content = (properties || [])
    .slice(0, 10)
    .filter(keywordHandler)
    .filter(locationHandler)
    .filter(statusHandler)
    .filter(propertiesHandler)
    .filter(priceHandler)
    .filter(bathroomHandler)
    .filter(bedroomHandler)
    .filter(garagesHandler)
    .filter(builtYearsHandler)
    .sort(statusTypeHandler)
    .filter(featuredHandler)
    .map((item: Property) => (
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
              src={item.images?.[0]?.imageUrl ?? "/placeholder.jpg"}
              alt="fp1.jpg"
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#" title="Featured">
                    Featured
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className="text-capitalize"
                    title={String(item.isFeatured)}
                  >
                    {item.isFeatured ? "Featured" : ""}
                  </a>
                </li>
              </ul>
              <ul className="icon mb0">
                <li className="list-inline-item">
                  <a href="#" title="Transfer">
                    <span className="flaticon-transfer-1"></span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" title="Favorite">
                    <span className="flaticon-heart"></span>
                  </a>
                </li>
              </ul>

              <Link
                href={`/listing-details-v1/${item.id}`}
                className="fp_price"
                title="View Details"
              >
                ${item.price}
                <small>/mo</small>
              </Link>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <p className="text-thm">{item.type}</p>
              <h4>
                <Link href={`/listing-details-v1/${item.id}`}>
                  {item.title}
                </Link>
              </h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {item.address ?? ""}
              </p>

              <ul className="prop_details mb0">
                <li className="list-inline-item">
                  <a href="#">Beds: {item.beds ?? 0}</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Baths: {item.baths ?? 0}</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">SqFt: {item.sqFt ?? 0}</a>
                </li>
              </ul>
            </div>
            {/* End .tc_content */}

            <div className="fp_footer">
              <ul className="fp_meta float-start mb0">
                <li className="list-inline-item">
                  <Link href="/agent-v2">
                    <Image
                      width={40}
                      height={40}
                      src={item.owner?.img || "/assets/images/team/e1.png"}
                      alt="pposter1.png"
                    />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link href="/agent-v2">{item.owner?.name || "Unknown"}</Link>
                </li>
              </ul>
              <div className="fp_pdate float-end">
                {item.createdAt ? new Date(item.createdAt).getFullYear() : ""}
              </div>
            </div>
            {/* End .fp_footer */}
          </div>
        </div>
      </div>
    ));

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(content.length));
  }, [dispatch, content]);

  return <>{content}</>;
};

export default FeaturedItem;
