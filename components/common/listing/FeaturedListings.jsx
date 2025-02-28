"use client";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useFetchPropertyByIdQuery } from "@/features/api/properties.api";

const FeaturedListings = () => {
  const recentlyViewvedlist = useAppSelector(
    (state) => state.properties.recentlyViewed
  );
  return (
    <div>
      {recentlyViewvedlist.map((item) => (
        <PropertyItem id={item} key={item} />
      ))}
    </div>
  );
};

export default FeaturedListings;

export function PropertyItem({ id }) {
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

  return (
    <div className="media d-flex" key={item.id}>
      <Link href={`/listing-details-v2/${item.id}`}>
        <Image
          width={102}
          height={80}
          className="align-self-start me-3 w-100 h-100 cover"
          src={item?.images[0]?.imageUrl}
          alt="featured listing image"
        />
      </Link>

      <div className="media-body">
        <h5 className="mt-0 post_title">
          <Link href={`/listing-details-v2/${item.id}`}>{item.title}</Link>
        </h5>
        <Link href={`/listing-details-v2/${item.id}`}>
          {item.price} F CFA <small>/mo</small>
        </Link>

        <ul className="mb0">
          <li className="list-inline-item">Beds: {item?.beds} &nbsp;</li>
          <li className="list-inline-item">Baths: {item?.baths} &nbsp;</li>
          <li className="list-inline-item">SqFt: {item?.sqFt} &nbsp;</li>
        </ul>
      </div>
    </div>
  );
}
