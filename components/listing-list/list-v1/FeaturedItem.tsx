"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useSelector } from "@/store/store";
import { addLength } from "../../../features/properties/propertiesSlice";
import properties from "../../../data/properties";
import type { RootState } from "../../../store/store";
import Image from "next/image";

type ItemDetail = {
  name: string;
  number: string | number;
};

type PropertyItem = {
  id: number;
  img: string;
  price: string | number;
  type: string;
  title: string;
  location: string;
  saleTag: string[];
  garages: string;
  itemDetails: ItemDetail[];
  posterAvatar: string;
  posterName: string;
  postedYear: string;
  imgList: string[];
  imgList2?: string[];
  built: string;
  amenities: string;
  featured: string;
  created_at: number;
};

const properties: PropertyItem[] = Array.isArray(propertiesData)
  ? propertiesData
  : [];

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
  } = useSelector((state: import("@/store/store").RootState) => state.properties);
  const { statusType, featured } = useSelector(
    (state: import("@/store/store").RootState) => state.filter
  );

  const dispatch = useAppDispatch();

  // keyword filter
  const keywordHandler = (item: PropertyItem) =>
    item.title.toLowerCase().includes(keyword?.toLowerCase());

  // location handler
  const locationHandler = (item: PropertyItem) => {
    return item.location.toLowerCase().includes(location.toLowerCase());
  };

  // status handler
  const statusHandler = (item: PropertyItem) =>
    item.type.toLowerCase().includes(status.toLowerCase());

  // properties handler
  const propertiesHandler = (item: PropertyItem) =>
    item.type.toLowerCase().includes(type.toLowerCase());

  // price handler
  const priceHandler = (item: PropertyItem) =>
    Number(item.price) < price?.max && Number(item.price) > price?.min;

  // bathroom handler
  const bathroomHandler = (item: PropertyItem) => {
    if (bathrooms !== "" && item.itemDetails && item.itemDetails[1]) {
      return item.itemDetails[1].number == bathrooms;
    }
    return true;
  };

  // bedroom handler
  const bedroomHandler = (item: PropertyItem) => {
    if (bedrooms !== "" && item.itemDetails && item.itemDetails[0]) {
      return item.itemDetails[0].number == bedrooms;
    }
    return true;
  };

  // garages handler
  const garagesHandler = (item: PropertyItem) =>
    garages !== ""
      ? item.garages?.toLowerCase().includes(garages.toLowerCase())
      : true;

  // built years handler
  const builtYearsHandler = (item: PropertyItem) =>
    yearBuilt !== "" ? item?.built == yearBuilt : true;

  // area handler
  const areaHandler = (item: PropertyItem) => {
    const min = typeof area.min === "string" ? parseInt(area.min) : area.min;
    const max = typeof area.max === "string" ? parseInt(area.max) : area.max;
    const itemArea =
      item.itemDetails && item.itemDetails[2]
        ? Number(item.itemDetails[2].number)
        : undefined;
    if (
      min !== 0 &&
      max !== 0 &&
      !isNaN(min) &&
      !isNaN(max) &&
      itemArea !== undefined &&
      !isNaN(itemArea)
    ) {
      return itemArea > min && itemArea < max;
    }
    return true;
  };

  // advanced option handler
  const advanceHandler = (item: PropertyItem) => {
    if (amenities.length !== 0) {
      return amenities.find((item2: string) =>
        item2.toLowerCase().includes(item.amenities.toLowerCase())
      );
    }
    return true;
  };

  // status filter
  const statusTypeHandler = (a: PropertyItem, b: PropertyItem): number => {
    if (statusType === "recent" || statusType === "all-status") {
      return b.created_at - a.created_at;
    } else if (statusType === "old") {
      return a.created_at - b.created_at;
    }
    return 0;
  };

  // featured handler
  const featuredHandler = (item: PropertyItem) => {
    if (featured !== "") {
      if (featured === "featured-all") {
        return item;
      }
      return item.featured === featured;
    }
    return true;
  };

  // status handler
  const content = properties
    ?.slice(0, 9)
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
    .map((item: PropertyItem) => (
      <div className="col-lg-12" key={item.id}>
        <div className="feat_property list">
          <div className="thumb">
            <Image
              width={286}
              height={220}
              className="img-whp"
              src={item.img}
              alt="fp1.jpg"
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                {item.saleTag.map((val: string, i: number) => (
                  <li className="list-inline-item" key={i}>
                    <a href="#">{val}</a>
                  </li>
                ))}
              </ul>
              <ul className="icon mb0">
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-transfer-1"></span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-heart"></span>
                  </a>
                </li>
              </ul>

              <Link
                href={`/listing-details-v1/${item.id}`}
                className="fp_price"
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
                <Link href={`/listing-details-v2/${item.id}`}>
                  {item.title}
                </Link>
              </h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {item.location}
              </p>

              <ul className="prop_details mb0">
                {item.itemDetails?.map((val: ItemDetail, i: number) => (
                  <li className="list-inline-item" key={i}>
                    <a href="#">
                      {val.name}: {val.number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* End .tc_content */}

            <div className="fp_footer">
              <ul className="fp_meta float-start mb0">
                <li className="list-inline-item">
                  <Link href="/agent-v1">
                    <Image
                      width={40}
                      height={40}
                      src={item.posterAvatar}
                      alt="pposter1.png"
                    />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link href="/agent-v1">{item.posterName}</Link>
                </li>
              </ul>
              <div className="fp_pdate float-end">{item.postedYear}</div>
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
  return (
    <>
      {/* {properties.slice(0, 9).map((item) => (
               
            ))} */}
      {content}
    </>
  );
};

export default FeaturedItem;
