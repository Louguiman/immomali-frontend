

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import { useTranslations } from "next-intl";

import { Property } from "@/types/property";

const PropertyCard = ({ item }: { item: Property }) => {
  const t = useTranslations("property.PropertyCard");
  const { isGridOrList } = useAppSelector((state: import("@/store/store").RootState) => state.filter);

  return (
    <div
      className={`feat_property home7 style4 ${
        isGridOrList ? "d-flex align-items-center" : undefined
      }`}
    >
      <div className="thumb">
        {item?.images && (
          <Image
            width={342}
            height={220}
            className="img-whp w-100 h-100 cover"
            src={item?.images?.[0]?.imageUrl ?? "/placeholder.jpg"}
            alt="fp1.jpg"
          />
        )}
        <div className="thmb_cntnt">
          <ul className="tag mb0">
            <li className="list-inline-item">
              <a href="#">{t("featured")}</a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="text-capitalize">
                {(item as any).isFeatured ? "Featured" : ""}
              </a>
            </li>
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

          <Link href={`/listing-details-v2/${item.id}`} className="fp_price">
            {item.price} FCFA
            <small>{t("priceSuffix")}</small>
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
            {item.address ?? ""} {item.neighborhood ?? ""}, {item?.city ?? ""}, {item?.state ?? ""}, {item?.country ?? ""}
          </p>

          <ul className="prop_details mb0">
            <li className="list-inline-item">
              {t("beds")} {item?.beds} &nbsp;
            </li>
            <li className="list-inline-item">
              {t("baths")} {item?.baths} &nbsp;
            </li>
            <li className="list-inline-item">
              {t("sqFt")} {item?.sqFt} &nbsp;
            </li>
          </ul>
        </div>

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
                {item?.owner?.name ?? t("unknown")}
              </Link>
            </li>
          </ul>
          <div className="fp_pdate float-end">{item.createdAt ? new Date(item.createdAt).getFullYear() : ""}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
