"use client";

import { useTranslations } from "next-intl";

const PropertyFeatures = ({ amenities }) => {
  const t = useTranslations("property.amenities");

  if (!amenities) return null; // Si pas de données, on n'affiche rien

  // Convertir l'objet amenities en un tableau de fonctionnalités activées
  const featureList = Object.entries(amenities)
    .filter(([_, value]) => value === true) // Garder uniquement les valeurs activées
    .map(([key]) => t(key)); // Traduire les clés en utilisant next-intl

  // Diviser la liste en 3 colonnes équilibrées
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
