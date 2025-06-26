"use client";

import { useTranslations } from "next-intl";
import Ratings from "../../blog-details/Ratings";

const WhatsNearby = () => {
  const t = useTranslations("property.WhatsNearby");

  const nearbyContent = [
    {
      id: 1,
      styleClass: "",
      title: t("categories.education"),
      icon: "flaticon-college-graduation",
      singleItem: [
        {
          id: 1,
          name: "Eladia’s Kids",
          miles: 3.13,
          totalReview: 8895,
        },
        {
          id: 2,
          name: "Gear Up With ACLS",
          miles: 4.66,
          totalReview: 7475,
        },
        {
          id: 3,
          name: "Brooklyn Brainery",
          miles: 3.31,
          totalReview: 3579,
        },
      ],
    },
    {
      id: 2,
      styleClass: "style2",
      title: t("categories.health"),
      icon: "flaticon-heartbeat",
      singleItem: [
        {
          id: 1,
          name: "Health First Clinic",
          miles: 2.45,
          totalReview: 5250,
        },
        {
          id: 2,
          name: "City Med Care",
          miles: 5.02,
          totalReview: 6783,
        },
        {
          id: 3,
          name: "Green Cross Pharmacy",
          miles: 1.78,
          totalReview: 2340,
        },
      ],
    },
    {
      id: 3,
      styleClass: "style3",
      title: t("categories.transport"),
      icon: "flaticon-front-of-bus",
      singleItem: [
        {
          id: 1,
          name: "Metro Station Central",
          miles: 0.89,
          totalReview: 3294,
        },
        {
          id: 2,
          name: "Taxi Stand 24/7",
          miles: 1.55,
          totalReview: 1984,
        },
        {
          id: 3,
          name: "Bike Rental Hub",
          miles: 2.87,
          totalReview: 4501,
        },
      ],
    },
  ];

  return (
    <>
      {nearbyContent.map((item) => (
        <div
          className={`education_distance mb15 ${item.styleClass}`}
          key={item.id}
        >
          <h5>
            <span className={item.icon}></span> {item.title}
          </h5>

          {item.singleItem.map((place) => (
            <div className="single_line" key={place.id}>
              <p className="para">
                {place.name}{" "}
                <span>
                  ({new Intl.NumberFormat().format(place.miles)} {t("miles")})
                </span>
              </p>
              <ul className="review">
                <Ratings />
                <li className="list-inline-item">
                  <span className="total_rive_count">
                    {new Intl.NumberFormat().format(place.totalReview)}{" "}
                    {t("reviews")}
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default WhatsNearby;
