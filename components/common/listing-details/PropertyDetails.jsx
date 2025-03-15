"use client";

import { useFormatter } from "next-intl";
import { useTranslations } from "next-intl";

const PropertyDetails = ({ property }) => {
  const t = useTranslations("property");
  const format = useFormatter();

  if (!property) return null; // Prevents rendering if no data is available

  // Define property details dynamically with translations
  const details = [
    [
      { label: t("details.propertyID"), value: property.id },
      {
        label: t("details.price"),
        value: format.number(property.price, {
          style: "currency",
          currency: "XOF",
        }),
      },
      { label: t("details.propertySize"), value: `${property.sqFt} Sq Ft` },
      { label: t("details.yearBuilt"), value: property.builtYear },
    ],
    [
      { label: t("details.bedrooms"), value: property.beds },
      { label: t("details.bathrooms"), value: property.baths },
      { label: t("details.garage"), value: property.garages },
      {
        label: t("details.garageSize"),
        value: property.garageSize
          ? `${property.garageSize} Sq Ft`
          : t("details.n/a"),
      },
    ],
    [
      {
        label: t("details.category"),
        value: t(`categories.${property?.category}`),
      },
      {
        label: t("details.propertyType"),
        value:
          property.type === "rent"
            ? t("details.forRent")
            : t("details.forSale"),
      },
    ],
  ];

  return (
    <>
      {details.map((column, index) => (
        <div key={index} className="col-md-6 col-lg-6 col-xl-4">
          <ul className="list-inline-item">
            {column.map(({ label, value }, idx) => (
              <li key={idx}>
                <p>
                  {label} : <span>{value}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PropertyDetails;
