"use client";

import { Amenities } from "@/types/amenities";
import { useTranslations } from "next-intl";

const PropertyFeatures = ({ amenities }: { amenities: Amenities }) => {
  const t = useTranslations("property.amenities");

  if (!amenities) return null;

  const featureList = Object.entries(amenities)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value === true)
    .map(([key]) => t(key));

  const chunkSize = Math.ceil(featureList.length / 3);
  const propertyFeatures = [
    featureList.slice(0, chunkSize),
    featureList.slice(chunkSize, chunkSize * 2),
    featureList.slice(chunkSize * 2),
  ];

  return (
    <>
      {propertyFeatures.map((list, index) => (
        <div className="col-sm-6 col-md-6 col-lg-4" key={index}>
          <ul className="order_list list-inline-item">
            {list.map((feature, i) => (
              <li key={i}>
                <span className="flaticon-tick"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PropertyFeatures;
