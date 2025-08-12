"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { toggleAmenity } from "features/properties/propertiesSlice";

// Define the Amenities type based on the slice
type AmenitiesKey = keyof {
  airConditioning: boolean;
  barbeque: boolean;
  dryer: boolean;
  gym: boolean;
  laundry: boolean;
  lawn: boolean;
  microwave: boolean;
  outdoorShower: boolean;
  refrigerator: boolean;
  sauna: boolean;
  swimmingPool: boolean;
  tvCable: boolean;
  washer: boolean;
  wifi: boolean;
  windowCoverings: boolean;
};

const CheckBoxFilter: React.FC = () => {
  const t = useTranslations("property.amenities");
  const dispatch = useAppDispatch();
  const amenities = useAppSelector(
    (state) => state.properties.createListing.amenities
  );

  const handleToggle = (amenity: AmenitiesKey) => {
    dispatch(toggleAmenity(amenity));
  };

  return (
    <div className="row">
      {Object.entries(amenities).map(([amenity, isChecked], index) => (
        <div key={index} className="col-xxs-6 col-sm col-lg col-xl">
          <ul className="ui_kit_checkbox selectable-list">
            <li>
              <div className="form-check custom-checkbox">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={amenity}
                  checked={isChecked}
                  onChange={() => handleToggle(amenity as AmenitiesKey)}
                />
                <label className="form-check-label" htmlFor={amenity}>
                  {t(amenity)}
                </label>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxFilter;
