"use client";

import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import FavoriteButton from "../common/FavoriteBtn";
import CompareButton from "../common/CompareBtn";
import { useFormatter } from "next-intl";
import { useTranslations } from "next-intl";

const FeaturedProperties = ({ properties }) => {
  // Translation hook
  const t = useTranslations("property");
  const { number: formatNumber } = useFormatter(); // Hook for number formatting

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {properties?.slice(0, 12).map((item) => (
          <div className="item" key={item.id}>
            <div className="feat_property home3">
              <div className="thumb">
                <Image
                  width={343}
                  height={220}
                  className="img-whp w-100 max-h-100 cover"
                  src={item?.images[0]?.imageUrl}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    {item.saleTag.map((val, i) => (
                      <li className="list-inline-item" key={i}>
                        <a href="#">{val}</a>
                      </li>
                    ))}
                  </ul>

                  <ul className="icon mb0">
                    <li className="list-inline-item">
                      <CompareButton propertyId={item.id} />
                    </li>
                    <li className="list-inline-item">
                      <FavoriteButton propertyId={item.id} />
                    </li>
                  </ul>

                  <Link
                    href={`/listing-details-v2/${item.id}`}
                    className="fp_price"
                  >
                    {formatNumber(item.price, {
                      style: "currency",
                      currency: "XOF",
                    })}
                    {item.type !== "sale" && <small>/ {t("month")}</small>}
                  </Link>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  <p className="text-thm">{t(item.type)}</p>
                  <h4>
                    <Link href={`/listing-details-v2/${item.id}`}>
                      {item.title}
                    </Link>
                  </h4>
                  <p>
                    <span className="flaticon-placeholder"></span>
                    {item.address} {item?.city} {item?.country}
                  </p>

                  <ul className="prop_details mb0">
                    <li className="list-inline-item">
                      {t("beds")}: {item?.beds} &nbsp;
                    </li>
                    <li className="list-inline-item">
                      {t("baths")}: {item?.baths} &nbsp;
                    </li>
                    <li className="list-inline-item">
                      {t("area")}: {item?.sqFt} {t("PropertyCard.sqFt")};
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeaturedProperties;
