"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { toggleAmenity } from "features/properties/propertiesSlice";

const CheckBoxFilter: React.FC = () => {
  const t = useTranslations("property.amenities");
  const dispatch = useDispatch();
  const amenities: { [key: string]: boolean } = useSelector(
    (state: import("@/store/store").RootState) => state.properties.createListing.amenities
  );

  const handleToggle = (amenity: string, value: boolean) => {
    dispatch(toggleAmenity({ amenity, value }));
  };

  return (
    <div className="row">
      {Object.keys(amenities).map((amenity, index) => (
        <div key={index} className="col-xxs-6 col-sm col-lg col-xl">
          <ul className="ui_kit_checkbox selectable-list">
            <li>
              <div className="form-check custom-checkbox">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={amenity}
                  checked={amenities[amenity]}
                  onChange={(e) => handleToggle(amenity, e.target.checked)}
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
