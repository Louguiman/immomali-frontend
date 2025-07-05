

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import { useTranslations } from "next-intl";

import { Property } from "@/types/property";

interface User {
  id: string | number;
  name: string;
  img?: string;
}

// Create a new type that makes specific properties optional
interface PropertyWithOwner extends Omit<Property, 'owner' | 'images' | 'isFeatured'> {
  owner?: User;
  images?: Array<{ imageUrl: string }>;
  isFeatured?: boolean;
}

const PropertyCard = ({ item }: { item: PropertyWithOwner }) => {
  const t = useTranslations("property.PropertyCard");
  const { isGridOrList } = useAppSelector((state: import("@/store/store").RootState) => state.filter);

  return (
    <div
      className={`feat_property home7 style4 ${
        isGridOrList ? "d-flex align-items-center" : "undefined"
      }`}
    >
      <div className="thumb">
        {item?.images && (
          <Image
            width={342}
            height={220}
            className="img-whp w-100 h-100 cover"
            src={item.images?.[0]?.imageUrl || "/placeholder.jpg"}
            alt={item.title || "Property image"}
            priority={true}
          />
        )}
        <div className="thmb_cntnt">
          <ul className="tag mb0">
            <li className="list-inline-item">
              <span className="featured-tag">
                {t("featured")}
              </span>
            </li>
            {item.isFeatured && (
              <li className="list-inline-item">
                <span className="text-capitalize featured-badge">
                  {t("featured")}
                </span>
              </li>
            )}
          </ul>
          <ul className="icon mb0">
            <li className="list-inline-item">
              <button 
                type="button" 
                className="p-0 border-0 bg-transparent"
                aria-label="Transfer property"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle transfer action
                }}
              >
                <span className="flaticon-transfer-1"></span>
              </button>
            </li>
            <li className="list-inline-item">
              <button 
                type="button" 
                className="p-0 border-0 bg-transparent"
                aria-label="Add to favorites"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle favorite action
                }}
              >
                <span className="flaticon-heart"></span>
              </button>
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
          {item.type && <p className="text-thm">{item.type}</p>}
          <h4>
            <Link href={`/listing-details-v2/${item.id}`}>
              {item.title || t('untitled')}
            </Link>
          </h4>
          <p>
            <span className="flaticon-placeholder"></span>
            {item.address ?? ""} {item.neighborhood ?? ""}, {item?.city ?? ""}, {item?.state ?? ""}, {item?.country ?? ""}
          </p>

          <ul className="prop_details mb0">
            {typeof item.beds !== 'undefined' && (
              <li className="list-inline-item">
                {t("beds")} {item.beds} &nbsp;
              </li>
            )}
            {typeof item.baths !== 'undefined' && (
              <li className="list-inline-item">
                {t("baths")} {item.baths} &nbsp;
              </li>
            )}
            {typeof item.sqFt !== 'undefined' && (
              <li className="list-inline-item">
                {t("sqFt")} {item.sqFt} &nbsp;
              </li>
            )}
          </ul>
        </div>

        <div className="fp_footer">
          <ul className="fp_meta float-start mb0">
            <li className="list-inline-item">
              {item.owner && (
                <Link href={`/agent-details/${item.owner.id}`}>
                  <Image
                    width={40}
                    height={40}
                    src={item.owner.img || "/assets/images/team/e1.png"}
                    alt={item.owner.name || "Agent"}
                  />
                </Link>
              )}
            </li>
            <li className="list-inline-item">
              {item.owner ? (
                <Link href={`/agent-details/${item.owner.id}`}>
                  {item.owner.name || t("unknown")}
                </Link>
              ) : (
                <span>{t("unknown")}</span>
              )}
            </li>
          </ul>
          <div className="fp_pdate float-end">{item.createdAt ? new Date(item.createdAt).getFullYear() : ""}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
