"use client";
import Link from "next/link";

import properties from "../../../data/properties";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useFetchPropertyByIdQuery } from "@/features/api/properties.api";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { removeFromFavorites } from "@/features/properties/propertiesSlice";

const FavouritProducts = () => {
  const dispatch = useDispatch();
  const favouritesProperties = useAppSelector(
    (state) => state.properties.favorites
  );

  const handleDelete = (id) => {
    dispatch(removeFromFavorites(id));
  };

  let content = useMemo(
    () =>
      favouritesProperties?.map((item) => (
        <PropertyItem key={item} id={item} onDelete={handleDelete} />
      )),
    [dispatch, favouritesProperties]
  );

  return <>{content}</>;
};

export function PropertyItem({ id, onDelete }) {
  const {
    data: item,
    isLoading,
    error,
  } = useFetchPropertyByIdQuery(id, { skip: !id });

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="feat_property list favorite_page" key={item.id}>
      <div className="thumb">
        <Image
          width={150}
          height={220}
          className="img-whp fit-cover"
          src={
            item?.images[0]?.imageUrl || "/assets/images/feature/feature1.jpg"
          }
          alt="fp1.jpg"
        />
        <div className="thmb_cntnt">
          <ul className="tag mb0">
            <li className="list-inline-item">
              <a href="#">For {item?.type}</a>
            </li>
          </ul>
        </div>
      </div>
      {/* End .thumb */}

      <div className="details">
        <div className="tc_content">
          <h4>
            <Link href={`/listing-details-v1/${item.id}`}>{item.title}</Link>
          </h4>
          <p>
            <span className="flaticon-placeholder"></span> {item.address}{" "}
            {item?.city} {item?.country}
          </p>
          <a className="fp_price text-thm" href="#">
            {item.price} FCFA
            <small>/mo</small>
          </a>
        </div>
      </div>
      {/* End details */}

      <ul className="view_edit_delete_list mb0 mt35">
        <li
          className="list-inline-item"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
          onMouseDown={handleDelete}
        >
          <a>
            <span className="flaticon-garbage"></span>
          </a>
        </li>
      </ul>
      {/* view_edit_delete_list */}
    </div>
  );
}

export default FavouritProducts;
