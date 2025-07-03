"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addLength } from "../../../features/properties/propertiesSlice";
import { Property } from "@/types/property";
import Image from "next/image";

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
    area,
    amenities,
  } = useAppSelector((state: import("@/store/store").RootState) => state.properties);
  const { statusType, featured, isGridOrList } = useAppSelector(
    (state: import("@/store/store").RootState) => state.filter
  );

  const dispatch = useAppDispatch();

  // keyword filter
  const keywordHandler = (item: Property) =>
    item.title?.toLowerCase().includes(keyword?.toLowerCase() ?? "");

  // location handler
  const locationHandler = (item: Property) => {
    return (item.address ?? "").toLowerCase().includes(location?.toLowerCase() ?? "");
  };

  // status handler
  const statusHandler = (item: Property) =>
    item.type?.toLowerCase().includes(status?.toLowerCase() ?? "");

  // properties handler
  const propertiesHandler = (item: Property) =>
    item.type?.toLowerCase().includes(type?.toLowerCase() ?? "");

  // price handler
  const priceHandler = (item: Property) =>
    Number(item.price) < (price?.max ?? Infinity) && Number(item.price) > (price?.min ?? -Infinity);

  // bathroom handler
  const bathroomHandler = (item: Property) => {
    if (bathrooms !== "") {
      return String(item.baths ?? "") === String(bathrooms);
    }
    return true;
  };

  // bedroom handler
  const bedroomHandler = (item: Property) => {
    if (bedrooms !== "") {
      return String(item.beds ?? "") === String(bedrooms);
    }
    return true;
  };

  // garages handler
  const garagesHandler = (item: Property) =>
    garages !== ""
      ? String(item.garages ?? "").toLowerCase().includes(garages.toLowerCase())
      : true;

  // built years handler
  const builtYearsHandler = (item: Property) =>
    yearBuilt !== "" ? String(item.builtYear ?? "") === String(yearBuilt) : true;

  // area handler
  const areaHandler = (item: Property) => {
    if (area.min !== 0 && area.max !== 0) {
      if (area.min !== "" && area.max !== "") {
        return (
          Number(item.sqFt ?? 0) > Number(area.min) &&
          Number(item.sqFt ?? 0) < Number(area.max)
        );
      }
    }
    return true;
  };

  // advanced option handler
  const advanceHandler = (item: Property) => {
    if (amenities.length !== 0) {
      return amenities.find((item2: string) =>
        (item.amenities ?? "").toLowerCase().includes(item2.toLowerCase())
      );
    }
    return true;
  };

  // status filter
  const statusTypeHandler = (a: Property, b: Property) => {
    if (statusType === "recent") {
      return (a.createdAt ?? 0) + (b.createdAt ?? 0);
    } else if (statusType === "old") {
      return (a.createdAt ?? 0) - (b.createdAt ?? 0);
    } else if (statusType === "all-status") {
      return (a.createdAt ?? 0) + (b.createdAt ?? 0);
    }
    return 0;
  };

  // featured handler
  const featuredHandler = (item: Property) => {
    if (featured !== "") {
      if (featured === "featured-all") {
        return item;
      }
      return item.featured === featured;
    }
    return true;
  };

  const properties = useAppSelector((state: import("@/store/store").RootState) => state.properties.items) as Property[];
  let content = (properties || [])
    .slice(0, 6)
    ?.filter(keywordHandler)
    ?.filter(locationHandler)
    ?.filter(statusHandler)
    ?.filter(propertiesHandler)
    ?.filter(priceHandler)
    ?.filter(bathroomHandler)
    ?.filter(bedroomHandler)
    ?.filter(garagesHandler)
    ?.filter(builtYearsHandler)
    ?.filter(areaHandler)
    ?.filter(advanceHandler)
    ?.sort(statusTypeHandler)
    ?.filter(featuredHandler)
    .map((item: Property) => (
      <div className={isGridOrList ? "col-12 feature-list" : "col-md-6 col-lg-6"} key={item.id}>
        <div className={`feat_property home7 style3 bdrrn ${isGridOrList ? "d-flex align-items-center gap-4" : ""}`}>
          <div className="thumb">
            <Image
              width={364}
              height={220}
              className="img-whp w-100 h-100 cover"
              src={item.images?.[0]?.imageUrl ?? "/placeholder.jpg"}
              alt={item.title ?? "Property image"}
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                {(item.saleTag ?? []).map((val: string, i: number) => (
                  <li className="list-inline-item" key={i}>
                    <a href="#">{val}</a>
                  </li>
                ))}
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
                <Link href={`/listing-details-v2/${item.id}`}>{item.title}</Link>
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
