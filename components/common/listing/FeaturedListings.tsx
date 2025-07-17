"use client";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/store";
import { useFetchPropertyByIdQuery } from "@/features/api/properties.api";
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";
import { Property } from "@/types/property";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

const FeaturedListings = () => {
  const recentlyViewedList = useAppSelector(
    (state) => state.properties.recentlyViewed
  );
  return (
    <div>
      {recentlyViewedList
        .filter((item: Property) => item.id !== undefined && item.id !== null)
        .map((item: Property) => (
          <PropertyItem id={item.id} key={item.id} />
        ))}
    </div>
  );
};

export default FeaturedListings;

interface PropertyItemProps {
  id: number;
}

export function PropertyItem({ id }: PropertyItemProps) {
  // Translation hook
  const t = useTranslations("property");
  const { number: formatNumber } = useFormatter(); // Hook for number formatting

  const {
    data: item,
    isLoading,
    error,
    isError,
  } = useFetchPropertyByIdQuery(id.toString(), { skip: !id });

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (isError) {
    let errorMessage = t("errorMessage");
    if (
      error &&
      typeof error === "object" &&
      "data" in error &&
      error.data &&
      typeof error.data === "object" &&
      "message" in error.data
    ) {
      errorMessage =
        (error.data as { message?: string }).message || errorMessage;
    }
    return (
      <div className="text-center mt-5">
        <p className="text-danger">{t("errorLoading")}</p>
        <p>{errorMessage}</p>
      </div>
    );
  }
  if (item)
    return (
      <div className="media d-flex" key={item?.id}>
        <Link href={`/listing-details-v2/${item?.id}`}>
          <Image
            width={102}
            height={80}
            className="align-self-start me-3 w-100 h-100 cover"
            src={item?.images[0]?.imageUrl || "/assets/images/team/1.jpg"}
            alt="featured listing image"
          />
        </Link>

        <div className="media-body">
          <h5 className="mt-0 post_title">
            <Link href={`/listing-details-v2/${item?.id}`}>{item?.title}</Link>
          </h5>
          <Link href={`/listing-details-v2/${item?.id}`}>
            {formatNumber(item?.price, {
              style: "currency",
              currency: "XOF",
            })}
            {item?.type !== "sale" && <small>/ {t("month")}</small>}
          </Link>

          <ul className="mb0">
            <li className="list-inline-item d-flex align-items-center">
              <FaBed className="me-1" aria-hidden="true" />
              <span className="visually-hidden">{t("beds")}: </span>
              {item?.beds}
            </li>
            <li className="list-inline-item d-flex align-items-center">
              <FaBath className="me-1" aria-hidden="true" />
              <span className="visually-hidden">{t("baths")}: </span>
              {item?.baths}
            </li>
            <li className="list-inline-item d-flex align-items-center">
              <FaRulerCombined className="me-1" aria-hidden="true" />
              <span className="visually-hidden">{t("sqft")}: </span>
              {item?.sqFt}
            </li>
          </ul>
        </div>
      </div>
    );

  return null;
}
