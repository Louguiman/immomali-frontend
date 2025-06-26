"use client";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useFetchPropertyByIdQuery } from "@/features/api/properties.api";
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";

const FeaturedListings = () => {
  const recentlyViewedList = useAppSelector(
    (state) => state.properties.recentlyViewed
  );
  return (
    <div>
      {recentlyViewedList.map((item) => (
        <PropertyItem id={item} key={item} />
      ))}
    </div>
  );
};

export default FeaturedListings;

export function PropertyItem({ id }) {
  // Translation hook
  const t = useTranslations("property");
  const { number: formatNumber } = useFormatter(); // Hook for number formatting

  const {
    data: item,
    isLoading,
    error,
    isError,
  } = useFetchPropertyByIdQuery(id, { skip: !id });

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (isError) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">{t("errorLoading")}</p>
        <p>{error?.data?.message || t("errorMessage")}</p>
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
            <li className="list-inline-item">
              {t("beds")}: {item?.beds} &nbsp;
            </li>
            <li className="list-inline-item">
              {t("baths")}: {item?.baths} &nbsp;
            </li>
            <li className="list-inline-item">
              {t("sqft")}: {item?.sqFt} &nbsp;
            </li>
          </ul>
        </div>
      </div>
    );

  return null;
}
